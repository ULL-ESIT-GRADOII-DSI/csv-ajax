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

const fillTable = (data) => { 
  $("#finaltable").html(_.template(template, { rows: data.rows })); 
};

const dump = (fileName) => {
  $.get(fileName, function (data) {
      $("#original").val(data);
  });
};
 
const usageList = `
      <ul>
        <% _.each(files, function(f) { %>
          <li>
              <strong><%- f.name %></strong> 
              (<%= f.type || 'n/a' %>) 
              - <%= f.size %> bytes,
              last modified: 
                <%= f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a' %>
          </li>
          <% }); %>
      </ul>
      `;

      function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        // var template = _.template(usageList);
        var reader = new FileReader();
        reader.onload = function(e) {
        
          //document.getElementById('list').innerHTML = template({ files : files});
          //$("#original").val(template({ files: files}));
          $("#original").val(e.target.result);
          evt.target.style.background = "white";
        };
        reader.readAsText(files[0])
      }

      function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.target.style.background = "yellow";
      }


$(document).ready(() => {
    let original = document.getElementById("original");  
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
    }
    $("#parse").click( () => {
        if (window.localStorage) localStorage.original = original.value;
        $.get("/csv", 
          { input: original.value }, 
          fillTable,
          'json'
        );
   });
   /* botones para rellenar el textarea */
   $('button.example').each( (_,y) => {
     $(y).click( () => { dump(`${$(y).text()}.txt`); });
   });

      // Setup the drag and drop listeners.
      var dropZone = document.getElementsByClassName('drop_zone')[0];
      dropZone.addEventListener('dragover', handleDragOver, false);
      dropZone.addEventListener('drop', handleFileSelect, false);
 });
})();
