const snapshot = require('./index.js');

snapshot(
  {
    url: 'http://localhost:8000/SparqlBlocks/dist/'
  },
  function(err, data) {
    if (err) {
      console.err(err);
    } else {
      console.log(data);
    }
  });
;
