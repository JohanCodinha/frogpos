var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
	name : {
		type: String,
		required: true},
	manager : {
			type: [Schema.Types.ObjectId],
			required: true},
		staff : [Schema.Types.ObjectId]
});

module.exports = mongoose.model( 'Business', BusinessSchema);