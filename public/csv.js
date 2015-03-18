// See http://en.wikipedia.org/wiki/Comma-separated_values
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it


$(document).ready(function () {
    var scr = document.getElementById("tableTemplate").src;
    var template;
    $.get(scr, template, function (t) {
        template = t;
    });
    $("#tableButton").click(function () {
        if (window.localStorage) localStorage.original = document.getElementById("original").value;
     //   console.log(document.getElementById("original").value);
        $.get("/separateCSV", { input: document.getElementById("original").value }, function (data) {           
       //     console.log(template);
            $("#finaltable").html(_.template(template, { rows: data.rows }));
         //  console.log(_.template(template, { rows: data.rows }));          
       }, 'json');
   });
 });

window.onload = function() {
  // If the browser supports localStorage and we have some stored data
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};

