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
  console.log(req.body)
  return db('books').insert(req.body)
  .then(()=>{
    res.redirect('/books')
  })
})

module.exports = router;