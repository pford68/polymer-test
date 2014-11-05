/*
 *   NOTES:
 *   (1) The livereload module works best with Chrome's Livereload extension:
 *       See https://www.npmjs.org/package/gulp-livereload
 */

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    del = require('del'),
    livereload = require('gulp-livereload'),   // See Note 1 above
    server = require("./server"),
    config = require('./config/dev.json');

gulp.task('clean', function(done){
    del.sync('./dist');
    done();
});

// JSHint task
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        // You can look into pretty reporters as well, but that's another story
        .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {  /*
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
    gulp.src(['./src/js/main.js'])
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        // Bundle to a single file
        .pipe(concat('bundle.js'))
        // Output it to our dist folder
        .pipe(gulp.dest('dist/js'));  */
    gulp.src([
        './src/**/*.js',
        '!./src/lib/**/*.js'
    ], { base: './src' })
        // Will be put in the dist/images folder
        .pipe(gulp.dest('dist'));
});

// Views task
gulp.task('views', function() {
    gulp.src([
        './src/**/*.html',
        './src/**/*.css',
        '!./src/lib/**'
    ], { base: './src' })
        // Will be put in the dist/images folder
        .pipe(gulp.dest('dist'));
});

// Watching for changes to JS src files.
gulp.task('watch', ['lint', 'browserify'], function() {
    // Watch our scripts
    gulp.watch(['./src/**/*.js', './src/**/*.json', '!./src/lib/**'],[
        'lint',
        'browserify'
    ]);
    gulp.watch(['./src/**/*.html', './src/**/*.css', '!./src/lib/**'], [
        'views'
    ]);
    gulp.watch('dist/**').on('change', livereload.changed);
});

// Dev task
gulp.task('dev', ['watch'], function() {
    // Start webserver
    server.start(config.port);
    // Start live reload
    livereload.listen();
});