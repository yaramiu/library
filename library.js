class Book {
  indexInLibrary = 0;

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
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
  }

  toggleReadingStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor(bookCollection) {
    this.bookCollection = bookCollection;
  }

  addBook() {
    const inputValidator = new InputValidator();

    const userBookTitleInput = prompt(
      "What is the title of the book you want to add?"
    );
    let hasCancelled = inputValidator.checkUserCancellation(userBookTitleInput);
    if (hasCancelled) {
      return;
    }

    let userBookAuthorInput = prompt("Who is the author of that book?");
    hasCancelled = inputValidator.checkUserCancellation(userBookAuthorInput);
    if (hasCancelled) {
      return;
    }
    while (!inputValidator.isBookAuthorInputValid(userBookAuthorInput)) {
      userBookAuthorInput = prompt(
        "That is not a valid author name. Please use only alphabetical characters when inputting the author's name"
      );
      hasCancelled = inputValidator.checkUserCancellation(userBookAuthorInput);
      if (hasCancelled) {
        return;
      }
    }

    let userBookPagesInput = prompt("How many pages does it have?");
    hasCancelled = inputValidator.checkUserCancellation(userBookPagesInput);
    if (hasCancelled) {
      return;
    }
    while (!inputValidator.isBookPagesInputValid(userBookPagesInput)) {
      userBookPagesInput = prompt(
        "That is not a valid page number. Please re-enter the number of pages the book has"
      );
      hasCancelled = inputValidator.checkUserCancellation(userBookPagesInput);
      if (hasCancelled) {
        return;
      }
    }

    let userBookReadInput = prompt("Did you read this book yet?");
    hasCancelled = inputValidator.checkUserCancellation(userBookReadInput);
    if (hasCancelled) {
      return;
    }
    while (!inputValidator.isBookReadInputValid(userBookReadInput)) {
      userBookReadInput = prompt(
        "That is not a valid answer. Please enter Yes/yes/Y/y or No/no/N/n"
      );
      hasCancelled = inputValidator.checkUserCancellation(userBookReadInput);
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
    book.indexInLibrary = this.bookCollection.length;
    this.bookCollection.push(book);
  }

  displayBooks() {
    this.bookCollection.forEach((book) => {
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

      const readingStatusContainerDiv = document.createElement("div");
      readingStatusContainerDiv.classList.add("reading-status-container");

      const readingStatusParagraph = document.createElement("p");
      readingStatusParagraph.classList.add("reading-status");
      const readBookString = book.read ? "read" : "not read";
      readingStatusParagraph.textContent = readBookString;
      readingStatusContainerDiv.appendChild(readingStatusParagraph);

      const toggleReadingStatusButton = createToggleReadingStatusButton(
        book,
        readingStatusParagraph
      );
      readingStatusContainerDiv.appendChild(toggleReadingStatusButton);
      bookDiv.appendChild(readingStatusContainerDiv);

      const deleteBookButton = document.createElement("button");
      deleteBookButton.setAttribute("type", "button");
      deleteBookButton.classList.add("delete-book-button");
      deleteBookButton.textContent = "x";
      initializeDeleteBookButton(deleteBookButton, book);
      bookDiv.appendChild(deleteBookButton);

      booksContainerDiv.appendChild(bookDiv);
    });
  }

  updateBookIndexes() {
    for (let index = 0; index < library.bookCollection.length; index++) {
      const book = this.bookCollection[index];
      book.indexInLibrary = index;
    }
  }
}

class InputValidator {
  isBookAuthorInputValid(userBookAuthorInput) {
    return userBookAuthorInput.match(/^[A-Za-z ]+$/);
  }

  isBookPagesInputValid(userBookPagesInput) {
    return userBookPagesInput.match(/^[0-9]+$/);
  }

  isBookReadInputValid(userBookReadInput) {
    return (
      userBookReadInput.match(/^[Yy](es)?$/) ||
      userBookReadInput.match(/^[Nn]o?$/)
    );
  }

  checkUserCancellation(userInput) {
    return userInput === null;
  }
}

const booksContainerDiv = document.querySelector(".books-container");

const newBookButton = document.querySelector(".new-book-button");
newBookButton.addEventListener("click", () => {
  library.addBook();
  screen.clear();
  library.displayBooks();
});

function initializeDeleteBookButton(deleteBookButton, bookToDelete) {
  deleteBookButton.addEventListener("click", () => {
    library.bookCollection.splice(bookToDelete.indexInLibrary, 1);
    library.updateBookIndexes();
    screen.clear();
    library.displayBooks();
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

class Screen {
  clear() {
    const bookContainerDiv = document.querySelector(".books-container");
    while (bookContainerDiv.firstChild) {
      bookContainerDiv.removeChild(bookContainerDiv.firstChild);
    }
  }
}

let library = new Library([]);
let screen = new Screen();

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

library.bookCollection.push(kimetsuNoYaibaVolume1);
library.bookCollection.push(eightySixVolume4);
library.bookCollection.push(eightySixVolume5);
library.bookCollection.push(eightySixVolume6);
library.bookCollection.push(kimetsuNoYaibaVolume2);

library.displayBooks();
