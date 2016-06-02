var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
var secret = 'mysecrettosigntokens';

var User = require('../models/user.server.model.js');
var Business = require('../models/business.server.model.js')
exports.userList = function(req, res) {
	var query = User.find();
	query.sort({ createdOn: 'desc'})
			.limit(10)
			.exec(function(err, results){
				res.send(results);
			});
};

exports.newUser = function(req, res){
	console.log("new user post method received and routed");
	console.log(req.headers);
	console.log(req.body.name);

	var entry = new User({
		name: req.body.name,
		mail: req.body.mail,
		business: req.body.business,
		password: req.body.password
	});
	entry.save(function (err){
		if(err){
			res.send(err);
		}else {
			res.send("succes");
		}
	});
};

exports.login = function(req, res){
  // fetch user and test password verification
	User.findOne({ mail: req.body.mail }, function(err, user) {
    if (err) throw err;
    console.log(user);
    // test a matching password
    user.comparePassword(req.body.password, function(err, isMatch) {
        if (err) throw err;
        console.log(req.body.password, isMatch); // -> Password123: true
    		res.send('login succeful on /login');
    });
	});
};

exports.apiLogin = function(req, res){
	// fetch user and test password verification
	User.findOne({ mail: req.body.mail }, function(err, user) {
    if (err) throw err;
    console.log(user);

    // test a matching password
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (err) throw err;
      if (isMatch){
	      console.log(req.body.password, isMatch);
	      tokenGen(res, user);
      }else {
      	res.json({
      		sucess: false,
      		message: 'Authentification failed'
      	});
      }
    });
	});
};

exports.newBusiness = function(req, res){
	console.log("new business post method received and routed");
	
	var entry = new Business({
		name: req.body.name,
		manager: [req.decoded._doc._id],
		staff: [req.body.staff_id]
	});

	entry.save(function(err){
		if(err){
			res.send(err);
		}else {
			res.send("success");
		}
	});
};

var tokenGen = function(res, user){
	// create a token
  var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

  // return the information including token as JSON
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });
  console.log('token generated');
}




