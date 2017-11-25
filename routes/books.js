var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

router.get('/', function(req, res, next) {
  return db.select().from('books')
  .then((bookData)=>{
    console.log(bookData)
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

module.exports = router;