var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api.server.controller');

router.get('/users', function(req, res){
	return apiCtrl.userList(req, res);
});

router.post('/', function(req, res){
	return apiCtrl.newUser(req, res);
});

router.post('/api/authenticate', function(req, res){
	return apiCtrl.apiLogin(req, res);
});

router.get('/', function(req, res){
	res.send('welcome home');
});

router.post('/login', function(req, res){
	return apiCtrl.login(req, res);
});

module.exports = router;