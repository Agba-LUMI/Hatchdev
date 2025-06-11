class MyArray<T> {
  private data: { [index: number]: T } = {};
  private _length: number = 0;

  constructor(...items: T[]) {
    for (let i = 0; i < items.length; i++) {
      this.data[i] = items[i];
    }
    this._length = items.length;
  }

  get length(): number {
    return this._length;
  }

  // 1. push - Add element to end
  push(item: T): number {
    this.data[this._length] = item;
    this._length++;
    return this._length;
  }

  // 2. pop - Remove last element
  pop(): T | undefined {
    if (this._length === 0) return undefined;
    const lastItem = this.data[this._length - 1];
    delete this.data[this._length - 1];
    this._length--;
    return lastItem;
  }

  // 3. shift - Remove first element
  shift(): T | undefined {
    if (this._length === 0) return undefined;
    const firstItem = this.data[0];
    for (let i = 0; i < this._length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this._length - 1];
    this._length--;
    return firstItem;
  }

  // 4. unshift - Add element to start
  unshift(item: T): number {
    for (let i = this._length; i > 0; i--) {
      this.data[i] = this.data[i - 1];
    }
    this.data[0] = item;
    this._length++;
    return this._length;
  }

  // 5. map - Transform elements
  map<U>(callback: (value: T, index: number) => U): MyArray<U> {
    const newArray = new MyArray<U>();
    for (let i = 0; i < this._length; i++) {
      newArray.push(callback(this.data[i], i));
    }
    return newArray;
  }

  // 6. filter - Select elements
  filter(callback: (value: T, index: number) => boolean): MyArray<T> {
    const newArray = new MyArray<T>();
    for (let i = 0; i < this._length; i++) {
      if (callback(this.data[i], i)) {
        newArray.push(this.data[i]);
      }
    }
    return newArray;
  }

  // 7. reduce - Accumulate values
  reduce<U>(
    callback: (accumulator: U, currentValue: T, index: number) => U,
    initialValue: U
  ): U {
    let accumulator = initialValue;
    for (let i = 0; i < this._length; i++) {
      accumulator = callback(accumulator, this.data[i], i);
    }
    return accumulator;
  }

  // 8. forEach - Execute for each element
  forEach(callback: (value: T, index: number) => void): void {
    for (let i = 0; i < this._length; i++) {
      callback(this.data[i], i);
    }
  }

  // 9. concat - Combine arrays
  concat(...arrays: MyArray<T>[]): MyArray<T> {
    const newArray = new MyArray<T>();
    for (let i = 0; i < this._length; i++) {
      newArray.push(this.data[i]);
    }
    for (const arr of arrays) {
      for (let i = 0; i < arr.length; i++) {
        newArray.push(arr.get(i)!);
      }
    }
    return newArray;
  }

  // 10. slice - Extract portion
  slice(start: number = 0, end: number = this._length): MyArray<T> {
    const newArray = new MyArray<T>();
    for (let i = start; i < end && i < this._length; i++) {
      newArray.push(this.data[i]);
    }
    return newArray;
  }

  // 11. splice - Modify array (remove/add)
  splice(
    start: number,
    deleteCount: number = this._length - start,
    ...items: T[]
  ): MyArray<T> {
    const removed = new MyArray<T>();

    // Remove elements
    for (let i = 0; i < deleteCount; i++) {
      if (start + i < this._length) {
        removed.push(this.data[start + i]);
      }
    }

    // Shift elements
    const itemsCount = items.length;
    const diff = itemsCount - deleteCount;

    if (diff > 0) {
      // Move elements to the right
      for (let i = this._length - 1; i >= start; i--) {
        this.data[i + diff] = this.data[i];
      }
    } else if (diff < 0) {
      // Move elements to the left
      for (let i = start + deleteCount; i < this._length; i++) {
        this.data[i + diff] = this.data[i];
      }
      // Clean up extra space
      for (let i = this._length + diff; i < this._length; i++) {
        delete this.data[i];
      }
    }

    // Insert new items
    for (let i = 0; i < itemsCount; i++) {
      this.data[start + i] = items[i];
    }

    // Update length
    this._length = this._length + diff;

    return removed;
  }

  // 12. indexOf - Find element index
  indexOf(item: T, fromIndex: number = 0): number {
    for (let i = fromIndex; i < this._length; i++) {
      if (this.data[i] === item) {
        return i;
      }
    }
    return -1;
  }

  // 13. includes - Check existence
  includes(item: T): boolean {
    for (let i = 0; i < this._length; i++) {
      if (this.data[i] === item) {
        return true;
      }
    }
    return false;
  }

  // 14. join - Convert to string
  join(separator: string = ","): string {
    let result = "";
    for (let i = 0; i < this._length; i++) {
      result += String(this.data[i]);
      if (i < this._length - 1) {
        result += separator;
      }
    }
    return result;
  }

  // 15. reverse - Reverse in place
  reverse(): MyArray<T> {
    for (let i = 0; i < Math.floor(this._length / 2); i++) {
      const temp = this.data[i];
      this.data[i] = this.data[this._length - 1 - i];
      this.data[this._length - 1 - i] = temp;
    }
    return this;
  }

  // Helper to access elements
  get(index: number): T | undefined {
    return this.data[index];
  }

  // Helper to convert to regular array
  toArray(): T[] {
    const arr: T[] = [];
    for (let i = 0; i < this._length; i++) {
      arr.push(this.data[i]);
    }
    return arr;
  }
}

// Example Usage
const arr = new MyArray<number>(1, 2, 3, 4);

// Push/pop
arr.push(5);
console.log("After push:", arr.toArray()); // [1, 2, 3, 4, 5]
arr.pop();
console.log("After pop:", arr.toArray()); // [1, 2, 3, 4]

// Shift/unshift
arr.shift();
console.log("After shift:", arr.toArray()); // [2, 3, 4]
arr.unshift(1);
console.log("After unshift:", arr.toArray()); // [1, 2, 3, 4]

// Map/filter
const doubled = arr.map((x) => x * 2);
console.log("Mapped:", doubled.toArray()); // [2, 4, 6, 8]
const filtered = arr.filter((x) => x > 2);
console.log("Filtered:", filtered.toArray()); // [3, 4]

// Reduce
const sum = arr.reduce((acc, val) => acc + val, 0);
console.log("Sum:", sum); // 10

// Concat
const newArr = arr.concat(new MyArray(5, 6));
console.log("Concatenated:", newArr.toArray()); // [1, 2, 3, 4, 5, 6]

// Slice
const sliced = arr.slice(1, 3);
console.log("Sliced:", sliced.toArray()); // [2, 3]

// Splice
const removed = arr.splice(1, 2, 9, 10);
console.log("Splice removed:", removed.toArray()); // [2, 3]
console.log("After splice:", arr.toArray()); // [1, 9, 10, 4]

// IndexOf/includes
console.log("Index of 10:", arr.indexOf(10)); // 2
console.log("Includes 5?", arr.includes(5)); // false

// Join
console.log("Joined:", arr.join("-")); // "1-9-10-4"

// Reverse
arr.reverse();
console.log("Reversed:", arr.toArray()); // [4, 10, 9, 1]
