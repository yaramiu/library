let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

function addBookToLibrary() {
  const userBookTitleInput = prompt(
    "What is the title of the book you want to add?"
  );

  let userBookAuthorInput = prompt("Who is the author of that book?");
  while (!isBookAuthorInputValid(userBookAuthorInput)) {
    userBookAuthorInput = prompt(
      "That is not a valid author name. Please only use alphabetical characters when inputting the author's name"
    );
  }

  let userBookPagesInput = prompt("How many pages does it have?");
  while (!isBookPagesInputValid(userBookPagesInput)) {
    userBookPagesInput = prompt(
      "That is not a valid page number. Please re-enter the number of pages the book has"
    );
  }

  let userBookReadInput = prompt("Did you read this book yet?");
  while (!isBookReadInputValid(userBookReadInput)) {
    userBookReadInput = prompt(
      "That is not a valid answer. Please enter Yes/yes/Y/y or No/no/N/n"
    );
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
  const booksContainerDiv = document.querySelector(".books-container");

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

    const readingStatusParagraph = document.createElement("p");
    readingStatusParagraph.classList.add("reading-status");
    const readBookString = book.read ? "read" : "not read";
    readingStatusParagraph.textContent = readBookString;
    bookDiv.appendChild(readingStatusParagraph);

    booksContainerDiv.appendChild(bookDiv);
  });
}

let kimetsuNoYaibaVolume1 = new Book(
  "Demon Slayer: Kimetsu no Yaiba, Vol. 1",
  "Koyoharu Gotouge",
  192,
  true
);
let eightySixVolume4 = new Book(
  "86--EIGHTY-SIX, Vol. 4",
  "Asato Asato",
  228,
  false
);
let eightySixVolume5 = new Book(
  "86--EIGHTY-SIX, Vol. 5",
  "Asato Asato",
  265,
  false
);
let eightySixVolume6 = new Book(
  "86--EIGHTY-SIX, Vol. 6",
  "Asato Asato",
  262,
  false
);
let kimetsuNoYaibaVolume2 = new Book(
  "Demon Slayer: Kimetsu No Yaiba, Vol. 2",
  "Koyoharu Gotouge",
  193,
  true
);
myLibrary.push(kimetsuNoYaibaVolume1);
myLibrary.push(eightySixVolume4);
myLibrary.push(eightySixVolume5);
myLibrary.push(eightySixVolume6);
myLibrary.push(kimetsuNoYaibaVolume2);

displayMyLibrary();
