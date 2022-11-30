// Global selectors
const add = document.querySelector(`.add-book`);
const emptyShelf = document.querySelector(`.empty`);
const topShelf = document.querySelector(`.top-shelf`);
const bottomShelf = document.querySelector(`.bottom-shelf`);
const graphHeader = document.querySelector(`.graph-header`);
const makeCheckbox = document.createElement(`input`);
makeCheckbox.setAttribute(`type`,`checkbox`);

// Library array stores book information
let myLibrary = [];

function boxMake(check) {
    const makeCheckbox = document.createElement(`input`);
    makeCheckbox.setAttribute(`type`,`checkbox`);
    makeCheckbox.className= `madeCheckbox`; 

    if (check === true) {
        boxMake()
       makeCheckbox.checked = true;
    }

    info.append(makeCheckbox);
}

// placeBook is called early in document so that it can set the appropriate shelf test on page load. See th placeBook function below for more information.
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

// Places book information from myLibrary by making `ul`'s so that it can be graphed via css. Initial call checks to see if library has a `book on the shelf `.
function placeBook () {
    if (myLibrary.length === 0) {
        graphHeader.style.display = `none`
        emptyShelf.style.display = `block`
        bottomShelf.textContent = ``;
    } else {
        graphHeader.style.display = `block`
        emptyShelf.style.display = `none`
        bottomShelf.textContent = ``;
        
        myLibrary.forEach((book,i)  => {
            const novel = document.createElement(`ul`);
            novel.className = `book${i}`
            bottomShelf.appendChild(novel)
            for(object in book) {
                let info = document.createElement('li');
                novel.appendChild(info);
                // if statement checks for the myLibrary[i].read and replaces boolean with checkbox;
                if (object === `read`){
                    const makeCheckbox = document.createElement(`input`);
                    makeCheckbox.setAttribute(`type`,`checkbox`);
                    makeCheckbox.className= `madeCheckbox`;
                    makeCheckbox.id = `check${i}`;

                    if (book[`read`] === true) {
                        info.append(makeCheckbox)
                        makeCheckbox.checked = true;
                    } else {
                        info.append(makeCheckbox)
                        makeCheckbox.checked = false;
                    }
                } else {
                    info.append(book[object]);
                }
            }
            const button = document.createElement(`button`);
            button.className = `madeBtn`
            button.id = `button${i}`;
            novel.appendChild(button);
            button.textContent = `delete`
        })
    }
};

// See comment below for details on this eventListener.
document.addEventListener(`click`, removeBook);

// This function looks is associated with the click event listener above. Since the button class .makeBtn is not present at page load, it cannot have a querySelector. Function checks class name and if .makeBtn, it grabs the index number from the button and splices it from myLibrary.
function removeBook(event) {
    let remover = event.target
    let index =``;
    if (remover.className === `madeBtn`) {
        index = remover.id.slice(-1)
        myLibrary.splice(index,1);
        placeBook();
    }    
}

//Event and function look for changes made to the read check box and edit the information in the appropriate book object.
document.addEventListener('click', editRead);

function editRead(event) {
    let remover = event.target
    let index =``;
    if (remover.className === `madeCheckbox`) {
        index = remover.id.slice(-1)
        myLibrary[index].read ? myLibrary[index].read=false : myLibrary[index].read = true;
    }  
}