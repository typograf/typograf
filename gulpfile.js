var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
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

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['js']);
});

gulp.task('default', ['js', 'minjs', 'watch', 'lint']);
