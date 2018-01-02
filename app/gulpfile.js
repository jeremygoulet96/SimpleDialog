'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// SASS task
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

// JS task
gulp.task('js', function () {
    return gulp.src('assets/js/*.js')
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest('assets/js/'));
});

// Sass-Watch task
gulp.task('watch', ['sass'], function() {
    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});

// JS-Watch task
gulp.task('js-watch', ['js'], function(done) {
    browserSync.reload();
    done();
});

// Default task
gulp.task('default', ['watch', 'js-watch'], function () {
    // Browser-Sync
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
