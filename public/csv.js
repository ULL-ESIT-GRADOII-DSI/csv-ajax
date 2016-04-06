// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

const template = `
  <p>
      <table class="center" id="result">
          <% _.each(rows, (row) => { %>
          <tr class="<%=row.type%>">
              <% _.each(row.items, (name) =>{ %>
              <td><%= name %></td>
              <% }); %>
          </tr>
          <% }); %>
      </table>
  </p>
`;

$(document).ready(() => {
    if (window.localStorage && localStorage.original) {
      document.getElementById("original").value = localStorage.original;
    }
    $("#tableButton").click( () => {
        if (window.localStorage) localStorage.original = document.getElementById("original").value;
        $.get("/csv", 
          { input: document.getElementById("original").value }, 
            (data) => {
            $("#finaltable").html(_.template(template, { rows: data.rows }));
         }, 
         'json');
   });
 });
})();
