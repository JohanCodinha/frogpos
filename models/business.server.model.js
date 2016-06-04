var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
	name : {
		type: String,
		required: true},
	type : {
		type: String,
		required: true},
	// products : [],
	manager : {
			type: [Schema.Types.ObjectId],
			required: true},
	staff : [Schema.Types.ObjectId],
});

module.exports = mongoose.model( 'Business', BusinessSchema);

// product 
