var express = require('express');
var apiRoutes = express.Router();
var apiCtrl = require('../controllers/api.server.controller');
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken');
var secret = 'mysecrettosigntokens';

// Midelware checking or token on all /api routes
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

// /api/...
apiRoutes.get('/users', function(req, res){
  return apiCtrl.userList(req, res);
});

apiRoutes.post('/business', function(req, res){
  return apiCtrl.newBusiness(req, res);
});

module.exports = apiRoutes;