let booksList = [
  { autor: "adfjlaf", title: "afdfaf" },
  { autor: "adfjlaf", title: "other" },
];

const setBooksList = (books) => {
  localStorage.setItem("Books", JSON.stringify(books));
};
const getBooksList = () => {
  const books = JSON.parse(localStorage.getItem("Books"));
  if (books) {
    return books;
  }
  return [];
};

const newCollection = (bookValues) => {
  booksList = getBooksList();
  booksList.push(bookValues);
  setBooksList(booksList);
};

const showBooks = () => {
  const books = getBooksList();
  const htmlbooks = document.querySelector(".books");
  htmlbooks.innerHTML = "";
  for (let i = 0; i < books.length; i += 1) {
    htmlbooks.innerHTML += `
        <div class="book">
        <h3>${books[i].title}</h3>
        <p>${books[i].autor}</p>
        <button type="button" onClick= "deleteCollection(${i})">Remove</button>
        `;
  }
};

const deleteCollection = (bookIndex) => {};

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
    newCollection(bookValues);
    showBooks();
    bookTitle.value = "";
    bookAutor.value = "";
  }
});

showBooks();
