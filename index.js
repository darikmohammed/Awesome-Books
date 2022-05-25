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
const list = document.querySelector("#list");
const add = document.querySelector("#add");
const contact = document.querySelector("#contact");
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

//dynamic navigation
list.addEventListener("click", () => {
  list.classList.add("active");
  add.classList.remove("active");
  contact.classList.remove("active");
  document.querySelector("#show-books").style.display = "flex";
  document.querySelector("#add-new-book").style.display = "none";
  document.querySelector("#contact-us").style.display = "none";
});
add.addEventListener("click", () => {
  list.classList.remove("active");
  add.classList.add("active");
  contact.classList.remove("active");
  document.querySelector("#show-books").style.display = "none";
  document.querySelector("#add-new-book").style.display = "flex";
  document.querySelector("#contact-us").style.display = "none";
});
contact.addEventListener("click", () => {
  list.classList.remove("active");
  add.classList.remove("active");
  contact.classList.add("active");
  document.querySelector("#show-books").style.display = "none";
  document.querySelector("#add-new-book").style.display = "none";
  document.querySelector("#contact-us").style.display = "flex";
});
