"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class randomNumber {
    constructor(list, weights) {
        if (list.length !== weights.length) {
            throw Error("Every number in should have a weight!!");
        }
        this.list = list;
        this.weights = weights;
        this.sumOfWeights = weights.reduce((a, b) => a + b);
    }
    randomInt(min, max) {
        //  Math.random return's number in rander of (0,1) exclusive of 1
        return Math.random() * (max - min) + min;
    }
    getRandomItem() {
        const randomWeight = this.randomInt(0, this.sumOfWeights);
        // console.log(randomWeight);
        let weightSum = 0;
        for (let i = 0; i < this.weights.length; i++) {
            weightSum += this.weights[i];
            if (randomWeight <= weightSum) {
                return this.list[i];
            }
        }
    }
}
exports.default = randomNumber;
const debug = false;
if (debug) {
    const numbers = [-1, 0, 1, 2, 3, 4, 5, 6];
    const weights = [0.05, 0.05, 0.1, 0.1, 0.1, 0.1, 0.2, 0.3];
    console.log("TSC");
    console.time("RUNTIME");
    const random = new randomNumber(numbers, weights);
    const map = {};
    const iterations = 10000;
    for (let i = 0; i < iterations; i++) {
        const num = random.getRandomItem();
        if (map[num]) {
            map[num] += 1;
        }
        else {
            map[num] = 1;
        }
    }
    console.log(map);
    Object.values(map).forEach((value) => {
        console.log(value / iterations);
    });
    console.timeEnd("RUNTIME");
}
//# sourceMappingURL=weightedRandomNumber.js.map