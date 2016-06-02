var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	name: {
		type: String,
		required: true},
	mail: {
		type: String,
		required: true},
	business: {
		type: String},
	password: {
		type: String,
		required: true},
	createdOn: {
		type: Date,
		default: Date.now},
	admin: {
		type: Boolean,
		default: false}
});

// Middleware password encryption with bcrypt
// Only work with .save !
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Export model...
module.exports = mongoose.model( 'User', UserSchema);
