var config      = require('../config')

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var changed     = require('gulp-changed')
var sourcemaps  = require('gulp-sourcemaps')
var path        = require('path')
var handleErrors = require('../lib/handleErrors')

var paths = {
  src: path.join(config.root.src, config.tasks.jsons.src, '/**/*'),
  dest: path.join(config.root.dest, config.tasks.jsons.dest)
}

var jsonsTask = function() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dest))
    .on('error', handleErrors)
    .pipe(browserSync.stream())
}

gulp.task('jsons', jsonsTask)
module.exports = jsonsTask
