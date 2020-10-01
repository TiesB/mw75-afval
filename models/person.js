const { Schema, model } = require('mongoose');

const personSchema = new Schema({
	name: String,
	length: Number,
	weighins: [{date: {type: Date, default: Date.now}, weight: Number, comment: String}],
	hidden: Boolean
});

personSchema.query.byName = function(name) {
	return this.where({name: new RegExp(name, 'i')})
};

personSchema.statics.findByName = function (name, cb) {
	return this.findOne().byName(name).exec(cb);
};

personSchema.virtual('startWeight').get(function () {
	if (this.weighins.length <= 0) {
		return -1;
	}
	return this.weighins[0].weight;
});

personSchema.virtual('startBmi').get(function () {

	return this.startWeight / (this.length * this.length)
});

personSchema.virtual('amountOfWeighins').get(function () {
	return this.weighins.length;
});

personSchema.virtual('lastWeighin').get(function () {
	if (this.weighins.length <= 1) {
		return {date: undefined, weight: -1};
	}
	return this.weighins[this.weighins.length - 1];
});

personSchema.virtual('lastWeight').get(function () {
	return this.lastWeighin.weight;
});

personSchema.virtual('currentBmi').get(function () {
	if (this.weighins.length <= 1) {
		return -1;
	}
	return this.lastWeight / (this.length * this.length)
});

personSchema.virtual('percentageChange').get(function () {
	return (this.lastWeight - this.startWeight) / this.startWeight * 100;
});

module.exports = model('Person', personSchema);
