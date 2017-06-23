var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    Server = require('karma').Server;

gulp.task('default', ['tdd', 'watch'])
/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  new Server({
      configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// Set up jshint task
gulp.task('jshint', function() {
  return gulp.src('./source/app/components/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
// Add watchers to all js file in any folders in the components directory.
gulp.task('watch', function() {
  gulp.watch('./source/app/components/**/*.js', ['jshint']);
});