"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("./player");
const NUMBER_OF_BALLS_IN_OVERS = 6;
const BALL_INVALID_STATE = "BALL_INVALID_STATE";
var matchStatus;
(function (matchStatus) {
    matchStatus["WON"] = "WON";
    matchStatus["LOSS"] = "LOSS";
    matchStatus["IN_PROGRESS"] = "IN_PROGRESS";
})(matchStatus || (matchStatus = {}));
class Match {
    constructor(teamName, overs, wickets, target, players, outcomes, weights) {
        this.name = teamName;
        this.overs = overs;
        this.totalBalls = overs * NUMBER_OF_BALLS_IN_OVERS;
        this.overNo = 0;
        this.currentOver = 0;
        this.ballNo = 0;
        this.ballId = "";
        this.result = "";
        this.ballsPlayed = 0;
        this.target = target;
        this.score = 0;
        this.outcomes = outcomes;
        this.weight = weights;
        this.matchStatus = matchStatus.IN_PROGRESS;
        this.wickets = wickets;
        this.wicketsLeft = wickets;
        this.noofbatsmen = wickets + 1;
        this.playersName = players;
        this.outBatsman = [];
        this.players = players.map(name => {
            return new player_1.Player(name, this.outcomes, weights);
        });
        this.onStrikeBatsman = this.players[0];
        this.nonStrikeBatsman = this.players[1];
        //  since 2 bastman are need and array index starts from 0;
        this.nextBatsmanIndex = 2;
    }
    changeStrike() {
        /*  change the current batsman if
          1. no of run taken is : 1,3,5
          2. end of over
        */
        // console.log("----CHANGING STRIKE -----");
        let temp = this.nonStrikeBatsman;
        this.nonStrikeBatsman = this.onStrikeBatsman;
        this.nonStrikeBatsman.setStrike(false);
        this.onStrikeBatsman = temp;
        this.onStrikeBatsman.setStrike(true);
    }
    handleOutBatsman(batsman) {
        console.log(`\n${batsman.name} is out!! ${batsman.runsScored}(${batsman.ballsFaced})\n`);
        this.outBatsman.push(batsman);
        //  set new onstrike batsman
        //  check if bastman left if not end the game
        if (this.players[this.nextBatsmanIndex]) {
            this.onStrikeBatsman = this.players[this.nextBatsmanIndex];
            this.nextBatsmanIndex += 1;
        }
        // else {
        //   console.log("NO_BATSMAN_LEFT");
        //   // throw Error("NO_BATSMAN_LEFT");
        // }
    }
    /* play the game untill
      1. match is won
      2. all players are out
    */
    play() {
        //  set the player on strike
        this.onStrikeBatsman.setStrike(true);
        this.currentOver = 1;
        //  set the over number
        while (this.overNo < this.overs && this.ballsPlayed <= this.totalBalls && this.matchStatus == matchStatus.IN_PROGRESS) {
            //  for every over play 6 balls
            // play an over
            this.playanOver(this.overNo);
            if (this.matchStatus === matchStatus.IN_PROGRESS) {
                console.log(`\nEND OF OVER ${this.currentOver} current Score: ${this.score},  ${this.target - this.score} run to win\n`);
            }
            this.overNo += 1;
            this.currentOver += 1;
        }
        if (this.score < this.target) {
            this.matchStatus = matchStatus.LOSS;
        }
        this.setMatchResult();
        this.printSummary();
        return this.matchStatus;
    }
    setMatchResult() {
        let message = "";
        if (this.matchStatus === matchStatus.WON) {
            message = `\n ${this.name}  won by ${this.wicketsLeft} wickets and ${this.totalBalls -
                this.ballsPlayed} balls remaining MATCH STATUS:- ${this.matchStatus} \n`;
        }
        else {
            message = `\n ${this.name} lost by ${this.target - 1 - this.score} runs \n`;
        }
        console.info(message);
        this.result = message;
    }
    getInfo() {
        return {
            status: this.matchStatus,
            resultMessage: this.result
        };
    }
    //  print's the players summary for the match
    printSummary() {
        this.outBatsman.map(batsman => {
            console.log(`${batsman.name}: ${batsman.runsScored} (${batsman.ballsFaced})`);
        });
        if (!this.onStrikeBatsman.isOut) {
            console.log(`${this.onStrikeBatsman.name}: ${this.onStrikeBatsman.runsScored}${!this.onStrikeBatsman.isOut ? "\u002A" : ""} (${this.onStrikeBatsman.ballsFaced})`);
        }
        if (!this.nonStrikeBatsman.isOut) {
            console.log(`${this.nonStrikeBatsman.name}: ${this.nonStrikeBatsman.runsScored}${!this.nonStrikeBatsman.isOut ? "\u002A" : ""} (${this.nonStrikeBatsman.ballsFaced})\n`);
        }
    }
    //  exexute all the balls for an over untill consdition's are true
    playanOver(overNo) {
        let ballNo = 1;
        for (ballNo; ballNo <= NUMBER_OF_BALLS_IN_OVERS; ballNo++) {
            if (this.wicketsLeft > 0 && this.matchStatus == matchStatus.IN_PROGRESS) {
                //  get the current batsmans ball outcome
                const outcome = this.onStrikeBatsman.getBallOutcome();
                this.ballsPlayed += 1;
                const isOut = outcome === -1;
                const ballId = `${overNo}.${ballNo}`;
                this.ballId = ballId;
                const currentBall = new player_1.Ball(ballId, outcome, isOut);
                console.log(`${overNo}.${ballNo}: ${this.onStrikeBatsman.name} scores ${currentBall.runScored}`);
                if (isOut) {
                    this.wicketsLeft -= 1;
                }
                else {
                    this.score += outcome;
                }
                switch (outcome) {
                    // batsman is out
                    case -1:
                        this.onStrikeBatsman.addBall(currentBall, false);
                        this.handleOutBatsman(this.onStrikeBatsman);
                        break;
                    case 0:
                        this.onStrikeBatsman.addBall(currentBall, true);
                    case 2:
                    case 4:
                    case 6:
                        this.onStrikeBatsman.addBall(currentBall, true);
                        break;
                    case 1:
                    case 3:
                    case 5:
                        this.onStrikeBatsman.addBall(currentBall, false);
                        this.changeStrike();
                        break;
                    default:
                        throw Error(BALL_INVALID_STATE);
                }
                //  update the status, score etc for game
                if (this.score >= this.target) {
                    this.matchStatus = matchStatus.WON;
                }
                else if (this.score < this.target && this.wicketsLeft === 0) {
                    this.matchStatus = matchStatus.LOSS;
                }
            }
        }
    }
}
exports.Match = Match;
//# sourceMappingURL=match.js.map