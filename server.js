var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.all('/*', function(req, res, next){
  //CORS header
  res.header('Access-Control-Allow-Origin','*'); //restrict to this particular domain
  res.header('Access-Control-Allow-Methods','GET,PUT, POST,DELETE, OPTIONS');
  //Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type, Accept, X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  }else{
    next();
  }
});

// Auth Middleware to check if the token in valid
// only the requests that start with api/v1/* will be checked for the token
app.all('api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

app.use(function(req, res, next){
  var err = new Error('Not Found');
  err.status(404);
  next(err);
});

app.set('port', process.env.PORT || 3003);

var server = app.listen(app.get('port'), function(){
  console.log('Running on port '+server.address().port);
});
