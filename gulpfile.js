var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    gulpFilter = require('gulp-filter'),
    filter = function() {
        return gulpFilter(['**/*.js', '!**/*.spec.js']);
    },
    destDir = './';

var paths = {
    js: [
        'src/main.js',
        'src/entities.js',
        'src/data/**/*.js',
        'src/rules/**/*.js',
        'src/end.js'
    ],
    testJs: [
        'src/rules/**/*.js'
    ]
};

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(filter())
        .pipe(concat('typograf.js'))
        .pipe(gulp.dest(destDir));
});

gulp.task('minjs', function() {
    return gulp.src(paths.js)
        .pipe(filter())
        .pipe(concat('typograf.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));
});

gulp.task('test-js', function() {
    var filterSpec = gulpFilter(['**/*.spec.js']);

    return gulp.src(paths.testJs)
        .pipe(filterSpec)
        .pipe(concat('_rules.js'))
        .pipe(gulp.dest('./tests/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(filter())
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['js', 'test-js']);
});

gulp.task('default', ['js', 'minjs', 'test-js', 'watch', 'lint']);
