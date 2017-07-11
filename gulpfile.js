var gulp = require('gulp'),
    gulpPlugins = require('gulp-load-plugins'),
    es = require('event-stream'),
    Q = require('q'),
    del = require('del'),
    Server = require('karma').Server,
    // jshint = require('gulp-jshint'),
    htmlHint = require('gulp-htmlhint'),
    plugins = gulpPlugins();
    // uglify = require('gulp-uglify'),
    // concat = require('gulp-concat'),
    // htmlmin = require('gulp-htmlmin'),
    // ngAnnotate = require('gulp-ng-annotate'),
    // embedTemplates = require('gulp-angular-embed-templates'),
    // jsonMinify = require('gulp-json-minify'),
    // cleanCSS = require('gulp-clean-css'),
    // rename = require('gulp-rename');

var paths = {
  prod: './public/',
  js: ['./source/app/myApp.js',
    './source/app/components/**/*.js', 
    '!./source/app/components/**/*spec.js'],
  mainJS: ['./source/app/myApp.js'],
  theIndex: './index.html',
  htmlPartials: ['./source/app/components/**/*.html',
    '!./source/index.html'],
  json: './source/assets/JSON/*.json',
  css: './source/assets/css/styles.css',
  csv: './source/assets/csv/*.csv'
}

// gulp.task('default', ['tests','js','json','css','htmlPartials']);

gulp.task('default', ['build-main-script','build-app-prod','tests']);
/**
 * Run tests once.
 */
gulp.task('tests', function (done) {
  Server.start({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
  }, function(err) {
    done(err);
  });
});

var pipes = {};

pipes.minifiedFileName = function() {  
  return plugins.rename(function (path) {
    path.extname = '.min' + path.extname;
  });
};
// pipe for test
pipes.test = function (done) {
  Server.start({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
  }, function(err) {
    done(err);
  })
};
// pipes to build scripts
pipes.validatedAppScripts = function() {
  return gulp.src(paths.js)
    .pipe(plugins.angularEmbedTemplates())
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipes.orderedAppScripts = function() {
  return plugins.angularFilesort();
};

pipes.builtAppScriptsDev = function() {  
    return pipes.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

pipes.validatedPartials = function() {  
  return gulp.src(paths.htmlPartials)
    .pipe(plugins.htmlhint({'doctype-first': false}))
    .pipe(plugins.htmlhint.reporter());
};

pipes.scriptedPartials = function() {  
  return pipes.validatedPartials()
    .pipe(plugins.htmlhint.failReporter())
    .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(plugins.ngHtml2js({
      moduleName: "myApp"
    }));
};

pipes.builtAppScriptsProd = function() {
  var scriptedPartials = pipes.scriptedPartials();
  var validatedAppScripts = pipes.validatedAppScripts();

  return es.merge(scriptedPartials, validatedAppScripts)
    // .pipe(pipes.orderedAppScripts())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('app.min.js'))
    .pipe(plugins.uglify({mangle: false}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(paths.prod));
};

pipes.builtMainScript = function() {
  return gulp.src(paths.mainJS)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(gulp.dest(paths.prod));
}

pipes.builtStylesProd = function() {  
  return gulp.src(paths.css)
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write())
    .pipe(pipes.minifiedFileName())
    .pipe(gulp.dest(paths.prod));
};

pipes.builtCsvProd = function() {
  return gulp.src(paths.csv)
    .pipe(gulp.dest(paths.prod));
};

pipes.builtJson = function() {
  return gulp.src(paths.json)
    .pipe(gulp.dest(paths.prod));
};

pipes.validatedIndex = function() {
  return gulp.src(paths.theIndex)
    .pipe(plugins.htmlhint())
    .pipe(plugins.htmlhint.reporter())
    .pipe(plugins.angularEmbedTemplates());
};

pipes.builtIndexProd = function() {
  var appMainScript = pipes.builtMainScript();
  var appScripts = pipes.builtAppScriptsProd();
  var appStyles = pipes.builtStylesProd();
  var appData = pipes.builtCsvProd();
  var appJSON = pipes.builtJson();

  return pipes.validatedIndex()
    .pipe(gulp.dest(paths.prod)) // write first to get relative path for inject
    .pipe(plugins.inject(appScripts, {relative: true}))
    .pipe(plugins.inject(appStyles, {relative: true}))
    .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(paths.prod));
};

pipes.builtAppProd = function() {  
  return pipes.builtIndexProd();
};

gulp.task('clean-prod', function() {  
    var deferred = Q.defer();
    del(paths.prod, function() {
        deferred.resolve();
    });
    return deferred.promise;
});

gulp.task('validate-partials', pipes.validatedPartials);

gulp.task('clean-build-app-prod', ['clean-prod'], pipes.builtAppProd);

gulp.task('build-app-prod', pipes.builtAppProd);

gulp.task('build-main-script', pipes.builtMainScript);

