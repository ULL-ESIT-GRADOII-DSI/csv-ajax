const gulp    = require('gulp'),
      gutil   = require('gulp-util'),
      uglify  = require('gulp-uglify'),
      concat  = require('gulp-concat');
const del     = require('del');
const Server  = require('karma').Server;
const minifyHTML = require('gulp-minify-html');
const cleanCSS = require('gulp-clean-css');
//const minifyCSS  = require('gulp-minify-css');

gulp.task('minify', () => {
  gulp.src('csv.js')
  .pipe(uglify())
  .pipe(gulp.dest('minified'));

  gulp.src('./index.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('./minified/'))

  gulp.src('./*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./minified'));
});

gulp.task('clean', (cb) => {
  del(['minified/*'], cb);
});

gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('default', () => {
  gulp.src([])
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});
