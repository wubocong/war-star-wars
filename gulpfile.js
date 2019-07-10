var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var del = require('del');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

gulp.task('connect', function () {
  connect.server({
    root: 'src',
    livereload: true,
    host: '0.0.0.0'
  });
});

gulp.task('scss', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
    .pipe(connect.reload());
});

gulp.task('reload', function () {
  gulp.src(['./src/**/*', '!./src/**/*.scss'])
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*', '!./src/**/*.scss'], ['reload']);
  gulp.watch('./src/scss/**/*.scss', ['scss']);
});

gulp.task('clean-build', function () {
  del.sync('./dist/*');
});

gulp.task('build', ['scss', 'clean-build'], function () {
  gulp.src('src/index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cleanCSS({
      rebase: false
    })))
    .pipe(gulp.dest('./dist'));

  gulp.src('./src/img/**')
    .pipe(gulp.dest('./dist/img'));
  gulp.src('./src/font/**')
    .pipe(gulp.dest('./dist/font'));
  gulp.src('./src/music/**')
    .pipe(gulp.dest('./dist/music'));
});

gulp.task('dist', function () {
  connect.server({
    root: 'dist',
    host: '0.0.0.0',
    port: 8008
  });
});

gulp.task('default', ['scss', 'connect', 'watch']);