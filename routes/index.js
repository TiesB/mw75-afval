var express = require('express');
var router = express.Router();
require('mongoose');
var Person = require('../models/person');

/* GET home page. */
router.get('/', function(req, res, next) {
  Person.find({}, function (err, persons) {
    if (err) {
      res.send(err);
    }

    res.render('index', { persons: persons });
  });
});

module.exports = router;
