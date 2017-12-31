/**
 * prebuildProd
 *
 * ---------------------------------------------------------------
 *
 * Builds minified versions of production files so that concat and minification does not occur on server.
 *
 */
module.exports = function(grunt) {
  grunt.registerTask('prebuildProd', [
    'compileAssets',
    'concat',
    'uglify',
    'cssmin',
    'clean:prebuild',
    'copy:prebuild'
  ]);
};