var system = require('system');

     system.args.forEach(function (arg, i) {
             console.log(i + ': ' + arg);
     });

if(system.args[1]){
  console.log('We have an argument ',system.args[1]);
}
//TODO: typechecking on vars
var url = system.args[1] ? system.args[1] : 'http://bbc.co.uk'  ;
var filename = system.args[2] ? system.args[2] : 'output_1'  ;
var viewportSize = {width:800, height:600};
var arr;
if(system.args[3]){
  arr = system.args[3].split(',');
  viewportSize = {width: arr[0], height: arr[1]};
  /*if ( arr && arr[0] &&  !isNan(arr[0]) && arr[1] && !isNan(arr[1]) ){
    viewportSize = {width: arr[0], height: arr[1]};
  } */
};



var ieVersion = system.args[4] ? system.args[4] : 'IE7'  ;

console.log('url ',url);
console.log('filename ',filename);
console.log('viewportSize ', viewportSize);
console.log('ieVersion ', ieVersion);


//this.emulate = "IE7";
//console.log(this.trifle)

//  this.trifle.emulation = "IE7";



// var page = require('webpage').create();s
// page.open('http://www.dogstudio.be/projects/congress/', function() {
//   page.render('dogstudio2.png');
//   phantom.exit();
// });

this.trifle.emulation = 'IE8';
this.trifle.emulate = 'IE7';

var emul = this.trifle.emulation;

var pageIe8 = require('webpage').create();

pageIe8.viewportSize = viewportSize;

pageIe8.open(url, function() {

  pageIe8.render(filename+"_"+ieVersion+"_emulate_"+emul+'.png');
  phantom.exit();
});
