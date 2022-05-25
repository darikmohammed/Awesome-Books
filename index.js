class AwsomeBooks {
  constructor() {
    this.booksList = [];
  }

  #SetBooksList = (books) => {
    localStorage.setItem("Books", JSON.stringify(books));
  };

  #getBooksList = () => {
    const books = JSON.parse(localStorage.getItem("Books"));
    if (books) {
      return books;
    }
    return [];
  };

  showBooks = () => {
    const books = this.#getBooksList();
    const htmlbooks = document.querySelector(".books");
    htmlbooks.innerHTML = "";
    for (let i = 0; i < books.length; i += 1) {
      htmlbooks.innerHTML += `
          <div class="book">
          <h3>"${books[i].title}"</h3>
          <p><span class="by-span"> By </span> ${books[i].autor}</p>
          <button type="button" onClick= "remove(${i})" class='removebtn'>Remove</button>
          `;
    }
  };

  newCollection = (bookValues) => {
    this.booksList = this.#getBooksList();
    this.booksList.push(bookValues);
    this.#SetBooksList(this.booksList);
  };

  deleteCollection = (bookIndex) => {
    if (bookIndex !== null) {
      const books = this.#getBooksList();

      const bookRemoved = books.filter((item, key) => {
        if (key !== bookIndex) {
          return true;
        }
        return null;
      });
      this.#SetBooksList(bookRemoved);
      this.showBooks();
    }
  };
}

const awsomeBooks = new AwsomeBooks();

const form = document.querySelector("#add-book");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookTitle = document.querySelector("#title");
  const bookAutor = document.querySelector("#autor");

  if (bookTitle.value.trim() !== "" && bookAutor.value.trim() !== "") {
    const bookValues = {
      autor: bookAutor.value,
      title: bookTitle.value,
    };
    awsomeBooks.newCollection(bookValues);
    awsomeBooks.showBooks();
    bookTitle.value = "";
    bookAutor.value = "";
  }
});
const remove = (index) => {
  awsomeBooks.deleteCollection(index);
};
remove(-1);
awsomeBooks.showBooks();
