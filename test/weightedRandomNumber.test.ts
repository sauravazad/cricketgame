import { expect } from "chai";
import randomNumber from "../src/weightedRandomNumber";
const numbers = [1, 2, 3, 4];
const weights = [0.1, 0.4, 0.3, 0.2];
describe("randomNumber", () => {
  const rand = new randomNumber(numbers, weights);
  it("Should have number and their weights/propablity", () => {
    expect(rand.list.length).to.equal(numbers.length);
    expect(rand.weights.length).to.equal(weights.length);
  });
  it("should return a value from the numbers", () => {
    expect(numbers)
      .to.be.an("array")
      .that.includes(rand.getRandomItem());
  });
});
