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
    screen.showInputForm();
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

      const toggleReadingStatusButton =
        buttonHelper.createToggleReadingStatusButton(
          book,
          readingStatusParagraph
        );
      readingStatusContainerDiv.appendChild(toggleReadingStatusButton);
      bookDiv.appendChild(readingStatusContainerDiv);

      const deleteBookButton = document.createElement("button");
      deleteBookButton.setAttribute("type", "button");
      deleteBookButton.classList.add("delete-book-button");
      deleteBookButton.textContent = "x";
      buttonHelper.initializeDeleteBookButton(deleteBookButton, book);
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

class ButtonHelper {
  constructor() {
    const newBookButton = document.querySelector(".new-book-button");
    newBookButton.addEventListener("click", () => {
      library.addBook();
      screen.clear();
      library.displayBooks();
    });
  }

  initializeDeleteBookButton(deleteBookButton, bookToDelete) {
    deleteBookButton.addEventListener("click", () => {
      library.bookCollection.splice(bookToDelete.indexInLibrary, 1);
      library.updateBookIndexes();
      screen.clear();
      library.displayBooks();
    });
  }

  createToggleReadingStatusButton(book, readingStatusParagraph) {
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
}

class Screen {
  clear() {
    const bookContainerDiv = document.querySelector(".books-container");
    while (bookContainerDiv.firstChild) {
      bookContainerDiv.removeChild(bookContainerDiv.firstChild);
    }
  }

  showInputForm() {
    const userInputForm = document.createElement("form");

    const bookTitleLabel = document.createElement("label");
    bookTitleLabel.for = "book_title";
    bookTitleLabel.textContent = "Book Title: ";
    const bookTitleInput = document.createElement("input");
    bookTitleInput.type = "text";
    bookTitleInput.id = "book_title";
    bookTitleInput.name = "book_title";
    bookTitleInput.required = "true";

    const bookAuthorLabel = document.createElement("label");
    bookAuthorLabel.for = "book_author";
    bookAuthorLabel.textContent = "Book Author: ";
    const bookAuthorInput = document.createElement("input");
    bookAuthorInput.type = "text";
    bookAuthorInput.id = "book_author";
    bookAuthorInput.name = "book_author";
    bookAuthorInput.required = "true";

    const bookPagesLabel = document.createElement("label");
    bookPagesLabel.for = "book_pages";
    bookPagesLabel.textContent = "Number of pages: ";
    const bookPagesInput = document.createElement("input");
    bookPagesInput.type = "number";
    bookPagesInput.id = "book_pages";
    bookPagesInput.name = "book_pages";
    bookPagesInput.required = "true";
    bookPagesInput.min = 1;
    bookPagesInput.pattern = "d+";
    bookPagesInput.addEventListener("input", () => {
      if (bookPagesInput.validity.rangeUnderflow) {
        bookPagesInput.setCustomValidity("Book pages must be positive");
      } else if (bookPagesInput.validity.patternMismatch) {
        bookPagesInput.setCustomValidity("Book pages can only contain numbers");
      } else {
        bookPagesInput.setCustomValidity("");
      }
    });

    const readStatusDiv = document.createElement("div");
    readStatusDiv.classList.add("read-status");

    const readStatusParagraph = document.createElement("p");
    readStatusParagraph.textContent = "Have you read this book yet?";
    const yesInput = document.createElement("input");

    yesInput.type = "radio";
    yesInput.id = "yes";
    yesInput.name = "read_status";
    yesInput.value = "Yes";
    yesInput.required = "true";
    const yesLabel = document.createElement("label");
    yesLabel.for = "yes";
    yesLabel.name = "read_status";
    yesLabel.textContent = "Yes";

    const noInput = document.createElement("input");
    noInput.type = "radio";
    noInput.id = "no";
    noInput.name = "read_status";
    noInput.value = "No";
    noInput.required = "true";
    const noLabel = document.createElement("label");
    noLabel.for = "no";
    noLabel.name = "read_status";
    noLabel.textContent = "No";

    readStatusDiv.appendChild(readStatusParagraph);
    readStatusDiv.appendChild(yesInput);
    readStatusDiv.appendChild(yesLabel);
    readStatusDiv.appendChild(noInput);
    readStatusDiv.appendChild(noLabel);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";

    let elements = [
      bookTitleLabel,
      bookTitleInput,
      bookAuthorLabel,
      bookAuthorInput,
      bookPagesLabel,
      bookPagesInput,
      readStatusDiv,
      submitButton,
    ];
    elements.forEach((element) => {
      userInputForm.appendChild(element);
    });

    userInputForm.addEventListener("submit", (event) => {
      let checkedOption;
      const radioButtons = document.querySelectorAll(
        'input[name="read_status"]'
      );
      Array.from(radioButtons).forEach((radioButton) => {
        if (radioButton.checked) {
          checkedOption = radioButton.value;
        }
      });
      let readStatus = false;
      if (checkedOption === "Yes") {
        readStatus = true;
      }

      const book = new Book(
        bookTitleInput.value,
        bookAuthorInput.value,
        bookPagesInput.value,
        readStatus
      );
      library.bookCollection.push(book);
      book.indexInLibrary = library.bookCollection.length - 1;

      document.body.removeChild(userInputForm);
      screen.clear();
      library.displayBooks();
    });

    document.body.appendChild(userInputForm);
  }
}

const booksContainerDiv = document.querySelector(".books-container");

let library = new Library([]);
let screen = new Screen();
let buttonHelper = new ButtonHelper();

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
