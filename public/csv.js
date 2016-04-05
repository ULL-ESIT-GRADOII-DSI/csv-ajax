// See http://en.wikipedia.org/wiki/Comma-separated_values
(function() {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function () {
    if (window.localStorage && localStorage.original) {
      document.getElementById("original").value = localStorage.original;
    }
    var templateURL = document.getElementById("tableTemplate").src; // "http://.../tabletemplate.html"
    var template;
    $.get(templateURL, template, function (t) {
        template = t;
    });
    $("#tableButton").click(function () {
        if (window.localStorage) localStorage.original = document.getElementById("original").value;
        $.get("/separateCSV", 
          { input: document.getElementById("original").value }, 
          function (data) {           
            $("#finaltable").html(_.template(template, { rows: data.rows }));
         }, 
         'json');
   });
 });
})();
