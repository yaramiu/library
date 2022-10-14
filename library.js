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

addBookToLibrary();
