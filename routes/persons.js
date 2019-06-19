var express = require('express');
var router = express.Router();
require('mongoose');
var Person = require('../models/person');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Person.find({}, function (err, persons) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(persons);
  })
});

router.post('/', function (req, res, next) {
  var newPerson = new Person(req.body);
  newPerson.save(function (err) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(req.body);
  });
});

module.exports = router;
