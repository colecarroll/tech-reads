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
  console.log(id)
  console.log(req.body)
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
  return db('authors').where('id', id)
  .then((authordata) => {
    var authorData = authordata[0]
  res.render('oneauthor', { authorData })
  })
})

module.exports = router;