var express = require('express');
var routes = require('./routes/index');
var apiRoutes = require('./routes/api.js');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt    = require('jsonwebtoken');
var secret = 'mysecrettosigntokens';

// Mongoose ODM...
var mongoose = require('mongoose');

// Create the database connection
mongoose.connect('mongodb://localhost/test');

app.set('port', process.env.PORT || 3000);
app.set('superSecret', secret);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoutes);
app.use('/', routes);


var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

