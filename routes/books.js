var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

router.get('/', function(req, res, next) {
  return db('books').select().innerJoin('join', 'books.id', 'book_id').innerJoin('authors', 'author_id', 'authors.id')
  .then((books) =>{
    var newBooks = [];
    for (var i = 0; i < books.length; i++) {
    books[i].authors = [];
    var obj = {
      name: '',
      authOrder: 1,
    };
    var insert = true;
    for (var j = 0; j < newBooks.length; j++) {
      if (newBooks[j].book_id === books[i].book_id) {
        insert = false;
        obj.name = books[i].firstName + ' ' + books[i].lastName;
        obj.authOrder = books[i].author_id;
        newBooks[j].authors.push(obj);
      }
    }
    if (insert) {
      obj.name = books[i].firstName + ' ' + books[i].lastName;
      obj.authOrder = books[i].author_id;
      books[i].authors.push(obj);
      newBooks.push(books[i]);
    }
  }
  var bookData = newBooks
  return bookData
  })
  .then((bookData)=>{
    res.render('books', {bookData});
  })
});


router.get('/new', function(req, res, next) {
  res.render('addBook')
})

router.post('/new', function(req, res, next) {
  let bookName = req.body.bookTitle 
  return db.select().from('books').where('bookTitle', bookName).first()
  .then((book)=>{
    if (book === undefined) {
      return db('books').insert(req.body)
      .then(()=>{
        res.redirect('/books')
      })
    } 
    else {
        }
  })
    .then(()=>{
      res.send('Sorry, that book already exists')
      })
      .catch(err => res.status(500).send(err.message))
})

router.get('/:id/delete', function(req, res, next) {
  const id = req.params.id 
  return db('books').where('id', id)
  .then((bookdata) => {
    var bookData = bookdata[0]
  res.render('deletebook', { bookData })
  })
})

router.delete('/delete/:id', function(req, res, next) {
  const id = req.params.id 
  return db('books').where('books.id', id).del()
  .then(()=>{
    res.redirect('/books')
  })
})

router.get('/update/:id', function(req, res, next) {
  const id = req.params.id 
  return db('books').where('id', id)
  .then((bookdata) => {
    var bookData = bookdata[0]
  res.render('editbook', { bookData })
  })
})

router.put('/update/:id', function(req, res, next) {
  var id = req.params.id
  return db.table('books').where('id', id).update({
      bookTitle : req.body.bookTitle,
      bookGenre : req.body.bookGenre,
      bookCoverURL : req.body.bookCoverURL,
      bookDescription: req.body.bookDescription
    })
  .then(()=>{
    res.redirect('/books')
  })
})

router.get('/:id', function(req, res, next) {
  const id = req.params.id 
  return db('books').select().innerJoin('join', 'books.id', 'book_id').innerJoin('authors', 'author_id', 'authors.id')
  .then((books) =>{
    var newBooks = [];
    for (var i = 0; i < books.length; i++) {
    books[i].authors = [];
    var obj = {
      name: '',
      authOrder: 1,
    };
    var insert = true;
    for (var j = 0; j < newBooks.length; j++) {
      if (newBooks[j].book_id === books[i].book_id) {
        insert = false;
        obj.name = books[i].firstName + ' ' + books[i].lastName;
        obj.authOrder = books[i].author_id;
        newBooks[j].authors.push(obj);
      }
    }
    if (insert) {
      obj.name = books[i].firstName + ' ' + books[i].lastName;
      obj.authOrder = books[i].author_id;
      books[i].authors.push(obj);
      newBooks.push(books[i]);
    }
  }
  var bookdata = newBooks
  return bookdata
  })
  .then((bookdata) => {

    for (var i = 0; i < bookdata.length; i++) {
      if (bookdata[i].book_id == id) {
      var bookData = bookdata[i]
      }
    }
    console.log(bookData)
    res.render('onebook', { bookData })
  })
})



module.exports = router;