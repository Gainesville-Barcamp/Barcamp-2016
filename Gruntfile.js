module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'css/style.css': 'scss/style.scss',
          'css/print.css': 'scss/print.scss'
        }
      }
    },
    sass_globbing: {
      dist: {
        files: {
          'scss/_base.scss': 'scss/base/**/*.scss',
          'scss/_component.scss': 'scss/component/**/*.scss',
          'scss/_layout.scss': 'scss/layout/**/*.scss'
        }
      },
      options: {
        useSingleQuotes: true
      }
    },
    watch: {
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass_globbing', 'sass', 'autoprefixer'],
        options: {
          spawn: false,
          reload: true,
          livereload: true
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 3 versions', 'ie 9']
        // For testing purposes, use this config
        // browsers: ['opera 12', 'ff 15', 'chrome 25']
      },
      single_file: {
        src: 'css/style.css',
        dest: 'css/style.css'
      },
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9001,
          livereload: true
          // base: 'www-root'
        }
      }
    },
    open : {
      dev : {
        path: 'http://localhost:9001'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['serve']);
  grunt.registerTask('serve', ['connect', 'open:dev', 'watch']);
};
