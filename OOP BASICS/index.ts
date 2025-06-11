//  O(1) – Constant Time
// These algorithms do not scale with input size. The operations take the same time regardless of input size.
// Accessing an element in an array
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0]; // Constant time access
}
// Check if a number is even
function isEven(n: number): boolean {
  return n % 2 === 0; // Constant time calculation
}

// O(log n) – Logarithmic Time
// These typically use divide-and-conquer strategies (like binary search).
// Binary Search
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1; // Not found
}

// Compute log base 2 (manual approach)
function integerLog2(n: number): number {
  let count = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    count++;
  }
  return count;
}

// O(n) – Linear Time
// These scale directly with the size of input.
// Sum all elements in an array
function sumArray(arr: number[]): number {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum;
}

// Find max in array
function findMax(arr: number[]): number | undefined {
  if (arr.length === 0) return undefined;
  let max = arr[0];
  for (let num of arr) {
    if (num > max) max = num;
  }
  return max;
}
