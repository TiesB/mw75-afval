const express = require('express');
const router = express.Router();
require('mongoose');
const Person = require('../models/person');

/* GET users listing. */
router.get('/', function(req, res) {
  Person.find({}, function (err, persons) {
    if (err) {
      res.render('error', {error: err});
      return;
    }
    res.send(persons);
  })
});

router.post('/', function (req, res) {
  const newPerson = new Person(req.body);
  newPerson.save(function (err) {
    if (err) {
      res.render('error', {error: err});
      return;
    }
    res.send(req.body);
  });
});

module.exports = router;
