import randomNumber from "./weightedRandomNumber";
/**
 * Ball Class to capture and track properis for a ball played by batsman
 */
export class Ball {
  overId: string;
  runScored: number;
  isOut: boolean;
  constructor(overId: string, runScored: number, isOut: boolean) {
    this.overId = overId;
    this.runScored = runScored;
    this.isOut = isOut;
    if (isOut) {
      this.runScored = 0;
    }
  }
}

export class Over {
  overNo: number;
  ballsHistory: Ball[];
  wickets: number;
  runScored: number;
  constructor(overNo: number) {
    this.overNo = overNo;
    this.ballsHistory = [];
    this.runScored = 0;
    this.wickets = 0;
  }
  addBall(ball: Ball) {
    this.runScored += ball.runScored;
    if (ball.isOut) {
      this.wickets += 1;
    }
    this.ballsHistory.push(ball);
  }
}

/**
 * Player class to maintain and capture properties and methods
 */
export class Player extends randomNumber {
  name: string;
  isOut: boolean;
  ballsFaced: number;
  runsScored: number;
  onStike: boolean;
  private ballsFacedHistory: Ball[];
  constructor(name: string, outcome: number[], weights: number[]) {
    super(outcome, weights);
    this.name = name;
    this.isOut = false;
    this.ballsFaced = 0;
    this.runsScored = 0;
    this.onStike = false;
    this.ballsFacedHistory = [];
  }
  //  set Batsman on Strike
  setStrike(isOnStrike: boolean) {
    this.onStike = isOnStrike;
  }
  //  add's ball to the players property
  addBall(ball: Ball, isOnStrike: boolean) {
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
