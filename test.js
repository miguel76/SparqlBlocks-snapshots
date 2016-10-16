const snapshot = require('./index.js');
const fs = require('fs');

snapshot(
  {
    // url: 'http://localhost:8000/SparqlBlocks/dist/',
    url: 'http://localhost:8000/SparqlBlocks/dist/',
    blockXml: '<block type="sparql_execution_endpoint_query">',
    output: 'img'
  },
  function(err, data) {
    if (err) {
      console.err(err);
    } else {
      fs.writeFile("/tmp/out.html", `<html><body>${data}</body></html>`, function(err) {
        if(err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
      // console.log(data);
    }
  });
;
