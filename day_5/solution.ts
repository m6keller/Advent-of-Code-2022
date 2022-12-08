import * as fs from "fs";

const TEST: boolean = false;

const SET_UP = TEST
  ? { filePath: "day_5/test_input.txt", lineBreak: 5, numQueues: 3 }
  : { filePath: "day_5/input.txt", lineBreak: 10, numQueues: 9 };

const DATA: string[] = fs.readFileSync(SET_UP.filePath, "utf8").split("\n");

const queues: string[][] = TEST
  ? [["Z", "N"], ["M", "C", "D"], ["P"]]
  : [
      ["V", "N", "F", "S", "M", "P", "H", "J"],
      ["Q", "D", "J", "M", "L", "R", "S"],
      ["B", "W", "S", "C", "H", "D", "Q", "N"],
      ["L", "C", "S", "R"],
      ["B", "F", "P", "T", "V", "M"],
      ["C", "N", "Q", "R", "T"],
      ["R", "V", "G"],
      ["R", "L", "D", "P", "S", "Z", "C"],
      ["F", "B", "P", "G", "V", "J", "S", "D"],
    ];

if (!TEST) {
  queues.map((q) => q.reverse());
}

const part2 = () => {
  for (let i = SET_UP.lineBreak; i < DATA.length; i++) {
    // pop stuff from queues
    if (DATA[i] === "") continue;

    const instructions: string = DATA[i];

    const splitInstructions = instructions.split("move ")[1].split(" ");

    const amount: number = Number(splitInstructions[0]);

    const first: number = Number(splitInstructions[2]);
    const second: number = Number(splitInstructions[4]);

    const miniQueue: string[] = [];

    for (let i = 0; i < amount; i++) {
      miniQueue.push(queues[first - 1].pop()!);
    }

    for (let i = 0; i < amount; i++) {
      queues[second - 1].push(miniQueue.pop()!);
    }
  }

  console.log("END VALUES");
  queues.forEach((q) => {
    console.log(q[q.length - 1]);
  });
};

const part1 = () => {
  for (let i = SET_UP.lineBreak; i < DATA.length; i++) {
    // pop stuff from queues
    if (DATA[i] === "") continue;

    const instructions: string = DATA[i];

    const splitInstructions = instructions.split("move ")[1].split(" ");

    const amount: number = Number(splitInstructions[0]);

    const first: number = Number(splitInstructions[2]);
    const second: number = Number(splitInstructions[4]);
    for (let i = 0; i < amount; i++) {
      const movingVal: string = queues[first - 1].pop()!;
      queues[second - 1].push(movingVal);
    }
  }

  console.log("END VALUES");
  queues.forEach((q) => {
    console.log(q[q.length - 1]);
  });
};

part2();
