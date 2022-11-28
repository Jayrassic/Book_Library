let add = document.querySelector(`.add-book`);

let myLibrary = [];

function book (title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    myLibrary.push(this);
};

function addBook () {

    let title = prompt(`What is the title?`);
    let author = prompt(`What is the author?`);
    let pages = prompt(`How many pages?`);

    let newBook = new book (title, author, pages);
}