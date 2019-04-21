export default class BinarySearch {
  list: number[];
  value: number;
  constructor(list: number[], value: number) {
    this.list = list;
    this.value = value;
  }
  binaryFind() {
    let r = this.list.length;
    let l = 0;
    let mid = 0;
    while (l <= r) {
      mid = l + (r - 1) / 2;
      if (this.list[mid] === this.value) {
        return mid;
      } else if (this.list[mid] < this.value) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return -1;
  }
  binaryFindNearest() {
    let r: number = this.list.length;
    let l: number = 0;
    let mid = Number.POSITIVE_INFINITY;
    let currentDiff = this.list[this.list.length - 1];
    let lastMidIndex = this.list.length - 1;
    while (l <= r) {
      mid = parseInt((l + r - 1 / 2).toString(), 10);
      const diff = Math.abs(this.list[mid] - this.value);
      if (this.list[mid] === this.value) {
        return mid;
      }
      if (diff < currentDiff) {
        currentDiff = diff;
        lastMidIndex = mid;
      } else {
        return lastMidIndex;
      }
      if (this.list[mid] < this.value) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return -1;
  }
}
const debug = false;
if (debug) {
  // var search = new BinarySearch([1, 2, 3, 4, 5], 3);
  var search = new BinarySearch([0.1, 0.2, 0.2, 0.6, 0.7], 0.43);
  console.log(search.binaryFindNearest());
}
