var page = require('webpage').create();
page.open('http://www.dogstudio.be/projects/congress/', function() {
  page.render('dogstudio.png');
  phantom.exit();
});
