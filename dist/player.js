"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weightedRandomNumber_1 = require("./weightedRandomNumber");
/**
 * Ball Class to capture and track properis for a ball played by batsman
 */
class Ball {
    constructor(overId, runScored, isOut) {
        this.overId = overId;
        this.runScored = runScored;
        this.isOut = isOut;
        if (isOut) {
            this.runScored = 0;
        }
    }
}
exports.Ball = Ball;
class Over {
    constructor(overNo) {
        this.overNo = overNo;
        this.ballsHistory = [];
        this.runScored = 0;
        this.wickets = 0;
    }
    addBall(ball) {
        this.runScored += ball.runScored;
        if (ball.isOut) {
            this.wickets += 1;
        }
        this.ballsHistory.push(ball);
    }
}
exports.Over = Over;
/**
 * Player class to maintain and capture properties and methods
 */
class Player extends weightedRandomNumber_1.default {
    constructor(name, outcome, weights) {
        super(outcome, weights);
        this.name = name;
        this.isOut = false;
        this.ballsFaced = 0;
        this.runsScored = 0;
        this.onStike = false;
        this.ballsFacedHistory = [];
    }
    //  set Batsman on Strike
    setStrike(isOnStrike) {
        this.onStike = isOnStrike;
    }
    //  add's ball to the players property
    addBall(ball, isOnStrike) {
        this.ballsFaced += 1;
        this.isOut = ball.isOut;
        this.onStike = isOnStrike;
        if (!ball.isOut) {
            this.runsScored += ball.runScored;
        }
        this.ballsFacedHistory.push(ball);
    }
    //  get the outcome for Ball played by player
    getBallOutcome() {
        const outCome = this.getRandomItem();
        return outCome;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map