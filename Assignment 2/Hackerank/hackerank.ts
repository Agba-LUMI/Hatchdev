// Arrays DS
"use strict";

class ArrayReverser {
  static reverseArray(arr: number[]): number[] {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
    return arr;
  }
}

let input: string = "";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

process.stdin.on("data", (chunk: string) => {
  input += chunk;
});

process.stdin.on("end", () => {
  const lines: string[] = input.trim().split("\n");
  const n: number = parseInt(lines[0].trim(), 10);
  const arr: number[] = lines[1].trim().split(/\s+/).map(Number);
  const result: number[] = ArrayReverser.reverseArray(arr);
  console.log(result.join(" "));
});
// 2D ARRAYS DATA STRUCTURES
("use strict");

class HourglassCalculator {
  private grid: number[][];

  constructor(grid: number[][]) {
    this.grid = grid;
  }

  public getMaxHourglassSum(): number {
    let maxSum = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i <= 3; i++) {
      for (let j = 0; j <= 3; j++) {
        const sum =
          this.grid[i][j] +
          this.grid[i][j + 1] +
          this.grid[i][j + 2] +
          this.grid[i + 1][j + 1] +
          this.grid[i + 2][j] +
          this.grid[i + 2][j + 1] +
          this.grid[i + 2][j + 2];

        maxSum = Math.max(maxSum, sum);
      }
    }

    return maxSum;
  }
}

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", (inputStdin: string): void => {
  inputString += inputStdin;
});

process.stdin.on("end", (): void => {
  inputLines = inputString.trim().split("\n");
  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

function main(): void {
  const grid: number[][] = [];

  for (let i = 0; i < 6; i++) {
    const row: number[] = readLine().trim().split(/\s+/).map(Number);
    grid.push(row);
  }

  const calculator = new HourglassCalculator(grid);
  const result = calculator.getMaxHourglassSum();
  console.log(result);
}

//Dynamic Arrays
("use strict");

class DynamicArray {
  private arr: number[][];
  private lastAnswer: number;
  private results: number[];
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.arr = Array.from({ length: n }, () => []);
    this.lastAnswer = 0;
    this.results = [];
  }

  public processQuery(type: number, x: number, y: number): void {
    const idx = (x ^ this.lastAnswer) % this.n;
    if (type === 1) {
      this.arr[idx].push(y);
    } else if (type === 2) {
      const size = this.arr[idx].length;
      const element = this.arr[idx][y % size];
      this.lastAnswer = element;
      this.results.push(this.lastAnswer);
    }
  }

  public getResults(): number[] {
    return this.results;
  }
}

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", (inputStdin: string): void => {
  inputString += inputStdin;
});

process.stdin.on("end", (): void => {
  inputLines = inputString.trim().split("\n");
  inputString = "";
  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

function main(): void {
  const firstLine = readLine().trim().split(" ");
  const n = parseInt(firstLine[0], 10);
  const q = parseInt(firstLine[1], 10);

  const dynamicArray = new DynamicArray(n);

  for (let i = 0; i < q; i++) {
    const query = readLine().trim().split(" ").map(Number);
    dynamicArray.processQuery(query[0], query[1], query[2]);
  }

  const results = dynamicArray.getResults();
  results.forEach((res) => console.log(res));
}

//Left Rotation
("use strict");

class ArrayRotator {
  private arr: number[];

  constructor(arr: number[]) {
    this.arr = arr;
  }

  public rotateLeft(d: number): number[] {
    const n = this.arr.length;
    const r = d % n;
    return this.arr.slice(r).concat(this.arr.slice(0, r));
  }
}

let inputString: string = "";
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on("data", (inputStdin: string): void => {
  inputString += inputStdin;
});

process.stdin.on("end", (): void => {
  inputLines = inputString.trim().split("\n");
  inputString = "";
  main();
});

function readLine(): string {
  return inputLines[currentLine++];
}

function main(): void {
  const firstLine = readLine().split(" ");
  const n = parseInt(firstLine[0], 10);
  const d = parseInt(firstLine[1], 10);

  const arr = readLine().split(" ").map(Number);
  const rotator = new ArrayRotator(arr);
  const rotatedArray = rotator.rotateLeft(d);

  console.log(rotatedArray.join(" "));
}
