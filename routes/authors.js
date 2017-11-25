var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

router.get('/', function(req, res, next) {
  return db.select().from('authors')
  .then((authorData)=>{
    res.render('authors', {authorData});
  })
});

module.exports = router;