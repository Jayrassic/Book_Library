// Global selectors
const add = document.querySelector(`.add-book`);
const emptyShelf = document.querySelector(`.empty`);
const topShelf = document.querySelector(`.top-shelf`);
const bottomShelf = document.querySelector(`.bottom-shelf`);
const graphHeader = document.querySelector(`.graph-header`);
const button = document.createElement(`button`);

// Library array stores book information
let myLibrary = [];
placeBook();

//  Function creates a template for adding book information and push to myLibrary Array
function book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read.checked;
    myLibrary.push(this);
};



// "Add Book" button triggers function to add books.
add.addEventListener(`click`, addBook );

// Gathers form data and places it in book function. Clears inputs once data has been stored.
function addBook () {
    let title = document.querySelector(`#title`).value;
    let author = document.querySelector(`#author`).value;
    let pages = document.querySelector(`#pages`).value;
    let read = document.querySelector(`#read`);

    const newBook = new book (title, author, pages, read);

    let inputs = document.querySelectorAll(`input`)

    inputs.forEach((element) => element.value = ``);

    read.checked = false;

    placeBook();
};

// Places book information by making `ul`'s so that it can be graphed via css. Initial call checks to see if library has a `book on the shelf `.
function placeBook () {
    if (myLibrary.length === 0) {
        graphHeader.style.display = `none`
    } else {
        graphHeader.style.display = `block`
        emptyShelf.style.display = `none`
        bottomShelf.textContent = ``;
        myLibrary.forEach((book)  => {
            const novel = document.createElement(`ul`);
            bottomShelf.appendChild(novel)
            for(object in book) {
                let info = document.createElement('li');
                novel.appendChild(info);
                info.append(book[object]);
            }
            novel.appendChild(button);
            button.textContent = `delete`
        })
    }
};

function removeBook() {
    
}