var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

router.get('/', function(req, res, next) {
  return db.select().from('authors')
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

module.exports = router;