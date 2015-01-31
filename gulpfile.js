var gulp = require('gulp'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jsonlint = require('gulp-jsonlint');
    jscs = require('gulp-jscs'),
    gulpFilter = require('gulp-filter'),
    gulpJsonRules = require('./gulp/json-rules'),
    typografUtils = require('./gulp/utils'),
    filter = function() {
        return gulpFilter(['**/*.js', '!**/*.spec.js']);
    },
    queue = {
        start: 1,
        undefined: 2,
        end: 3
    },
    destDir = './dist/';

var paths = {
    json: [
        'src/**/*.json'
    ],
    js: [
        'src/main.js',
        'src/entities.js',
        'src/data/**/*.js',
        'src/rules/**/*.js',
        'src/end.js'
    ],
    css: [
        'src/**/*.css'
    ],
    testRules: [
        'src/main.spec.js',
        'src/rules/**/*.js'
    ]
};

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(filter())
        .pipe(concat('typograf.js'))
        .pipe(gulp.dest(destDir));
});

gulp.task('jsonlint', function() {
    gulp.src(paths.json)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('json', ['js', 'jsonlint'], function() {
    return gulp.src(paths.json)
        .pipe(gulpJsonRules('typograf.titles.json'))
        .pipe(gulp.dest(destDir))
        .on('end', function() {
            typografUtils.buildTitles();
            typografUtils.updateBowerVersion();
            typografUtils.makeMdRules();
        });
});

gulp.task('minjs', ['js'], function() {
    return gulp.src('dist/typograf.js')
        .pipe(rename('typograf.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));
});

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(concat('typograf.css'))
        .pipe(gulp.dest(destDir));
});

gulp.task('testRules', function() {
    var filterSpec = gulpFilter(['**/*.spec.js']);

    return gulp.src(paths.testRules)
        .pipe(filterSpec)
        .pipe(concat('rules.js'))
        .pipe(gulp.dest('./test/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(filter())
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*', 'test/**/*'], ['js', 'testRules', 'css', 'json', 'jsonlint']);
});

gulp.task('default', ['js', 'minjs', 'testRules', 'lint', 'css', 'json', 'jsonlint']);
