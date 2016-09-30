var page = require('webpage').create();
var fs = require('fs');
var system = require('system');
var argStr = system.args[1];
var argObj = (argStr && JSON.parse(argStr)) || {};

if (!argObj.url) {
  phantom.exit();
}

// page.setContent("", "https://sparqlblocks.org"); // doesn't actually open any page

// page.settings.webSecurityEnabled = false;
// page.settings.localToRemoteUrlAccessEnabled = true;

page.open(argObj.url, function() {
  page.evaluate(function() {
    localStorage.setItem("clientId", "b4eff650-d71e-4238-a6b7-d768c33b980a");
  });
  page.onCallback = function(data) {
    // console.log('CALLBACK: ' + JSON.stringify(data));
    var base64 = page.renderBase64('PNG');
    console.log(base64);
    // page.render("out.png");
    phantom.exit();
    // Prints 'CALLBACK: { "hello": "world" }'
  };

  page.onLoadFinished = function(status) {
    if(status === "success") {
      page.evaluate( function() {
        var callback = function () {
          if (typeof window.callPhantom === 'function') {
            if (document.getElementsByClassName('injectionDiv').length) {
              return window.callPhantom();
              // {
              //   divCount: document.getElementsByClassName('injectionDiv').length
              // });
            }
          }
          setTimeout(callback);
        };
        setTimeout(callback);
      });
    }
  };

  page.open(argObj.url);

});
