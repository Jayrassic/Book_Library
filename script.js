// Global selectors
const add = document.querySelector(`.add-book`);
const emptyShelf = document.querySelector(`.empty`);
const topShelf = document.querySelector(`.top-shelf`);
const bottomShelf = document.querySelector(`.bottom-shelf`);
const graphHeader = document.querySelector(`.graph-header`);
const makeCheckbox = document.createElement(`input`);
const form = document.querySelector(`form`);
const titleInput = document.querySelector(`#title`);
const authorInput = document.querySelector(`#author`);
const pagesInput = document.querySelector(`#pages`);
const readInput = document.querySelector(`#read`);
const titleError = document.querySelector("#title-error");
const authorError = document.querySelector("#author-error");
const pagesError = document.querySelector("#pages-error");

makeCheckbox.setAttribute(`type`, `checkbox`);

// Generates error message
function showError(element) {
  element.textContent = "Please fill out this section";
  element.className = "error-box active-error";
}
// Clears error message
function clearError(element) {
  element.textContent = "";
  element.className = "error-box";
}

// Will test for an error and show or dismiss the error message
function errorMessageTest(input, output) {
  if (input.validity.valueMissing) {
    showError(output);
  } else {
    clearError(output);
  }
}
// Library array stores book information
let myLibrary = [];

// placeBook is called early in document so that it can set the appropriate shelf test on page load. See th placeBook function below for more information.
placeBook();

//  class creates a template for adding book information and push to myLibrary Array

class book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read.checked;

    myLibrary.push(this);
  }
}

// "Add Book" button triggers function to add books.
add.addEventListener(`click`, addBook);

// Gathers form data and places it in book function. Clears inputs once data has been stored.
function addBook(event) {
  event.preventDefault();

  errorMessageTest(titleInput, titleError);
  errorMessageTest(authorInput, authorError);
  errorMessageTest(pagesInput, pagesError);

  const formCheck = form.checkValidity();

  if (formCheck) {
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readInput;

    const newBook = new book(title, author, pages, read);

    let inputs = document.querySelectorAll(`input`);

    inputs.forEach((element) => (element.value = ``));

    read.checked = false;

    placeBook();
  }
}

// Places book information from myLibrary by making `ul`'s so that it can be graphed via css. Initial call checks to see if library has a `book on the shelf `.
function placeBook() {
  if (myLibrary.length === 0) {
    graphHeader.style.display = `none`;
    emptyShelf.style.display = `block`;
    bottomShelf.textContent = ``;
  } else {
    graphHeader.style.display = `grid`;
    emptyShelf.style.display = `none`;
    bottomShelf.textContent = ``;

    myLibrary.forEach((book, i) => {
      const novel = document.createElement(`ul`);
      novel.className = `book${i}`;
      bottomShelf.appendChild(novel);
      for (object in book) {
        let info = document.createElement("li");
        novel.appendChild(info);
        // if statement checks for the myLibrary[i].read and replaces boolean with checkbox;
        if (object === `read`) {
          const makeCheckbox = document.createElement(`input`);
          makeCheckbox.setAttribute(`type`, `checkbox`);
          makeCheckbox.className = `madeCheckbox`;
          makeCheckbox.id = `check${i}`;

          if (book[`read`] === true) {
            info.append(makeCheckbox);
            makeCheckbox.checked = true;
          } else {
            info.append(makeCheckbox);
            makeCheckbox.checked = false;
          }
        } else {
          info.append(book[object]);
        }
      }
      const button = document.createElement(`button`);
      button.className = `madeBtn`;
      button.id = `button${i}`;
      novel.appendChild(button);
      button.textContent = `Delete`;
    });
  }
}

// See comment below for details on this eventListener.
document.addEventListener(`click`, removeBook);

// This function looks is associated with the click event listener above. Since the button class .makeBtn is not present at page load, it cannot have a querySelector. Function checks class name and if .makeBtn, it grabs the index number from the button and splices it from myLibrary.
function removeBook(event) {
  let remover = event.target;
  let index = ``;
  if (remover.className === `madeBtn`) {
    index = remover.id.slice(-1);
    myLibrary.splice(index, 1);
    placeBook();
  }
}

//Event and function look for changes made to the read check box and edit the information in the appropriate book object.
document.addEventListener("click", editRead);

function editRead(event) {
  let remover = event.target;
  let index = ``;
  if (remover.className === `madeCheckbox`) {
    index = remover.id.slice(-1);
    myLibrary[index].read
      ? (myLibrary[index].read = false)
      : (myLibrary[index].read = true);
  }
}
