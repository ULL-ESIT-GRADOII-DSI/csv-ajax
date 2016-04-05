var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var _ = require('underscore');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {     
    response.render('index', { title: 'CSV Analyzer' });
});

var calculate = require('calculate');

app.get('/separateCSV', function (request, response) {
    var original = request.query.input
    var rows = calculate(original);
    
    response.send({ "rows": rows });
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});
