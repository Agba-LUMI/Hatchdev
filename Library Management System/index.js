"use strict";
// The Book class
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isAvailable = true;
    }
    checkBook() {
        if (!this.isAvailable) {
            console.log(`${this.title} is currently not available, kindly check back`);
            return;
        }
        this.isAvailable = false;
        console.log(`${this.title} has been checked out.`);
    }
    returnBook() {
        if (this.isAvailable) {
            console.log(`${this.title} was not checked out`);
            return;
        }
        this.isAvailable = true;
        console.log(`${this.title} has been returned.`);
    }
}
// The Member Class
class Member {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.borrowBooks = [];
    }
    borrowBook(book) {
        if (!book.isAvailable) {
            console.log(`${book.title} is not available for borrowing.`);
            return;
        }
        book.checkBook();
        this.borrowBooks.push(book);
        console.log(`${this.name} borrowed "${book.title}"`);
    }
    returnBook(book) {
        const bookIndex = this.borrowBooks.indexOf(book);
        if (bookIndex === -1) {
            console.log(`${book.title} is not found in borrowed books of ${this.name}`);
            return;
        }
        this.borrowBooks.splice(bookIndex, 1);
        book.returnBook();
        console.log(`${this.name} returned "${book.title}"`);
    }
}
// The Library Class
class Library {
    constructor() {
        this.books = new Map();
        this.members = new Map();
    }
    addBook(book) {
        if (this.books.has(book.title)) {
            console.log(`${book.title} already exists in the library`);
            return;
        }
        this.books.set(book.title, book);
        console.log(`${book.title} added to the library`);
    }
    removeBook(book) {
        if (!this.books.has(book.title)) {
            console.log(`${book.title} not found in this library`);
            return;
        }
        if (!book.isAvailable) {
            console.log(`${book.title} is currently checked out and cannot be removed`);
            return;
        }
        this.books.delete(book.title);
        console.log(`${book.title} has been removed from the library`);
    }
    addMember(member) {
        if (this.members.has(member.name)) {
            console.log(`${member.name} already exists as a member`);
            return;
        }
        this.members.set(member.name, member);
        console.log(`${member.name} has been added as a library member`);
    }
}
const library = new Library();
const book1 = new Book("Rich Dad Poor Dad", "Robert Kiyosaki");
const book2 = new Book("Atomic Habits", "James Clear");
library.addBook(book1);
library.addBook(book2);
const member1 = new Member("Paul", "nwosupaulchinagorom@gmail.com");
library.addMember(member1);
// This would show successful
member1.borrowBook(book1);
// This should show already checked out
member1.borrowBook(book1);
// this would return book
member1.returnBook(book1);
// should succeed
library.removeBook(book1);
// this should show not found in borrowed
member1.returnBook(book2);
