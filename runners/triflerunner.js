var system = require('system');

    // system.args.forEach(function (arg, i) {
    //         console.log(i + ': ' + arg);
    // });
if(system.args[0]){
  console.log('We have an argument ',system.args[0]);
}

 //this.emulate = "IE7";
console.log(this.trifle)
this.trifle.emulation = "IE7"
// var page = require('webpage').create();
// page.open('http://www.dogstudio.be/projects/congress/', function() {
//   page.render('dogstudio2.png');
//   phantom.exit();
// });

var pageIe8 = require('webpage').create();

pageIe8.open('http://www.dogstudio.be/projects/congress/', function() {
  //phantom.emulation("IE8")
  pageIe8.render('dogstudio2Ie7.png');
  phantom.exit();
});
