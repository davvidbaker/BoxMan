var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'))

app.listen(3000, () => {
  console.log('server is running at port 3000')
})

app.get('/', function(req, res) {
  console.log(req);
  res.render('index');
});