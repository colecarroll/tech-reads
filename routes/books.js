var express = require('express');
var router = express.Router();
var db = require('../db/connection.js')

router.get('/', function(req, res, next) {

  res.render('books');
});

module.exports = router;