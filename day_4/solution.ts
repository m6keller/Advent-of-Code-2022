import * as fs from "fs";

const DATA = fs.readFileSync("day_4/input.txt", "utf8");
const DATA_ARRAY = DATA.split("\n");
// const DATA_ARRAY = [
//   "2-4,6-8",
//   "2-3,4-5",
//   "5-7,7-9",
//   "2-8,3-7",
//   "6-6,4-6",
//   "2-6,4-8",
// ];

const part1 = () => {
  let count: number = 0;

  for (let i: number = 0; i < DATA_ARRAY.length; i++) {
    if (DATA_ARRAY[i] === "") continue;
    const splitPairs: string[] = DATA_ARRAY[i].split(",");
    const range1: string = splitPairs[0];
    const range2: string = splitPairs[1];

    const range1Num: number[] = range1.split("-").map((num) => parseInt(num));
    const range2Num: number[] = range2.split("-").map((num) => parseInt(num));

    if (
      (range1Num[0] <= range2Num[0] && range1Num[1] >= range2Num[1]) ||
      (range2Num[0] <= range1Num[0] && range2Num[1] >= range1Num[1])
    ) {
      count += 1;
    }
  }
  console.log("Part 1 count", count);
};

const part2 = () => {
  let count: number = 0;

  for (let i: number = 0; i < DATA_ARRAY.length; i++) {
    if (DATA_ARRAY[i] === "") continue;

    const splitPairs: string[] = DATA_ARRAY[i].split(",");
    const range1: string = splitPairs[0];
    const range2: string = splitPairs[1];

    const range1Num: number[] = range1.split("-").map((num) => parseInt(num));
    const range2Num: number[] = range2.split("-").map((num) => parseInt(num));

    if (
      range1Num[0] === range2Num[0] ||
      range1Num[1] === range2Num[1] ||
      range1Num[0] === range2Num[1] ||
      range1Num[1] === range2Num[0]
    ) {
      count++;
    } else if (range1Num[0] > range2Num[0] && range1Num[0] < range2Num[1]) {
      count++;
    } else if (range2Num[0] > range1Num[0] && range2Num[0] < range1Num[1]) {
      count++;
    }
  }

  console.log("Part 2 count:", count);
};

part2();
