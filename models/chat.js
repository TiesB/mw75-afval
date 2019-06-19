const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
	author: String,
	message: String,
	date: {type: Date, default: Date.now}
});

module.exports = model('Chat', chatSchema);
