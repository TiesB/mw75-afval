var express = require('express');
var router = express.Router();
require('mongoose');
var Chat = require('../models/chat');

router.post('/', function (req, res, next) {
	var newChat = new Chat({...req.body, date: new Date(Date.now())});
	newChat.save(function (err) {
		if (err) {
			res.send(err);
			return;
		}
		res.redirect('/');
	});
});

module.exports = router;
