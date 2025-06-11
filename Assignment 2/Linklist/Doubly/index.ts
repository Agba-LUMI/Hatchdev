class DoublyNode<T> {
  constructor(
    public value: T,
    public next: DoublyNode<T> | null = null,
    public prev: DoublyNode<T> | null = null
  ) {}
}

class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private count = 0;

  get size(): number {
    return this.count;
  }

  append(value: T): void {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.count++;
  }

  prepend(value: T): void {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.count++;
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

    const newNode = new DoublyNode(value);
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

    let current = this.getNodeAt(index)!;

    if (this.count === 1) {
      this.head = null;
      this.tail = null;
    } else if (index === 0) {
      this.head = current.next;
      this.head!.prev = null;
    } else if (index === this.count - 1) {
      current = this.tail!;
      this.tail = current.prev;
      this.tail!.next = null;
    } else {
      const prevNode = current.prev!;
      const nextNode = current.next!;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
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
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  private getNodeAt(index: number): DoublyNode<T> | null {
    if (index < 0 || index >= this.count) return null;

    let current: DoublyNode<T> | null;
    if (index < this.count / 2) {
      current = this.head;
      for (let i = 0; i < index; i++) {
        current = current!.next;
      }
    } else {
      current = this.tail;
      for (let i = this.count - 1; i > index; i--) {
        current = current!.prev;
      }
    }
    return current;
  }
}
