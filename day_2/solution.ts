import * as fs from "fs";

const DATA: string = fs.readFileSync("input.txt", "utf8");

// const DATA_ARRAY: string[] = ["A Y", "B X", "C Z"]; // should give 12
const DATA_ARRAY: string[] = DATA.split("\n");

type opponentMoves = "A" | "B" | "C";
type playerMoves = "X" | "Y" | "Z";

const moveMap: { [key: string]: string } = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
};

const findMove = (oppShape: string, playerMove: playerMoves): number => {
  if (playerMove == "X") {
    // tryna lose
    // console.log("trying to lose");
    if (oppShape === "Rock") {
      // scissors + loss
      return 3 + 0;
    } else if (oppShape === "Paper") {
      // rock + loss
      return 1 + 0;
    } else {
      // paper + loss
      return 2 + 0;
    }
  } else if (playerMove == "Y") {
    // console.log("trying to tie");
    // tryna tie
    if (oppShape === "Rock") {
      // rock + tie
      return 1 + 3;
    } else if (oppShape === "Paper") {
      // paper + tie
      return 2 + 3;
    } else {
      // scissors + tie
      return 3 + 3;
    }
  } else {
    // tryna win
    // console.log("trying to win");

    if (oppShape === "Rock") {
      // paper + win
      return 2 + 6;
    } else if (oppShape === "Paper") {
      // scissors + win
      return 3 + 6;
    } else {
      // rock + win
      return 1 + 6;
    }
  }
};

const getScore = (oppMove: opponentMoves, yourMove: playerMoves): number => {
  //   const playerShape: string = moveMap[yourMove];
  const opponentShape: string = moveMap[oppMove];

  const moveScore = findMove(opponentShape, yourMove);

  return moveScore;
};

let score: number = 0;

for (let i: number = 0; i < DATA_ARRAY.length; i++) {
  if (DATA_ARRAY[i] === "") continue;

  const curData: [opponentMoves, playerMoves] = <[opponentMoves, playerMoves]>(
    DATA_ARRAY[i].split(" ")
  );

  score += getScore(curData[0], curData[1]);
}

console.log("Score:", score);
