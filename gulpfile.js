var gulp = require('gulp'),
    path = require('path'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    destDir = './';
    
var paths = {
    js: [
        'src/main.js',
        'src/entity.js',
        'src/rules/**/*.js',
        'src/end.js'
    ]
};

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(concat('typograf.js'))
        .pipe(gulp.dest(destDir));
});

gulp.task('minjs', function() {
    return gulp.src(paths.js)
        .pipe(concat('typograf.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['js']);
});

gulp.task('default', ['js', 'minjs', 'watch']);
