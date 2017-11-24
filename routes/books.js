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

module.exports = router;