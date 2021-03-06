/**
 * `copy`
 *
 * ---------------------------------------------------------------
 *
 * Copy files and/or folders from your `assets/` directory into
 * the web root (`.tmp/public`) so they can be served via HTTP,
 * and also for further pre-processing by other Grunt tasks.
 *
 * #### Normal usage (`sails lift`)
 * Copies all directories and files (except CoffeeScript and LESS)
 * from the `assets/` folder into the web root -- conventionally a
 * hidden directory located `.tmp/public`.
 *
 * #### Via the `build` tasklist (`sails www`)
 * Copies all directories and files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-copy
 *
 */
module.exports = function(grunt) {

  grunt.config.set('copy', {
    dev: {
      files: [
        {
          expand: true,
          cwd: './assets',
          src: ['**/*.!(coffee|less)'],
          dest: '.tmp/public'
        },
        {
          expand: true,
          cwd: './assets/bower_components/bootstrap/fonts',
          src: ['./*.!(coffee|less)'],
          dest: '.tmp/public/fonts'
        }
      ]
    },
    build: {
      files: [
        { expand: true, cwd: '.tmp/public', src: ['**/*'], dest: 'www' }
      ]
    },
    prebuild: {
      files: [{
        expand: true,
        cwd: '.tmp/public/min',
        src: ['**/*'],
        dest: 'www/public/bin'
      },
      {
        expand: true,
        cwd: './assets/bower_components/bootstrap/fonts',
        src: ['./*.!(coffee|less)'],
        dest: 'www/public/fonts'
      }]
    },
    fromprebuild: {
      files: [{
        expand: true,
        cwd: 'www/public/bin',
        src: ['**/*'],
        dest: '.tmp/public/min/'
      },
      {
        expand: true,
        cwd: 'www/public/fonts',
        src: ['./*.!(coffee|less)'],
        dest: '.tmp/public/fonts/'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
};
