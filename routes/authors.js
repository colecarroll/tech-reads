var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')


router.get('/', function(req, res, next) {
  return db('authors')
  .select()
  .innerJoin('join', 'authors.id', 'author_id')
  .innerJoin('books', 'book_id', 'books.id')
  .then((record)=>{
   var newAuthors = []
   for (var i = 0; i < record.length; i++) {
     record[i].bookTitles = []
     var obj = {
       title: '',
       bookOrder: 1,
     };
     var insert = true;
     for (var j = 0; j < newAuthors.length; j++) {
       if (newAuthors[j].author_id === record[i].author_id) {
         insert = false;
         obj.title = record[i].bookTitle;
         obj.bookOrder = record[i].book_id;
         newAuthors[j].bookTitles.push(obj)
       }
     }
     if (insert) {
       obj.title = record[i].bookTitle;
       obj.bookOrder = record[i].book_id;
       record[i].bookTitles.push(obj);
       newAuthors.push(record[i])
     }
   }
   var authorData = newAuthors
   return authorData
  })
  .then((authorData)=>{
    res.render('authors', {authorData});
  })
});



router.get('/new', function(req, res, next) {
  res.render('addauthor')
})


router.post('/new', function(req, res, next) {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  return db.select().from('authors').where('firstName', firstName).andWhere('lastName', lastName).first()
  .then((author)=>{
    if (author === undefined) {
      return db('authors').insert(req.body)
      .then(()=>{
        res.redirect('/authors')
      })
    } 
    else {
        }
  })
    .then(()=>{
      res.send('Sorry, that author already exists')
      })
      .catch(err => res.status(500).send(err.message))
})



router.get('/:id/delete', function(req, res, next) {
  const id = req.params.id 
  return db('authors').where('id', id)
  .then((authordata) => {
    var authorData = authordata[0]
  res.render('deleteauthor', { authorData })
  })
})



router.delete('/delete/:id', function(req, res, next) {
  const id = req.params.id 
  return db('authors').where('authors.id', id).del()
  .then(()=>{
    res.redirect('/authors')
  })
})


router.get('/update/:id', function(req, res, next) {
  const id = req.params.id 
  return db('authors').where('id', id)
  .then((authordata) => {
    var authorData = authordata[0]
  res.render('editauthor', { authorData })
  })
})



router.put('/update/:id', function(req, res, next) {
  var id = req.params.id
  return db.table('authors').where('id', id).update({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      biography: req.body.biography,
      portraitURL : req.body.portraitURL
    })
  .then(()=>{
    res.redirect('/authors')
  })
})



router.get('/:id', function(req, res, next) {
  const id = req.params.id 
  return db('authors')
  .select()
  .innerJoin('join', 'authors.id', 'author_id')
  .innerJoin('books', 'book_id', 'books.id')
  .then((record)=>{
   var newAuthors = []
   for (var i = 0; i < record.length; i++) {
     record[i].bookTitles = []
     var obj = {
       title: '',
       bookOrder: 1,
     };
     var insert = true;
     for (var j = 0; j < newAuthors.length; j++) {
       if (newAuthors[j].author_id === record[i].author_id) {
         insert = false;
         obj.title = record[i].bookTitle;
         obj.bookOrder = record[i].book_id;
         newAuthors[j].bookTitles.push(obj)
       }
     }
     if (insert) {
       obj.title = record[i].bookTitle;
       obj.bookOrder = record[i].book_id;
       record[i].bookTitles.push(obj);
       newAuthors.push(record[i])
     }
   }
   var authordata = newAuthors
   return authordata
  })
  .then((authordata)=>{
    for (var i = 0; i < authordata.length; i++) {
      if (authordata[i].author_id == id) {
        var authorData = authordata[i]
      }
    }
    res.render('oneauthor', {authorData});
  })
});

module.exports = router;