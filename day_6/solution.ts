import * as fs from "fs";

const TEST: boolean = false;

const DATA: string = TEST
  ? "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"
  : fs.readFileSync("day_6/input.txt", "utf8");

const part1 = () => {
  let curList: string[] = [];

  for (let i: number = 0; i < DATA.length; i++) {
    let found = false;

    for (let j: number = 0; j < curList.length && !found; j++) {
      if (curList[j] !== DATA[i]) continue;
      curList = curList.slice(j + 1, curList.length);
      found = true;
    }
    curList.push(DATA[i]);

    if (curList.length === 14) {
      console.log("Found at index:", i + 1);
      return i + 1;
    }
  }
};

part1();
