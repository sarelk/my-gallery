'use strict'

var gBooks;
var gBookId = 0;
const PAGE_SIZE = 4
var currPageIdx = 0

function getBooks() {
    var fromIdx = currPageIdx * PAGE_SIZE;
    var books = gBooks.slice(fromIdx, fromIdx + PAGE_SIZE);
    return books;
}

function createBooks() {
    var books = [];
    books.push(createBook('Harry Pooter', '18', 'https://static.abebookscdn.com/cdn/com/images/harry-potter/books/sorcerers-stone-US.jpg'))
    books.push(createBook('Goosbumps', '22', 'https://consequenceofsound.files.wordpress.com/2015/10/barkingghost.jpg'))
    books.push(createBook('The Bible', '80', ''))
    return books;
}

function createBook(bookTitle, price, imgSrc) {
    gBookId++;
    return {
        id: gBookId,
        name: bookTitle,
        price: price,
        imgUrl: imgSrc,
        rate: 0
    };
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })
    gBooks.splice(bookIdx, 1);
}

function addBook(bookName, bookPrice, bookImg) {
    var book = createBook(bookName, bookPrice, bookImg);
    gBooks.push(book);
}

function updateBook(bookId,bookName, bookPrice, bookImg) {
    gBooks[bookId-1].name = bookName;
    gBooks[bookId-1].price = bookPrice;
    gBooks[bookId-1].imgUrl = bookImg; 
}

function readBook(bookId,strHtml) {
    var book = gBooks[bookId-1];
    var $modal = $('.modal');
    $modal.find('h5').text(book.name);
    $modal.find('img').attr("src",book.imgUrl);
    $modal.find('p').text(book.price);
    $modal.find('.book-rate').html(strHtml);
    $modal.show();
}

function addRate(bookId) {
    var $modal = $('.modal');
    if (gBooks[bookId].rate < 10) {
        gBooks[bookId].rate++
        $modal.find('.book-rate-num').attr("value",gBooks[bookId].rate);
    }
}

function minusRate(bookId) {
    var $modal = $('.modal');
    if (gBooks[bookId].rate > 0) {
        gBooks[bookId].rate--
        $modal.find('.book-rate-num').attr("value",gBooks[bookId].rate);
    }
}
