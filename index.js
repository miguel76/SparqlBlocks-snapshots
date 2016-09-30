const spawn = require('child_process').spawn;

module.exports = function(options, callback) {
  const phantom = spawn('phantomjs', ['phantom.js', JSON.stringify(options)]);
  var output = '';
  phantom.stdout.on('data', (data) => {
    output += data;
  });
  phantom.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  phantom.on('close', (code) => {
    console.log(`phantomjs exited with code ${code}`);
    if (code) {
      callback(`phantomjs exited with code ${code}`);
    } else {
      callback(null, output);
    }
  });
};
