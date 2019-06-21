const express = require('express');
const router = express.Router();
require('mongoose');
const Person = require('../models/person');

router.post('/', function (req, res) {
	const {name, weight, comment} = req.body;

	Person.findByName(name, function(err, person) {
		if (err) {
			res.render('error', {error: err});
			return;
		}
		person.weighins.push({date: new Date(Date.now()), weight, comment});
		person.save(function (err) {
			if (err) {
				res.render('error', {error: err});
				return;
			}
			res.redirect('/');
		});
	});
});

module.exports = router;
