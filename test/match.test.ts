import { expect } from "chai";
import { Match } from "../src/match";
const TEAM_NAME = "Bengaluru";
const NUMBER_OF_OVERS = 4;
const NUMBER_OF_WICKETS = 3;
const WINNING_SCORE = 40;
const PLAYER_NAME = ["Saurav", "Sachin", "Virat", "Rohit"];
//  do not change the ball Outcome as -1 represent that the batsman is out
const BALL_OUTCOMES = [-1, 0, 1, 2, 3, 4, 5, 6];
//  set the ball_outcome probablity /weight's
const BALL_PROBABLITY_WEIGHTS = [0.2, 0.1, 0.2, 0.1, 0.05, 0.2, 0.05, 0.1];
describe("Match -> simulates the match progess", () => {
  const fourOverMatch = new Match(
    TEAM_NAME,
    NUMBER_OF_OVERS,
    NUMBER_OF_WICKETS,
    WINNING_SCORE,
    PLAYER_NAME,
    BALL_OUTCOMES,
    BALL_PROBABLITY_WEIGHTS
  );
  it("Match class should have all default properties on initialization", () => {
    expect(fourOverMatch.ballNo).to.equal(0);
    expect(fourOverMatch.ballId).to.equal("");
    expect(fourOverMatch.currentOver).to.equal(0);
    expect(fourOverMatch.ballsPlayed).to.equal(0);
    expect(fourOverMatch.matchStatus).to.equal("IN_PROGRESS");
    expect(fourOverMatch.name).to.equal(TEAM_NAME);
    expect(fourOverMatch.nextBatsmanIndex).to.equal(2);
    expect(fourOverMatch.noofbatsmen).to.equal(PLAYER_NAME.length);
    expect(fourOverMatch.overs).to.equal(NUMBER_OF_OVERS);
    expect(fourOverMatch.wickets).to.equal(NUMBER_OF_WICKETS);
    expect(fourOverMatch.wicketsLeft).to.equal(NUMBER_OF_WICKETS);
    expect(fourOverMatch.target).to.equal(WINNING_SCORE);
    expect(fourOverMatch.score).to.equal(0);
  });
  it("Match=> getInfo should return match info", () => {
    const status = fourOverMatch.play();
    expect(fourOverMatch.getInfo().status).to.be.equal(status);
  });
});
