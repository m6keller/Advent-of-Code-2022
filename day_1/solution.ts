import * as fs from "fs";

const DATA: string = fs.readFileSync("input.txt", "utf8");

const DATA_ARR: string[] = DATA.split("\n");

let elfIndex: number = 0;
let elfMap: Map<number, number[]> = new Map();

for (let i: number = 0; i < DATA_ARR.length; i++) {
  if (DATA_ARR[i] == "") elfIndex++;
  else {
    // elf with most cookies
    const prev = elfMap.get(elfIndex);
    const prev_val: number = prev ? prev[0] : 0;

    // elf with most calories
    const prev_cal = elfMap.get(elfIndex);
    const prev_cal_val: number = prev_cal ? prev_cal[1] : 0;

    elfMap.set(elfIndex, [prev_val + 1, prev_cal_val + Number(DATA_ARR[i])]);
  }
}

let firstElfCalories = 0;
let secondElfCalories = 0;
let thirdElfCalories = 0;

console.log("elf index", elfIndex);
for (let [key, value] of elfMap) {
  if (value[1] < thirdElfCalories) {
    continue;
  } else if (value[1] < secondElfCalories) {
    thirdElfCalories = value[1];
  } else {
    thirdElfCalories = secondElfCalories;
    if (value[1] < firstElfCalories) {
      secondElfCalories = value[1];
    } else {
      secondElfCalories = firstElfCalories;
      firstElfCalories = value[1];
    }
  }
}

console.log("firstElfCalories", firstElfCalories);
console.log("secondElfCookies", secondElfCalories);
console.log("thirdElfCookies", thirdElfCalories);

console.log(
  "Sum of calories of max",
  firstElfCalories + secondElfCalories + thirdElfCalories
);
