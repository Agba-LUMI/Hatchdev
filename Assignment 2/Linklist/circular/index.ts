class CircularNode<T> {
  constructor(
    public value: T,
    public next: CircularNode<T> | null = null,
    public prev: CircularNode<T> | null = null
  ) {}
}

class CircularLinkedList<T> {
  private head: CircularNode<T> | null = null;
  private count = 0;

  get size(): number {
    return this.count;
  }

  append(value: T): void {
    const newNode = new CircularNode(value);

    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      const tail = this.head.prev!;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.count++;
  }

  prepend(value: T): void {
    this.append(value);
    this.head = this.head!.prev;
  }

  insertAt(value: T, index: number): void {
    if (index < 0 || index > this.count) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this.count) {
      this.append(value);
      return;
    }

    const newNode = new CircularNode(value);
    const current = this.getNodeAt(index)!;
    const prevNode = current.prev!;

    prevNode.next = newNode;
    newNode.prev = prevNode;
    newNode.next = current;
    current.prev = newNode;

    this.count++;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.count) return undefined;

    if (this.count === 1) {
      const value = this.head!.value;
      this.head = null;
      this.count--;
      return value;
    }

    const current = this.getNodeAt(index)!;
    const prevNode = current.prev!;
    const nextNode = current.next!;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    if (index === 0) {
      this.head = nextNode;
    }

    this.count--;
    return current.value;
  }

  remove(value: T): boolean {
    const index = this.find(value);
    if (index === -1) return false;
    this.removeAt(index);
    return true;
  }

  find(value: T): number {
    if (!this.head) return -1;

    let current = this.head;
    let index = 0;

    do {
      if (current.value === value) return index;
      current = current.next!;
      index++;
    } while (current !== this.head);

    return -1;
  }

  toArray(): T[] {
    const result: T[] = [];
    if (!this.head) return result;

    let current = this.head;
    do {
      result.push(current.value);
      current = current.next!;
    } while (current !== this.head);

    return result;
  }

  private getNodeAt(index: number): CircularNode<T> | null {
    if (index < 0 || index >= this.count) return null;

    let current = this.head!;
    for (let i = 0; i < index; i++) {
      current = current.next!;
    }
    return current;
  }
}
