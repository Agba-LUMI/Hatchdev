class Song {
  constructor(
    public id: string,
    public title: string,
    public artist: string,
    public duration: number
  ) {}
}

class ListNode {
  public next: ListNode | null = null;
  public prev: ListNode | null = null;

  constructor(public song: Song) {}
}

class Playlist {
  private head: ListNode | null = null;
  private tail: ListNode | null = null;
  private current: ListNode | null = null;
  private size: number = 0;
  private repeatMode: "none" | "song" | "playlist" = "none";
  private shuffleMode: boolean = false;
  private originalOrder: ListNode[] = [];

  // Add song to end of playlist
  add(song: Song): void {
    const newNode = new ListNode(song);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.head.next = this.head;
      this.head.prev = this.head;
      this.current = this.head;
    } else {
      newNode.prev = this.tail;
      newNode.next = this.head;
      this.tail!.next = newNode;
      this.head.prev = newNode;
      this.tail = newNode;
    }

    this.originalOrder.push(newNode);
    this.size++;
  }

  // Delete song by ID
  delete(songId: string): boolean {
    if (!this.head) return false;

    let current = this.head;
    for (let i = 0; i < this.size; i++) {
      if (current.song.id === songId) {
        // Handle single node case
        if (this.size === 1) {
          this.head = null;
          this.tail = null;
          this.current = null;
        } else {
          // Update neighbors
          current.prev!.next = current.next;
          current.next!.prev = current.prev;

          // Update head/tail if needed
          if (current === this.head) this.head = current.next;
          if (current === this.tail) this.tail = current.prev;
          if (current === this.current) this.current = current.next;
        }

        // Update original order
        this.originalOrder = this.originalOrder.filter(
          (node) => node.song.id !== songId
        );

        this.size--;
        return true;
      }
      current = current.next!;
    }
    return false;
  }

  // Play next song
  next(): Song | null {
    if (!this.current) return null;

    if (this.repeatMode === "song") {
      return this.current.song;
    }

    this.current = this.current.next;
    return this.current!.song;
  }

  // Play previous song
  previous(): Song | null {
    if (!this.current) return null;

    if (this.repeatMode === "song") {
      return this.current.song;
    }

    this.current = this.current.prev;
    return this.current!.song;
  }

  // Toggle repeat mode
  setRepeatMode(mode: "none" | "song" | "playlist"): void {
    this.repeatMode = mode;

    if (mode === "playlist" && this.shuffleMode) {
      this.restoreOriginalOrder();
    }
  }

  // Toggle shuffle mode
  toggleShuffle(): void {
    this.shuffleMode = !this.shuffleMode;

    if (this.shuffleMode) {
      this.shuffle();
    } else {
      this.restoreOriginalOrder();
    }
  }

  // Shuffle the playlist
  private shuffle(): void {
    if (this.size < 2) return;

    // Fisher-Yates shuffle algorithm
    const nodes = this.getNodeList();
    for (let i = nodes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
    }

    this.reconstructList(nodes);
  }

  // Restore original order
  private restoreOriginalOrder(): void {
    if (this.size < 2) return;
    this.reconstructList([...this.originalOrder]);
  }

  // Reverse playlist order
  reverse(): void {
    if (this.size < 2) return;

    const nodes = this.getNodeList().reverse();
    this.reconstructList(nodes);
  }

  // Get all nodes as array
  private getNodeList(): ListNode[] {
    const nodes: ListNode[] = [];
    let current = this.head;

    for (let i = 0; i < this.size; i++) {
      nodes.push(current!);
      current = current!.next;
    }

    return nodes;
  }

  // Rebuild list from node array
  private reconstructList(nodes: ListNode[]): void {
    this.head = nodes[0];
    this.tail = nodes[nodes.length - 1];

    for (let i = 0; i < nodes.length; i++) {
      nodes[i].next = nodes[(i + 1) % nodes.length];
      nodes[i].prev = nodes[(i - 1 + nodes.length) % nodes.length];
    }

    // Update current pointer if needed
    if (this.current) {
      const currentSongId = this.current.song.id;
      this.current =
        nodes.find((node) => node.song.id === currentSongId) || this.head;
    } else {
      this.current = this.head;
    }
  }

  // Get current song
  getCurrentSong(): Song | null {
    return this.current ? this.current.song : null;
  }

  // Get playlist size
  getSize(): number {
    return this.size;
  }

  // Get all songs
  getAllSongs(): Song[] {
    return this.originalOrder.map((node) => node.song);
  }
}

// Example Usage
const playlist = new Playlist();

// Add songs
playlist.add(new Song("1", "Bohemian Rhapsody", "Queen", 354));
playlist.add(new Song("2", "Hotel California", "Eagles", 390));
playlist.add(new Song("3", "Stairway to Heaven", "Led Zeppelin", 482));
playlist.add(new Song("4", "Imagine", "John Lennon", 183));
playlist.add(new Song("5", "Like a Rolling Stone", "Bob Dylan", 369));

// Play through songs
console.log("Current:", playlist.getCurrentSong()?.title); // Bohemian Rhapsody
playlist.next();
console.log("Next:", playlist.getCurrentSong()?.title); // Hotel California

// Delete a song
playlist.delete("3");
console.log(
  "After delete:",
  playlist.getAllSongs().map((s) => s.title)
);

// Toggle shuffle
playlist.toggleShuffle();
console.log(
  "Shuffled:",
  playlist.getAllSongs().map((s) => s.title)
);

// Set repeat mode
playlist.setRepeatMode("song");
console.log("Repeat song:", playlist.next()?.title); // Still same song

// Reverse playlist
playlist.setRepeatMode("none");
playlist.toggleShuffle(); // Disable shuffle
playlist.reverse();
console.log(
  "Reversed:",
  playlist.getAllSongs().map((s) => s.title)
);
