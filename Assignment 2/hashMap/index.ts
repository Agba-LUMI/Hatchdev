class HashMap<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private _size: number;
  private capacity: number;
  private loadFactor: number;

  constructor(initialCapacity: number = 16, loadFactor: number = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this._size = 0;
  }

  private hash(key: K): number {
    const keyString = String(key);
    let hash = 0;

    for (let i = 0; i < keyString.length; i++) {
      const char = keyString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash) % this.capacity;
  }

  put(key: K, value: V): void {
    if (this.needsResize()) this.resize();

    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (this.keysEqual(bucket[i][0], key)) {
        bucket[i][1] = value; // Update existing
        return;
      }
    }

    bucket.push([key, value]); // Add new entry
    this._size++;
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (this.keysEqual(k, key)) return v;
    }
    return undefined;
  }

  remove(key: K): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (this.keysEqual(bucket[i][0], key)) {
        bucket.splice(i, 1);
        this._size--;
        return;
      }
    }
  }

  private keysEqual(key1: K, key2: K): boolean {
    // Handle object comparison
    if (typeof key1 === "object" && typeof key2 === "object") {
      return JSON.stringify(key1) === JSON.stringify(key2);
    }
    return key1 === key2;
  }

  private needsResize(): boolean {
    return this._size / this.capacity >= this.loadFactor;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this._size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.put(key, value);
      }
    }
  }

  size(): number {
    return this._size;
  }

  entries(): Array<[K, V]> {
    const allEntries: Array<[K, V]> = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        allEntries.push(entry);
      }
    }
    return allEntries;
  }
}

// USAGE
// Basic usage
const map = new HashMap<string, number>();
map.put("apple", 10);
map.put("banana", 20);
console.log(map.get("apple")); // 10

// Handle collision
map.put("apPle", 30); // Different key due to case sensitivity
console.log(map.get("apPle")); // 30

// Object keys
const objMap = new HashMap<object, string>();
const key1 = { id: 1 };
const key2 = { id: 1 };

objMap.put(key1, "value1");
console.log(objMap.get(key2)); // "value1" (objects with same structure)

// Remove entries
map.remove("apple");
console.log(map.get("apple")); // undefined
