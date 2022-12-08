import * as fs from "fs";

const TEST = false;

const FILE_PATH: string = TEST ? "day_7/test_input.txt" : "day_7/input.txt";

const DATA: string = fs.readFileSync(FILE_PATH, "utf8");
const DATA_LINES: string[] = DATA.split("\n");

class File {
  size: number;
  name: string;

  constructor(name: string, size: number) {
    this.size = size;
    this.name = name;
  }
}

class Directory {
  directories: Map<string, Directory>;
  files: File[];
  name: string;
  prev?: Directory;

  constructor(
    directories: Map<string, Directory>,
    files: File[],
    name: string,
    prev: Directory | undefined = undefined
  ) {
    this.directories = directories;
    this.files = files;
    this.name = name;
    this.prev = prev;
  }

  addDir(dirname: string) {
    const dir: Directory = new Directory(new Map(), [], dirname, this);
    this.directories.set(dirname, dir);
  }

  addFile(filename: string, size: number) {
    const file: File = new File(filename, size);
    this.files.push(file);
  }

  getSize(): number {
    let size = 0;

    for (const [_, directory] of this.directories) {
      size += directory.getSize();
    }
    for (let file of this.files) {
      size += file.size;
    }
    return size;
  }
}

const ROOT: Directory = new Directory(new Map(), [], "root");

let curDir = ROOT;

for (let i: number = 1; i < DATA_LINES.length; i++) {
  if (DATA_LINES[i] === "") continue;

  const instructions: string[] = DATA_LINES[i].split(" ");

  if (instructions[1] === "ls") continue;

  console.log("instructions", instructions);

  if (instructions[0] === "dir") curDir.addDir(instructions[1]);
  else if (
    instructions[0] === "$" &&
    instructions[1] === "cd" &&
    instructions[2] === ".."
  ) {
    curDir = curDir.prev!;
  } else if (instructions[0] === "$" && instructions[1] === "cd") {
    if (!curDir.directories.get(instructions[2])!) {
      throw new Error("directory should exist");
    }
    console.log("going to new directory", instructions[2]);
    curDir = curDir.directories.get(instructions[2])!;
  } else {
    //file
    curDir.addFile(instructions[1], parseInt(instructions[0]));
  }
}

const part1 = (): number => {
  let count: number = 0;

  const bfs = (directory: Directory = ROOT) => {
    if (directory.getSize() < 100000) count += directory.getSize();
    for (const [_, dir] of directory.directories) {
      bfs(dir);
    }
  };

  bfs();
  return count;
};

const part2 = (): number => {
  // need 30000000 - (70000000 - ROOT.getSize())
  let necessarySpace: number = 30000000 - (70000000 - ROOT.getSize());

  let close: number = 30000000;
  const bfs = (directory: Directory = ROOT) => {
    const curSize: number = directory.getSize();
    if (
      necessarySpace <= curSize &&
      Math.abs(necessarySpace - curSize) < Math.abs(necessarySpace - close)
    ) {
      close = curSize;
    }
    for (const [_, dir] of directory.directories) {
      bfs(dir);
    }
  };

  bfs();
  return close;
};

// console.log("part1", part1());
console.log("part2", part2());
