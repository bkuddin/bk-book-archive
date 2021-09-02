const errorDiv = document.getElementById("errors");
const spinnerDiv = document.getElementById("spinner");

const searchBook = () => {
  const searchInput = document.getElementById("searchInput");
  const searchInputText = searchInput.value;
  console.log(searchInputText);

  spinnerDiv.classList.remove("d-none");

  // clear dom
  searchInput.value = "";
  errorDiv.innerText = "";

  const url = `http://openlibrary.org/search.json?q=${searchInputText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBook(data.docs));
};

const displayBook = (books) => {
  // Error Handing
  if (books.length === 0) {
    errorDiv.innerText = "Sorry! No result found :(";
    spinnerDiv.classList.add("d-none");
  } else {
    errorDiv.style.display = "none";
    spinnerDiv.classList.add("d-none");
  }
  books?.forEach((book) => {
    // console.log(book);
    const bookContainer = document.getElementById("book-container");

    const div = document.createElement("div");

    div.classList.add("col");

    div.innerHTML = `
    <div class="card text-center h-100 shadow">
    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top book-cover " alt="..." />
    <div class="card-body">
      <h1 class="card-title fs-4 fw-bold">${book.title}</h1>
      <hr>
      <h2 class="card-text text-secondary fs-5"> <span class="fw-bold">Author</span> <br> ${book.author_name}</h2>
      <hr>
      <p class="card-text"> <span class="fw-bold" >First published:</span> <br> ${book.first_publish_year}</p>
      <p class="card-text"> <span class="fw-bold" >Publisher:</span> <br> ${book.publisher}</p>
      <p class="card-text bg-primary text-white"> <span class="fw-bold" >Book count:</span> <br> ${book.ebook_count_i}</p>
    </div>
  </div>
    
    `;

    bookContainer.appendChild(div);
  });
};
