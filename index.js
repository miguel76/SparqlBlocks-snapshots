const spawn = require('child_process').spawn;
const _ = require('lodash');

module.exports = function(options, callback) {
  var prefix = '', suffix = '';
  if (options.output === 'dataSchemaUrl') {
    prefix = 'data:image/png;base64,';
  } else if (options.output === 'img') {
    prefix = '<img src="data:image/png;base64,';
    suffix = '">';
  };
  console.log(JSON.stringify(options));
  if (options.blockXml) {
    options.params = options.params || {};
    options.params.mode = 'view';
  }
  if (options.params && options.method !== "POST") {
    options.url +=
        '?' +
        _.join(
            _.map(_.toPairs(options.params), _.unary(_.partialRight(_.join, '='))),
            '&');
  }
  if (options.blockXml) {
    options.url +=
      '#xml:%3Cxml%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxhtml%22%3E' +
      encodeURIComponent(options.blockXml) + //'%3Cblock%20type%3D%22sparql_execution_endpoint_query%22%3E'
      '%3C%2Fblock%3E%3C%2Fxml%3E%0A';
  }
  console.log(options.url);
  const phantom = spawn('phantomjs', ['phantom.js', JSON.stringify(options)]);
  var output = prefix;
  phantom.stdout.on('data', (data) => {
    output += (data + '').trim();
  });
  phantom.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  phantom.on('close', (code) => {
    console.log(`phantomjs exited with code ${code}`);
    if (code) {
      callback(`phantomjs exited with code ${code}`);
    } else {
      callback(null, output + suffix);
    }
  });
};
