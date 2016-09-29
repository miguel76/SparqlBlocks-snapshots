var page = require('webpage').create();
var fs = require('fs');

// page.setContent("", "https://sparqlblocks.org"); // doesn't actually open any page

page.settings.webSecurityEnabled = false;
page.settings.localToRemoteUrlAccessEnabled = true;

page.open('http://localhost:8000/SparqlBlocks/dist/', function() {
  page.evaluate(function() {
    localStorage.setItem("clientId", "b4eff650-d71e-4238-a6b7-d768c33b980a");
  });
  page.onCallback = function(data) {
    console.log('CALLBACK: ' + JSON.stringify(data));
    phantom.exit();
    // Prints 'CALLBACK: { "hello": "world" }'
  };

  page.onLoadFinished = function(status) {
    console.log("Status: " + status);
    if(status === "success") {
      page.evaluate( function() {
        var callback = function () {
          if (typeof window.callPhantom === 'function') {
            if (document.getElementsByClassName('injectionDiv').length) {
              return window.callPhantom({
                divCount: document.getElementsByClassName('injectionDiv').length
              });
            }
          }
          setTimeout(callback);
        };
        setTimeout(callback);
      });

        // var injectionDivCount = 0;
        // while (!injectionDivCount) {
        //   console.log(injectionDivCount);
        //   injectionDivCount = page.evaluate(function() {
        //     return document.getElementsByClassName('injectionDiv').length;
        //   });
        // }

      // var res = page.evaluate( function() {
      //   // var injectionDivArray = document.getElementsByClassName('injectionDiv');
      //   // return injectionDivArray && injectionDivArray[0] && injectionDivArray[0].textContent;
      //   // return document.getElementsByClass('injectionDiv')[0].textContent;
      //   // return $('.injectionDiv');
      //   var injectionDivArray = null;
      //   while (!injectionDivArray || !injectionDivArray[0]) {
      //     injectionDivArray = document.getElementsByClassName('injectionDiv');
      //   }
      //   return injectionDivArray[0];
      // } );
      //
      // console.log(res);
      // setTimeout(function(){
      // //     // Where you want to save it
      // //     var base64 = page.renderBase64('PNG');
      // //     console.log(base64);
          page.render("out.png");
      //     // You can access its content using jQuery
      //     // var fbcomments = page.evaluate(function(){
      //     //     return $("body").contents().find(".content")
      //     // })
      //     // phantom.exit();
      // }, 10000);
    }
    // phantom.exit();
  };

  page.open('http://localhost:8000/SparqlBlocks/dist/');

});

// page.open("https://sample.com", function(){
//     setTimeout(function(){
//         // Where you want to save it
//         page.render("screenshoot.png")
//         // You can access its content using jQuery
//         var fbcomments = page.evaluate(function(){
//             return $("body").contents().find(".content")
//         })
//         phantom.exit();
//     }, 1000)
// });
