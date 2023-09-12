/*
1. Element Selecting
2. Add Eventlistener
3. Basic error Checking
4. Create Elements
5. Append Elements
*/


// <===========================     CODE RUN Fix    ============================>
// Create variable & Element Selecting
const inputTitle = document.getElementById("inputBookTitle");
const inputAuthor = document.getElementById("inputBookAuthor");
const inputYear = document.getElementById("inputBookYear");
const submit = document.getElementById("bookSubmit");
const dataList = document.getElementById("dataList");
const searchForm = document.getElementById("searchBook");
const searchInput = document.getElementById("searchBookTitle");
let Books = []; // array for save a list of books

// take book data from sessionStorage when page loads
document.addEventListener("DOMContentLoaded", function () {
  const storedBooks = sessionStorage.getItem("books");  //Change localStorage to sessionStorage

  if (storedBooks) {
    Books = JSON.parse(storedBooks);
    InsertList();
  }
});

// <===========================     CODE RUN Fix    ============================>
// this code for checking input user, If any form is not filled, and this function already be run.
function CheckingInput(){
  if (inputTitle.value == "" && inputAuthor.value == "" && inputYear.value == ""){
    alert("Please fill all input form");
  }
  else if(inputTitle.value =="" && inputAuthor.value ==""){
    alert('Please fill input title and Author')
  }
  else if(inputAuthor.value =="" && inputYear.value==""){
    alert('Please fill input Author and year ')
  }
  else if (inputTitle.value=='' && inputYear.value ==''){
    alert('Please fil input title and year')
  }
  else if (inputTitle.value == "") {
    alert("Please fill  input title book");
  } 
  else if (inputAuthor.value == "") {
    alert("Please fill input Author");
  } 
  else if (inputYear.value == "") {
    alert("Please fill input year");
  }
}
// submit.addEventListener('click',CheckingInput);


// <===========================     CODE RUN Fix    ============================>
// Function to add a new book
function AddBook() {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get input values
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const year = inputYear.value;

  CheckingInput(); // Check if any form field is empty

  let isComplete = false; // Initialize book as not finished
  const id = +new Date(); // Generate a unique ID using the timestamp

  // Create a book object with the input data
  const Book = {
    id,
    title,
    author,
    year,
    isComplete,
  };

  Books.push(Book); // Add the book to the Books array

  // Save the updated book data to sessionStorage
  sessionStorage.setItem("books", JSON.stringify(Books));

  InsertList(); // Update the book list on the web page
  clearInput(); // Clear the input fields
}
submit.addEventListener("click", AddBook); // Add event listener for the submit button


// When the DOM is fully loaded...
document.addEventListener("DOMContentLoaded", function () {
  // Retrieve stored book data from sessionStorage
  const storedBooks = sessionStorage.getItem("books");

  if (storedBooks) {
    // If there is stored data, parse it into the Books array
    Books = JSON.parse(storedBooks);

    // Update the book list on the web page
    InsertList();
  }
});

// <===========================     CODE RUN Fix    ============================>
function clearInput(){
  inputTitle.value = ""; 
  inputAuthor.value = "";
  inputYear.value = ""; 
}

// <===========================     CODE RUN Fix    ============================>
// Function to display books in the table
function InsertList() {
  dataList.innerHTML = ""; // Clear the table content

  for (let i = 0; i < Books.length; i++) {
    const Book = Books[i]; // Get the book at the current index
    const row = document.createElement("tr"); // Create a new table row


    // Create cells for the "Action" and "Status" columns
    const actionCell = document.createElement("td");
    const statusCell = document.createElement("td");

    // Create buttons for "Unread," "Done Read," and "Delete"
    const actionButton = document.createElement("button");
    const statusButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    actionButton.textContent = "Unread"; // Set the text for the "Unread" button
    statusButton.textContent = "Done Read"; // Set the text for the "Done Read" button
    deleteButton.textContent = "Delete"; // Set the text for the "Delete" button

    actionButton.classList.add("move-button"); // Add a CSS class to the "Unread" button
    statusButton.classList.add("move-button"); // Add a CSS class to the "Done Read" button
    deleteButton.classList.add("delete-button"); // Add a CSS class to the "Delete" button

    // Depending on the book's status, show or hide buttons
    if (Book.isComplete) {
      actionButton.style.display = "none"; // Hide the "Unread" button if the book is marked as "Done Read"
      statusButton.onclick = function () {
        toggleReadStatus(i); // Add a click event to the "Done Read" button to toggle the status
      };
    } else {
      statusButton.style.display = "none"; // Hide the "Done Read" button if the book is marked as "Unread"
      actionButton.onclick = function () {
        toggleReadStatus(i); // Add a click event to the "Unread" button to toggle the status
      };
    }

    // Set a click event for the "Delete" button
    deleteButton.onclick = function () {
      deleteBook(i); // Add a click event to the "Delete" button to delete the book
    };

    // Append buttons to cells
    actionCell.appendChild(actionButton);
    statusCell.appendChild(statusButton);
    actionCell.appendChild(deleteButton);
    
    // check input 
    if(Book.title && Book.author && Book.year){
      // Fill the row with book data
      row.innerHTML = `
        <td>${i + 1}</td>
        <td>${Book.title}</td>
        <td>${Book.author}</td>
        <td>${Book.year}</td>
      `;
  
      // Append cells to the row
      row.appendChild(actionCell);
      row.appendChild(statusCell);
  
      // Append the row to the table
      dataList.appendChild(row);

    }
  }
}

// Function to toggle the read status of a book
function toggleReadStatus(index) {
  const book = Books[index]; // Get the book at the specified index
  book.isComplete = !book.isComplete; // Toggle the status of the book (from "Unread" to "Done Read" or vice versa)

  // Save book data to sessionStorage after the status change
  sessionStorage.setItem("books", JSON.stringify(Books));

  InsertList(); // Update the displayed book list
}

// Delete function
function deleteBook(index) {
  Books.splice(index, 1); // Remove the book at the specified index from the array

  // Save book data to sessionStorage after the deletion
  sessionStorage.setItem("books", JSON.stringify(Books));

  InsertList(); // Update the displayed book list
}

function searchBooks() {
  const searchTerm = searchInput.value.toLowerCase(); // Take the search input value and convert it to lowercase

  for (let i = 0; i < Books.length; i++) {
    const Book = Books[i];
    const row = dataList.getElementsByTagName("tr")[i];
    
    // Check if the book title contains search keywords
    if (Book.title.toLowerCase().includes(searchTerm)) {
      row.style.display = ""; // view data that you searh
    } else {
      row.style.display = "none"; // if if not found don't display
    }
  }

}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchBooks(); // call function search
});
searchInput.addEventListener("input", searchBooks);




