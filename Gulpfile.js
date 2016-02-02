/*
 *   NOTES:
 *   (1) The livereload module works best with Chrome's Livereload extension:
 *       See https://www.npmjs.org/package/gulp-livereload
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    del = require('del'),
    livereload = require('gulp-livereload'),   // See Note 1 above
    server = require("./server"),
    config = require('nconf');

config.argv().env().defaults({ file: './config/default.json'});

gulp.task('clean', function(done){
    del.sync('./build');
    done();
});

// JSHint task
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        // You can look into pretty reporters as well, but that's another story
        .pipe(jshint.reporter('default'));
});

/*
 Browserify task.

 Fetches dependencies, and compresses the resulting JS bundle if not in debug mode.
 */
gulp.task("browserify", function(){

    var browserified = transform(function(filename) {
        var b = browserify(filename, { debug: config.debug });
        return b.bundle();
    });

    return gulp.src(['./src/js/main.js'])
        .pipe(browserified)
        .pipe(gulpif(config.debug === false, uglify()))
        .pipe(rename('polymer-test.js'))
        .pipe(gulp.dest('./build/js'));
});


// Watching for changes to JS src files.
gulp.task('watch', ['lint'], function() {
    // Watch our scripts
    gulp.watch([
        './src/**/*.js',
        './src/**/*.json',
        '!./src/lib/**'
    ],[
        'lint',
        'browserify'
    ]);
    gulp.watch([
        './src/components/**',
        './src/examples/**'
    ]).on('change', livereload.changed);
});

// Dev task
gulp.task('dev', ['watch'], function() {
    // Start webserver
    server.start(config.get("port"));
    // Start live reload
    livereload.listen();
});