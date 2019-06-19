var express = require('express');
var router = express.Router();
require('mongoose');
var Person = require('../models/person');
var Chat = require('../models/chat');

/* GET home page. */
router.get('/', function(req, res, next) {
  Person.find({}, function (err, persons) {
    if (err) {
      res.render('error', {error: err});
    }

    Chat.find({}, function (err, chats) {
      if (err) {
        res.render('error', {error: err});
      }

      res.render('index', {persons: persons, chats: chats.reverse().slice(0, 16)});
    })
  });
});

module.exports = router;
