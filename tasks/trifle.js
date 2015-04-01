/*
 * grunt-trifle
 * https://github.com/mrClapham/grunt-triflejs
 *
 * Copyright (c) 2015 Graham Clapham
 * Licensed under the MIT license.
 */

'use strict';

// This is effectively the project root (location of Gruntfile)
// This allows relative paths in tests, i.e. casper.start('someLocalFile.html')
var cwd = process.cwd();

module.exports = function(grunt) {
  var path = require("path");
  var fs = require("fs");
  var phantom = require("phantomjs");
  var phantomBinaryPath = require('phantomjs').path;

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('trifle', 'A task runner for creating screenshots using TrifleJs.', function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var runnerPath = path.resolve(cwd+"/runners/triflerunner.js");

    var _args = [
                  runnerPath,
                  "http://windows.microsoft.com/en-GB/internet-explorer/which-version-am-i-using",
                  "vo2",
                  [1280, 900],
                  "IE7"];

    // Spawn a function to call the triflerunner.js task
    grunt.util.spawn({
        cmd: path.resolve(cwd+"/trifle/TrifleJS.exe"),
        args: _args,
        opts: {
          emulate:'IE7'
        }
      },
      function(error, result, code) {
          // When Phantom exits check for remaining messages one last time
          console.log(" EXIT FUNCTION ");
          //console.log(" EXIT FUNCTION ",error, result, code);

      }
      );


    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
