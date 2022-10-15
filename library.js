let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.indexInLibrary;
}

Book.prototype.info = function() {
  const readBookString = this.read ? "read" : "not read yet";
  return (
    this.title +
    " by " +
    this.author +
    ", " +
    this.pages +
    " pages, " +
    readBookString
  );
};

Book.prototype.toggleReadingStatus = function() {
  this.read = !this.read;
};

function addBookToLibrary() {
  const userBookTitleInput = prompt(
    "What is the title of the book you want to add?"
  );
  let hasCancelled = checkUserCancellation(userBookTitleInput);
  if (hasCancelled) {
    return;
  }

  let userBookAuthorInput = prompt("Who is the author of that book?");
  hasCancelled = checkUserCancellation(userBookAuthorInput);
  if (hasCancelled) {
    return;
  }
  while (!isBookAuthorInputValid(userBookAuthorInput)) {
    userBookAuthorInput = prompt(
      "That is not a valid author name. Please only use alphabetical characters when inputting the author's name"
    );
    hasCancelled = checkUserCancellation(userBookAuthorInput);
    if (hasCancelled) {
      return;
    }
  }

  let userBookPagesInput = prompt("How many pages does it have?");
  hasCancelled = checkUserCancellation(userBookPagesInput);
  if (hasCancelled) {
    return;
  }
  while (!isBookPagesInputValid(userBookPagesInput)) {
    userBookPagesInput = prompt(
      "That is not a valid page number. Please re-enter the number of pages the book has"
    );
    hasCancelled = checkUserCancellation(userBookPagesInput);
    if (hasCancelled) {
      return;
    }
  }

  let userBookReadInput = prompt("Did you read this book yet?");
  hasCancelled = checkUserCancellation(userBookReadInput);
  if (hasCancelled) {
    return;
  }
  while (!isBookReadInputValid(userBookReadInput)) {
    userBookReadInput = prompt(
      "That is not a valid answer. Please enter Yes/yes/Y/y or No/no/N/n"
    );
    hasCancelled = checkUserCancellation(userBookReadInput);
    if (hasCancelled) {
      return;
    }
  }

  let hasUserReadBook;
  if (
    userBookReadInput === "Yes" ||
    userBookReadInput === "yes" ||
    userBookReadInput === "Y" ||
    userBookReadInput === "y"
  ) {
    hasUserReadBook = true;
  } else if (
    userBookReadInput === "No" ||
    userBookReadInput === "no" ||
    userBookReadInput === "N" ||
    userBookReadInput === "n"
  ) {
    hasUserReadBook = false;
  }

  const book = new Book(
    userBookTitleInput,
    userBookAuthorInput,
    Number(userBookPagesInput),
    hasUserReadBook
  );
  book.indexInLibrary = myLibrary.length;
  myLibrary.push(book);
}

function isBookAuthorInputValid(userBookAuthorInput) {
  return userBookAuthorInput.match(/^[A-Za-z ]+$/);
}

function isBookPagesInputValid(userBookPagesInput) {
  return userBookPagesInput.match(/^[0-9]+$/);
}

function isBookReadInputValid(userBookReadInput) {
  return (
    userBookReadInput.match(/^[Yy](es)?$/) ||
    userBookReadInput.match(/^[Nn]o?$/)
  );
}

function displayMyLibrary() {
  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const titleHeader = document.createElement("h4");
    titleHeader.classList.add("title");
    titleHeader.textContent = book.title;
    bookDiv.appendChild(titleHeader);

    const authorParagraph = document.createElement("p");
    authorParagraph.classList.add("author");
    authorParagraph.textContent = book.author;
    bookDiv.appendChild(authorParagraph);

    const pagesParagraph = document.createElement("p");
    pagesParagraph.classList.add("pages");
    pagesParagraph.textContent = book.pages.toString();
    bookDiv.appendChild(pagesParagraph);

    const readingStatusContainer = document.createElement("div");
    readingStatusContainer.classList.add("reading-status-container");

    const readingStatusParagraph = document.createElement("p");
    readingStatusParagraph.classList.add("reading-status");
    const readBookString = book.read ? "read" : "not read";
    readingStatusParagraph.textContent = readBookString;
    readingStatusContainer.appendChild(readingStatusParagraph);

    const toggleReadingStatusButton = createToggleReadingStatusButton(
      book,
      readingStatusParagraph
    );
    readingStatusContainer.appendChild(toggleReadingStatusButton);
    bookDiv.appendChild(readingStatusContainer);

    const deleteBookButton = document.createElement("button");
    deleteBookButton.setAttribute("type", "button");
    deleteBookButton.classList.add("delete-book-button");
    deleteBookButton.textContent = "x";
    initializeDeleteBookButton(deleteBookButton, book);
    bookDiv.appendChild(deleteBookButton);

    booksContainerDiv.appendChild(bookDiv);
  });
}

