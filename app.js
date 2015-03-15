var express = require('express');
var app = express();
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var _ = require('underscore');
var $ = require('jquery');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/'));

app.get('/', function (request, response) {     
    response.render('index', { title: 'CSV Analyzer' });
});

app.get('/separateCSV', function (request, response) {
       
   
        var result;
        var original = request.original;
        var temp = original.value;
        var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
        var lines = temp.split(/\n+\s*/);
        var commonLength = NaN; 
        var row;
        var rows = [];
     
        for (var t in lines) {
            var temp = lines[t];
            var m = temp.match(regexp);
            var result = [];
            var error = false;

            if (m) {
                if (commonLength && (commonLength != m.length)) {
                    //alert('ERROR! row <'+temp+'> has '+m.length+' items!');
                    error = true;
                }
                else {
                    commonLength = m.length;
                    error = false;
                }
                for (var i in m) {
                    var removecomma = m[i].replace(/,\s*$/, '');
                    var remove1stquote = removecomma.replace(/^\s*"/, '');
                    var removelastquote = remove1stquote.replace(/"\s*$/, '');
                    var removeescapedquotes = removelastquote.replace(/\\"/, '"');
                    result.push(removeescapedquotes);
                }
                var tr = error ? 'error' : 'legal';
                row = new Object();
                row.type = tr;
                row.items = result;
                rows.push(row);
            }
            else {
                alert('ERROR! row ' + temp + ' does not look as legal CSV');
                error = true;
            }
        }
      
        response.send({ rows: rows });
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});