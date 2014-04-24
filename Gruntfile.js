module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Jasmine server side
    jasmine_node: {
      coverage: {},
      options: {
        match: '.',
        matchall: false,
        extensions: 'js',
        isVerbose: true
      },
      all: ['spec/', 'lib/']
    },

    // jsHint options
    jshint: {
      files: ['lib/**/*.js', 'spec/**/*.js'],
      options: {
        indent: 2,
        eqeqeq: true,
        newcap: true,
        undef: true,
        unused: true,
        trailing: true,
        '-W065': true,
        '-W058': true, // do not enforce parentheses on new contructor objects
        '-W051': true, // Notification on deleting "this"
        curly: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          require: true,
          process: true,
          exports: true,
          expect: true,
          it: true,
          describe: true,
          spyOn: true,
          beforeEach: true,
          afterEach: true,
          jasmine: true,
          waitsFor: true,
          runs: true,
          __dirname: true,
          window: true,
          setTimeout: true
        }
      }
    },

    open : {
      jasmine : {
        path: 'http://127.0.0.1:9002'
      },
      coverage : {
        path : process.cwd() + '/coverage/lcov-report/index.html'
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jasmine-node-coverage');
  grunt.loadNpmTasks('grunt-open');

  // Default task(s).
  grunt.registerTask('lint', 'Verifies all javascript follow coding standards.', ['jshint']);

  // Compound default tasks
  grunt.registerTask('test', 'Runs test and coverage', ['jasmine_node']);
  grunt.registerTask('coverage', 'Runs tests and coverage, and show coverage results in browser', ['test','open:coverage']);

  grunt.registerTask('cleanup', 'Removes garbage files generated by tasks', function(){
    var files = [
      'libpeerconnection.log',
      '_SpecRunner.html'
    ];
    var fs = require('fs');
    files.forEach(function(file){
      fs.unlink(file, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
};