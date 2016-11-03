var express = require('express');
var request = require('request');
var path = require('path');
var apiServerHost = process.env.apiServerHost;

var app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use('/assets', express.static('assets'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/img', express.static('css'));
app.use('/fonts', express.static('fonts'));
// app.use('/favicon.ico', express.static('favicon.ico'));
app.use('/libraries', express.static('libraries'));

app.use(express.static('*.html'));

// app.use('/card-selection.html', function(req, res) {
//   res.sendFile(path.join(__dirname + '/card-selection.html'));
// });
//
// app.use('/message-composition.html', function(req, res) {
//   res.sendFile(path.join(__dirname + '/message-composition.html'));
// });
//
// app.use('/search.html', function(req, res) {
//   res.sendFile(path.join(__dirname + '/search.html'));
// });

app.use('/card-selection.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/card-selection.html'));
});

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// app.use('/s3', function(req, res) {
//   res.send('Hello World!');
// });

app.listen(process.env.PORT || 3000);
