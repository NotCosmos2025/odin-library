//global
const myLibrary = [];

//DOM
const dialog = document.querySelector("dialog");
const newBookButton = document.querySelector("#new_book-btn");
const closeButton = document.querySelector("#close-btn");
const addBookButton = document.querySelector("#add_book-btn");
const booksContainer = document.querySelector(".books-container");

//DOM inputs
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const numberOfPages = document.querySelector("#number_of_pages");
const readStatus = document.querySelector("#read_status");


newBookButton.addEventListener("click", () =>
{
    dialog.showModal();
})

closeButton.addEventListener("click", () =>
{
    dialog.close();
})

addBookButton.addEventListener("click", (e) =>
{
    e.preventDefault();
    addBookToLibrary(title.value, author.value, numberOfPages.value, readStatus.value);
    dialog.close();

    title.value = "";
    author.value = "";
    numberOfPages.value = "";
    readStatus.children.item(0).setAttribute("selected", true);

})

class Book
{
    constructor(title, author, numberOfPages, readStatus)
    {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.readStatus = readStatus;
    }

    changeReadStatus(id, newStatus)
    {
        for (let i = 0; i < myLibrary.length; i++)
        {
            if (myLibrary[i].id === id)
            {
                myLibrary[i].readStatus = newStatus;
            }
        }
    }

}

function addBookToLibrary(title, author, numberOfPages, readStatus)
{
    let book = new Book(title, author, numberOfPages, readStatus); 
    addBookTODOM(book);
    
    myLibrary.push(book);
}

function addBookTODOM(book)
{
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const title = document.createElement("p");
    title.textContent = book.title;
    bookCard.append(title);
    const author = document.createElement("p");
    author.textContent = "Author: " + book.author;
    bookCard.append(author);
    const numberOfPages = document.createElement("p");
    numberOfPages.textContent = "Pages: " + book.numberOfPages;
    bookCard.append(numberOfPages);

    //handle read status options
    const readStatus = document.createElement("select");
    const notStartedOption = document.createElement("option");
    const readingOption = document.createElement("option");
    const finishedOption = document.createElement("option");
    notStartedOption.value = "not_started";
    notStartedOption.textContent = "Not Started";
    readingOption.value = "reading";
    readingOption.textContent = "Reading";
    finishedOption.value = "finished";
    finishedOption.textContent = "Finished";

    readStatus.append(notStartedOption);
    readStatus.append(readingOption);
    readStatus.append(finishedOption);
    bookCard.append(readStatus);

    for (const option of readStatus)
    {
        if (option.value === book.readStatus)
        {
            option.setAttribute("selected", true);
        }
    }

    readStatus.addEventListener("change", (e) =>
    {
        book.changeReadStatus(book.id, e.target.value); 
    })

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () =>
    {
        for (let i = 0; i < myLibrary.length; i++)
        {
            if (myLibrary[i].id === book.id)
                myLibrary.splice(i, 1);

            booksContainer.removeChild(bookCard);
        }
    })

    bookCard.append(deleteButton);
    booksContainer.append(bookCard);
}