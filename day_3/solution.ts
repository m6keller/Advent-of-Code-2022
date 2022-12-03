import * as fs from "fs";

const DATA: string = fs.readFileSync("input.txt", "utf8");

const DATA_ARRAY: string[] = DATA.split("\n");

const findSimilar = (first: string, second: string): string => {
  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      if (first[i] === second[j]) return first[i];
    }
  }
  return "";
};

const find3BagSimilar = (
  first: string,
  second: string,
  third: string
): string => {
  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      for (let k = 0; k < third.length; k++) {
        if (first[i] === second[j] && first[i] === third[k]) return first[i];
      }
    }
  }

  return "";
};

const getScore = (character: string): number => {
  const base: number = character.charCodeAt(0) + 1;
  return character === character.toUpperCase() ? base - 39 : base - 97;
};

const partB = (): number => {
  let total: number = 0;
  for (let i: number = 0; i < DATA_ARRAY.length; i += 3) {
    if (DATA_ARRAY[i] === "") continue;
    const first: string = DATA_ARRAY[i];
    const second: string = DATA_ARRAY[i + 1];
    const third: string = DATA_ARRAY[i + 2];

    const similarChar: string = find3BagSimilar(first, second, third);
    total += getScore(similarChar);
  }

  return total;
};

const partA = (): number => {
  let total: number = 0;
  for (let i: number = 0; i < DATA_ARRAY.length; i++) {
    if (DATA_ARRAY[i] === "") continue;

    const half: number = DATA_ARRAY[i].length / 2;

    const first: string = DATA_ARRAY[i].slice(0, half);
    const second: string = DATA_ARRAY[i].slice(half);
    const similarChar: string = findSimilar(first, second);
    if (similarChar === "") {
      console.log("No similar char found");
      console.log("First:", first);
      console.log("Second:", second);
      console.log("index: ", i);
    }
    total += getScore(similarChar);
  }

  return total;
};

console.log("Part A:", partA());
console.log("Part B:", partB());
