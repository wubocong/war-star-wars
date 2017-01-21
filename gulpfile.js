var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var del = require('del');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true,
    host: '0.0.0.0'
  });
});

gulp.task('sass', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(connect.reload());
});

gulp.task('reload', function() {
  gulp.src(['./public/**/*', '!./public/**/*.scss'])
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./public/**/*', '!./public/**/*.scss'], ['reload']);
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('clean-build', function() {
  del.sync('./dist/*');
});

gulp.task('build', ['sass', 'clean-build'], function() {
  gulp.src('public/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleanCSS({rebase: false})))
    .pipe(gulp.dest('./dist'));

  gulp.src('./public/logo.svg')
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist', function() {
  connect.server({
    root: 'dist',
    host: '0.0.0.0',
    port: 8008
  });
});

gulp.task('default', ['sass', 'connect', 'watch']);
