const express = require('express');
const router = express.Router();
require('mongoose');
const Person = require('../models/person');
const Chat = require('../models/chat');

/* GET home page. */
router.get('/', function(req, res) {
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
