var page = require('webpage').create();
var fs = require('fs');
var system = require('system');
var argStr = system.args[1];
var argObj = (argStr && JSON.parse(argStr)) || {};

if (!argObj.url) {
  console.err('Missing URL');
  phantom.exit();
}

var arr = argObj.url.split("/");
if (arr.length < 3) {
  console.err('URL is not legal: ' + argObj.url);
  phantom.exit();
}
var baseUrl = arr[0] + "//" + arr[2];

// console.log('URL: ' + argObj.url);
// console.log('Base URL: ' + baseUrl);

// page.setContent("", "https://sparqlblocks.org"); // doesn't actually open any page

// page.settings.webSecurityEnabled = false;
// page.settings.localToRemoteUrlAccessEnabled = true;

page.open(baseUrl, function() {
  page.evaluate(function() {
    localStorage.setItem("clientId", "b4eff650-d71e-4238-a6b7-d768c33b980a");
  });

  page.onCallback = function(clipRect) {
    page.clipRect = clipRect;
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
              document.getElementById('flash-messages').style.display = 'none';
              document.getElementsByClassName('blocklyMainBackground')[0].style.display = 'none';
              var clipRect = document.getElementsByClassName('blocklyBlockCanvas')[0].getBoundingClientRect();
              return window.callPhantom({
                top: clipRect.top,
                left: clipRect.left,
                width: clipRect.width,
                height: clipRect.height
              });
            }
          }
          setTimeout(callback);
        };
        setTimeout(callback);
      });
    }
  };

  page.onError = function(msg, trace) {

    // var msgStack = ['ERROR: ' + msg];
    //
    // if (trace && trace.length) {
    //   msgStack.push('TRACE:');
    //   trace.forEach(function(t) {
    //     msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    //   });
    // }
    //
    // console.err(msgStack.join('\n'));

  };

  page.viewportSize = {
    width: 1024,
    height: 768
  };

  page.open(argObj.url);

});
