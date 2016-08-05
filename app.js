var env = require('node-env-file');
var express = require ('express');
var debug = require('debug')('http');
var path = require('path');

env(__dirname+'/.env');


var app = express();
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/components', express.static(__dirname + '/components'));

if (!process.env.SUB_APP) {
  var PORTNO = process.env.PORT || 5000;
  app.listen(PORTNO);
  console.log(PORTNO+' is the magic port');
}

// index page
app.get('/', function(req, res) {
  debug('GET /');

  res.render('index', {
    siteUrl: 'localhost'
  });

});

if (process.env.SUB_APP) {
  console.log('Exporting as sub-app');
  module.exports = app;
}
