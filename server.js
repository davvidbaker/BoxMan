var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'))


app.get('/', function(req, res) {
  console.log(req);
  res.render('index');
});