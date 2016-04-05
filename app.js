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

var regexp = /"((?:[^"\\]|\\.)*)"|([^,\s]+)|,\s*(?=,|$)|^\s*,/g
var calculate = function(original) {
    var lines = original.split(/\n+\s*/);
    var commonLength = lines[0].match(regexp).length;
    var r = [];
    var removeQuotes = function(field) {
      var removecomma = field.replace(/,\s*$/, '');
      var remove1stquote = removecomma.replace(/^\s*"/, '');
      var removelastquote = remove1stquote.replace(/"\s*$/, '');
      var removeescapedquotes = removelastquote.replace(/\\"/, '"');
      return removeescapedquotes;
    };

    for (var t in lines) {
      var temp = lines[t];
      var m = temp.match(regexp);
      var result = [];
      var error = false;

      // skip empty lines and comments
      if (temp.match(/(^\s*$)|(^#.*)/)) continue; 
      if (m) {
        result = m.map(removeQuotes);
        error = (commonLength != m.length);
        var rowclass = error? 'error' : 'legal';
        r.push({ items: result, typ: rowclass });
      }
      else {
        var errmsg = 'La fila "' + temp + '" no es un valor de CSV permitido.';
        r.push({value: errmsg.split("").splice(commonLength), rowClass: 'error'});
      }
    }
    return r;
  };

app.get('/separateCSV', function (request, response) {

    var result;
    var original = request.query.input
    var temp = original;
    var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
    var lines = temp.split(/\n+\s*/);
    var commonLength = NaN;
    var row;
    var rows = calculate(original);
   
    /*
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
            console.log('ERROR! row <' + temp + '> does not look as legal CSV');
            error = true;
        }
    }
    */
    response.send({ "rows": rows });
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
   
});
