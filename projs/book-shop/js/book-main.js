'use strict'

function init() {
    gBooks = createBooks();
    renderBooksTable();
}

function renderBooksTable() {
    var books = getBooks();
    var strHtml = books.map(function (book) {
        return `
        <tr>
        <th scope="row">${book.id}</th>
        <td class="book-name">${book.name}</td>
        <td class="book-price">${book.price}</td>
        <td><button type="button" class="btn btn-primary" onclick="onReadBook('${book.id}')">Read</button>
        <button type="button" class="btn btn-warning" onclick="readAndUpdateBook('${book.id}')">Update</button>
        <button type="button" class="btn btn-danger" onclick="onDeleteBook('${book.id}')">Delete</button></td>
      </tr>
        `
    });
    $('tbody').html(strHtml.join(''))
    strHtml += `</tbody></table>`;
}

function onReadBook(bookId) {
    var strHtml = `Rate book: <br/> <button type="button" class="btn btn-primary" onclick="onAddRate(${bookId - 1})">+</button>
    <input type="text" class="book-rate-num" size="5" value="${gBooks[bookId - 1].rate}"/>
    <button type="button" class="btn btn-primary" onclick="onMinusRate(${bookId - 1})">-</button>
    `
    readBook(bookId, strHtml);
}

function onAddRate(bookId) {
    addRate(bookId);
}

function onMinusRate(bookId) {
    minusRate(bookId);
}

function onCloseModal() {
    $('.modal').hide()
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooksTable();
}

function readAndAddNewBook() {
    var bookName = prompt("Book name?");
    var bookPrice = prompt("Book price?");
    var bookImg = prompt("Book Cover url?");
    addBook(bookName, bookPrice, bookImg);
    renderBooksTable();
}

function readAndUpdateBook(bookId) {
    var bookName = prompt("New book name?");
    var bookPrice = prompt("New book price?");
    var bookImg = prompt("New Book Cover url?");
    updateBook(bookId, bookName, bookPrice, bookImg);
    renderBooksTable();
}