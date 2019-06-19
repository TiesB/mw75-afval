var express = require('express');
var router = express.Router();
require('mongoose');
var Person = require('../models/person');

router.post('/', function (req, res, next) {
	const {name, weight, comment} = req.body;

	Person.findByName(name, function(err, person) {
		if (err) {
			res.render('error', {error: err})
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