const booksContainerDiv = document.querySelector(".books-container");

const newBookButton = document.querySelector(".new-book-button");
newBookButton.addEventListener("click", () => {
  addBookToLibrary();
  clearScreen();
  displayMyLibrary();
});

function initializeDeleteBookButton(deleteBookButton, bookToDelete) {
  deleteBookButton.addEventListener("click", () => {
    myLibrary.splice(bookToDelete.indexInLibrary, 1);
    updateBookIndexes();
    clearScreen();
    displayMyLibrary();
  });
}

function createToggleReadingStatusButton(book, readingStatusParagraph) {
  const toggleReadingStatusButton = document.createElement("button");
  toggleReadingStatusButton.classList.add("toggle-reading-status-button");

  let hasUserReadBook = book.read;
  if (!hasUserReadBook) {
    toggleReadingStatusButton.classList.add("not-read");
  } else {
    toggleReadingStatusButton.classList.add("read");
  }

  toggleReadingStatusButton.addEventListener("click", () => {
    book.toggleReadingStatus();

    hasUserReadBook = book.read;
    if (!hasUserReadBook) {
      toggleReadingStatusButton.classList.remove("read");
      toggleReadingStatusButton.classList.add("not-read");
    } else {
      toggleReadingStatusButton.classList.remove("not-read");
      toggleReadingStatusButton.classList.add("read");
    }

    let readBookString = book.read ? "read" : "not read";
    readingStatusParagraph.textContent = readBookString;
  });
  return toggleReadingStatusButton;
}

function updateBookIndexes() {
  for (let index = 0; index < myLibrary.length; index++) {
    const book = myLibrary[index];
    book.indexInLibrary = index;
  }
}

function checkUserCancellation(userInput) {
  return userInput === null;
}

function clearScreen() {
  const bookContainerDiv = document.querySelector(".books-container");
  while (bookContainerDiv.firstChild) {
    bookContainerDiv.removeChild(bookContainerDiv.firstChild);
  }
}

let kimetsuNoYaibaVolume1 = new Book(
  "Demon Slayer: Kimetsu no Yaiba, Vol. 1",
  "Koyoharu Gotouge",
  192,
  true
);
kimetsuNoYaibaVolume1.indexInLibrary = 0;
let eightySixVolume4 = new Book(
  "86--EIGHTY-SIX, Vol. 4",
  "Asato Asato",
  228,
  false
);
eightySixVolume4.indexInLibrary = 1;
let eightySixVolume5 = new Book(
  "86--EIGHTY-SIX, Vol. 5",
  "Asato Asato",
  265,
  false
);
eightySixVolume5.indexInLibrary = 2;
let eightySixVolume6 = new Book(
  "86--EIGHTY-SIX, Vol. 6",
  "Asato Asato",
  262,
  false
);
eightySixVolume6.indexInLibrary = 3;
let kimetsuNoYaibaVolume2 = new Book(
  "Demon Slayer: Kimetsu no Yaiba, Vol. 2",
  "Koyoharu Gotouge",
  193,
  true
);
kimetsuNoYaibaVolume2.indexInLibrary = 4;
myLibrary.push(kimetsuNoYaibaVolume1);
myLibrary.push(eightySixVolume4);
myLibrary.push(eightySixVolume5);
myLibrary.push(eightySixVolume6);
myLibrary.push(kimetsuNoYaibaVolume2);

displayMyLibrary();
