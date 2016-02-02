
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var watch         = require('gulp-watch');
var livereload    = require('gulp-livereload');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var minifycss     = require('gulp-minify-css');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var imagemin      = require('gulp-imagemin');
var cache         = require('gulp-cache');
var connect       = require('gulp-connect');
var notify        = require('gulp-notify');
var rename        = require('gulp-rename');
var fileinclude   = require('gulp-file-include');
var del           = require('del');
var plumber       = require('gulp-plumber');

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

//Partials

gulp.task('fileinclude', function() {
  gulp.src('./src/views/*.tpl.html')
    .pipe(plumber())
    .pipe(fileinclude({ prefix: '@@'}))
    .pipe(rename({ extname: "" }))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest('./'))
    .pipe(livereload())
    .pipe(notify({ message: 'File include task complete' }));
});

//Styles

gulp.task('sass', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ style: 'expanded', }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./assets/stylesheets'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./assets/stylesheets'))
    .pipe(livereload())
    .pipe(notify({ message: 'Sass task complete' }));
});

//JS

gulp.task('js', function() {
  gulp.src('./src/javascripts/*.js')
    .pipe(plumber())
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./assets/javascripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/javascripts'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

//Images

gulp.task('images', function() {
  gulp.src('./src/images/**/*')
    .pipe(plumber())
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./assets/images'))
    .pipe(livereload())
    .pipe(notify({ message: 'Images task complete' }));
});

// Default task

gulp.task('default', function() {
  gulp.start('fileinclude', 'sass', 'js', 'images', 'watch', 'webserver');
});

// Watch
gulp.task('watch', function() {

  // Create LiveReload server
  livereload.listen();

  // Watch .scss files
  gulp.watch('./src/scss/*.scss', ['sass']);

  // Watch .js files
  gulp.watch('./src/javascripts/*.js', ['js']);

  // Watch image files
  gulp.watch('.src/images/**/*', ['images']);

  // watch task for gulp-file-include
  gulp.watch('./src/views/*.html', ['fileinclude']);

  // Watch any files in assets/, reload on change
  gulp.watch(['.assets/**/*']).on('change', livereload.changed);
});
