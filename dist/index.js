"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const match_1 = require("./match");
const TEAM_NAME = "Bengaluru";
const NUMBER_OF_OVERS = 4;
const NUMBER_OF_WICKETS = 3;
const WINNING_SCORE = 40;
const PLAYER_NAME = ["Saurav", "Sachin", "Virat", "Rohit"];
//  do not change the ball Outcome as -1 represent that the batsman is out
const BALL_OUTCOMES = [-1, 0, 1, 2, 3, 4, 5, 6];
//  set the ball_outcome probablity /weight's
const BALL_PROBABLITY_WEIGHTS = [0.2, 0.1, 0.2, 0.1, 0.05, 0.2, 0.05, 0.1];
//  match statu's
var matchStatus;
(function (matchStatus) {
    matchStatus["WON"] = "WON";
    matchStatus["LOSS"] = "LOSS";
    matchStatus["IN_PROGRESS"] = "IN_PROGRESS";
})(matchStatus || (matchStatus = {}));
//  set number of iterations to run for testing
const total_iterations = 1;
let iterations = 1;
const results = {
    [matchStatus.WON]: 0,
    [matchStatus.LOSS]: 0,
    [matchStatus.IN_PROGRESS]: 0
};
while (iterations) {
    const fourOverMatch = new match_1.Match(TEAM_NAME, NUMBER_OF_OVERS, NUMBER_OF_WICKETS, WINNING_SCORE, PLAYER_NAME, BALL_OUTCOMES, BALL_PROBABLITY_WEIGHTS);
    const status = fourOverMatch.play();
    results[status] += 1;
    iterations--;
}
console.time("SAMPLING MATCH");
console.info("\n-------------------");
console.log(results);
console.log(`\nWIN RATIO : ${results.WON / total_iterations}`);
console.log(`LOSS RATIO : ${results.LOSS / total_iterations}`);
console.timeEnd("SAMPLING MATCH");
//# sourceMappingURL=index.js.map