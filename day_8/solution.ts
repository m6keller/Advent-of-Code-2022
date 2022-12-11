import * as fs from "fs";

const TEST: boolean = false;

const FILE_PATH: string = TEST ? "day_8/test_input.txt" : "day_8/input.txt";

const DATA: string = fs.readFileSync(FILE_PATH, "utf8");

const DATA_MATRIX: number[][] = [];

for (let line of DATA.split("\n")) {
  if (line === "") continue;
  const row: number[] = [];
  for (let number of line.split("")) {
    row.push(parseInt(number));
  }
  DATA_MATRIX.push(row);
}

const WIDTH: number = DATA_MATRIX[0].length;
const HEIGHT: number = DATA_MATRIX.length;

class ObjectSet<T> extends Set {
  // this is necessary cuz JS is compares non-primitive objects by reference
  add(elem: T) {
    return super.add(typeof elem === "object" ? JSON.stringify(elem) : elem);
  }
  has(elem: T) {
    return super.has(typeof elem === "object" ? JSON.stringify(elem) : elem);
  }
}

const part1 = (): number => {
  const seenSet: ObjectSet<[number, number]> = new ObjectSet();

  // go thru rows
  for (let i = 0; i < HEIGHT; i++) {
    const curList = DATA_MATRIX[i];

    let tallestLeft: number = -1;
    let tallestRight: number = -1;

    let leftP: number = 0;
    let rightP: number = WIDTH - 1;

    while (leftP <= rightP) {
      if (DATA_MATRIX[i][leftP] > tallestLeft) {
        tallestLeft = curList[leftP];
        seenSet.add([leftP, i]);
      }
      if (DATA_MATRIX[i][rightP] > tallestRight) {
        tallestRight = curList[rightP];
        seenSet.add([rightP, i]);
      }
      if (tallestLeft < tallestRight) leftP++;
      else rightP--;
    }
  }

  // go thru columns
  for (let i = 0; i < WIDTH; i++) {
    let tallestLeft: number = -1;
    let tallestRight: number = -1;

    let leftP: number = 0;
    let rightP: number = HEIGHT - 1;

    while (leftP <= rightP) {
      if (DATA_MATRIX[leftP][i] > tallestLeft) {
        tallestLeft = DATA_MATRIX[leftP][i];
        seenSet.add([i, leftP]);
      }

      if (DATA_MATRIX[rightP][i] > tallestRight) {
        tallestRight = DATA_MATRIX[rightP][i];
        seenSet.add([i, rightP]);
      }
      if (tallestLeft < tallestRight) leftP++;
      else rightP--;
    }
  }
  return seenSet.size;
};

const part2 = (): number => {
  const getScore = (x: number, y: number): number => {
    const curHeight: number = DATA_MATRIX[y][x];

    // go left
    let left: number = 0;
    for (let i = x - 1; i >= 0; i--) {
      left++;
      if (DATA_MATRIX[y][i] >= curHeight) break;
    }

    // go right
    let right: number = 0;
    for (let i = x + 1; i <= WIDTH - 1; i++) {
      right++;
      if (DATA_MATRIX[y][i] >= curHeight) break;
    }

    // go up
    let up: number = 0;
    for (let j = y - 1; j >= 0; j--) {
      up++;
      if (DATA_MATRIX[j][x] >= curHeight) break;
    }

    // go down
    let down: number = 0;
    for (let j = y + 1; j <= HEIGHT - 1; j++) {
      down++;
      if (DATA_MATRIX[j][x] >= curHeight) break;
    }
    return left * right * up * down;
  };

  let highScore: number = 0;

  for (let i: number = 0; i < HEIGHT; i++) {
    for (let j: number = 0; j < WIDTH; j++) {
      const curScore: number = getScore(i, j);
      if (curScore > highScore) highScore = curScore;
    }
  }

  return highScore;
};

console.log("Part 1:", part1());
console.log("Part 2:", part2());
