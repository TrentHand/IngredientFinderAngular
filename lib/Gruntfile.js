module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['../app/**/*.js'],
      options: {
        predef: ["document", "console", "$", "event", "alert", "XMLHttpRequest" ],
        esnext: true,
        globalstrict: true,
        globals: {}
      }
    },
//     sass: {
//       dist: {
//         files: {
// // target: source
//           '../css/style.css': '../sass/main.scss'
//         }
//       }
//     },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint']
      // },
      // sass: {
      //   files: ['../sass/**/*.scss'],
      //   tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'watch']);
};


