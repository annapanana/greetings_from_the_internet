"use strict";

var express = require('express');
var request = require('request');
var request = require('path');
var apiServerHost = process.env.apiServerHost;

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/img', express.static('css'));
// app.use('/libraries', express.static('libraries'));

app.use('/', function(req, res) {
  var url = apiServerHost + req.url;
  req.pipe(request(url)).pipe(res);
});

app.use('/s3', function(req, res) {
  res.send('Hello World!');
});

app.listen(process.env.PORT || 3000);
