import { expect } from "chai";
import { Player, Ball } from "../src/player";
const numbers = [1, 2, 3, 4];
const name = "TEST_PLAYER";
const weights = [0.1, 0.4, 0.3, 0.2];
describe("Player Class", () => {
  const Batsman = new Player(name, numbers, weights);
  it("BatsMan should have all default properties", () => {
    expect(Batsman.name).to.be.equal(name);
    expect(Batsman.ballsFaced).to.be.equal(0);
    expect(Batsman.isOut).to.be.equal(false);
    expect(Batsman.onStike).to.be.equal(false);
    expect(Batsman.runsScored).to.be.equal(0);
  });
  it("Batsman.setStrike to set the batsman strike status", () => {
    Batsman.setStrike(true);
    expect(Batsman.onStike).to.be.equal(true);
    Batsman.setStrike(false);
    expect(Batsman.onStike).to.be.equal(false);
  });
  it("Player.getBallOutcome -> should return a number that is in numbers list", () => {
    const outCome = Batsman.getBallOutcome();
    expect(numbers)
      .to.be.an("array")
      .that.includes(outCome);
  });

  it("Player.addBall -> should add the outcome of the ball to player", () => {
    const outCome = Batsman.getBallOutcome();
    const isOut = outCome === -1;
    const isOnStrike = outCome === 0 || outCome === 2 || outCome === 4 || outCome === 6 || outCome === -1;
    const ball = new Ball("0.1", outCome, isOut);
    const run = outCome !== -1 ? outCome : 0;
    Batsman.addBall(ball, isOnStrike);
    expect(Batsman.ballsFaced).to.equal(1);
    expect(Batsman.runsScored).to.equal(run);
  });
});

describe("Ball class", () => {
  const overId = "1.1";
  const runScored = 4;
  const isOut = false;
  const ball = new Ball(overId, runScored, isOut);
  it("Ball to have properties", () => {
    expect(ball.isOut).to.equal(isOut);
    expect(ball.runScored).to.equal(runScored);
    expect(ball.overId).to.equal(overId);
  });
});
