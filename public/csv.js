// See http://en.wikipedia.org/wiki/Comma-separated_values
(function() {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function () {
    if (window.localStorage && localStorage.original) {
      document.getElementById("original").value = localStorage.original;
    }
    const template = `
      <p>
          <table class="center" id="result">
              <% _.each(rows, function(row) { %>
              <tr class="<%=row.type%>">
                  <% _.each(row.items, function(name) { %>
                  <td><%= name %></td>
                  <% }); %>
              </tr>
              <% }); %>
          </table>
      </p>
  `;
/*
    var templateURL = document.getElementById("tableTemplate").src; // "http://.../tabletemplate.html"
    $.get(templateURL, function (t) {
        template = t;
    });
*/
    $("#tableButton").click(function () {
        if (window.localStorage) localStorage.original = document.getElementById("original").value;
        $.get("/csv", 
          { input: document.getElementById("original").value }, 
          function (data) {
            $("#finaltable").html(_.template(template, { rows: data.rows }));
         }, 
         'json');
   });
 });
})();
