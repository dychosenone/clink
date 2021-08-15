var express = require('express');
var router = express.Router();

const model = require('../models/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.json({title: "hello"});
  model.getUsers();

});

module.exports = router;