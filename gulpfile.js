var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    gulpFilter = require('gulp-filter'),
    filter = function() {
        return gulpFilter(['**/*.js', '!**/*.spec.js']);
    },
    destDir = './dist/';

var paths = {
    js: [
        'src/main.js',
        'src/entities.js',
        'src/data/**/*.js',
        'src/rules/**/*.js',
        'src/end.js'
    ],
    testRules: [
        'src/rules/**/*.js',
        'tests/end_rules.js'
    ],
    testJs: [
        'tests/start_rules.js',
        'tests/_rules.js',
        'tests/smoke.js',
        'tests/end_rules.js'
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

gulp.task('testRules', function() {
    var filterSpec = gulpFilter(['**/*.spec.js']);

    return gulp.src(paths.testRules)
        .pipe(filterSpec)
        .pipe(concat('_rules.js'))
        .pipe(gulp.dest('./tests/'));
});

gulp.task('testJs', ['testRules'], function() {
    return gulp.src(paths.testJs)
        .pipe(concat('_tests.js'))
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
    gulp.watch('src/**/*', ['js', 'testRules']);
    gulp.watch('tests/**/*', ['testJs']);
});

gulp.task('default', ['js', 'minjs', 'testRules', 'testJs', 'watch', 'lint']);
