var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

var calculate = require('./calculate');

app.get('/', function (request, response) {     
  response.render('index', { title: 'CSV Analyzer' });
});

app.get('/separateCSV', function (request, response) {
  response.send({ "rows": calculate(request.query.input) });
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});
