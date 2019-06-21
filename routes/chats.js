const express = require('express');
const router = express.Router();
require('mongoose');
const Chat = require('../models/chat');

router.post('/', function (req, res) {
	const newChat = new Chat({...req.body, date: new Date(Date.now())});
	newChat.save(function (err) {
		if (err) {
			res.send(err);
			return;
		}
		res.redirect('/');
	});
});

module.exports = router;
