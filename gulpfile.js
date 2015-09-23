var gulp = require('gulp'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jsonlint = require('gulp-jsonlint'),
    jscs = require('gulp-jscs'),
    gulpFilter = require('gulp-filter'),
    gulpJsonRules = require('./gulp/json-rules'),
    typografUtils = require('./gulp/utils'),
    filter = function() {
        return gulpFilter(['**/*.js', '!**/*.spec.js']);
    },
    destDir = './build/';

var paths = {
    dist: 'dist/',
    build: 'build/typograf.*',
    jsonRules: [
        'src/rules/**/*.json'
    ],
    jsonGroups: [
        'src/groups.json'
    ],
    js: [
        'src/start.js',
        'src/main.js',
        'src/entities.js',
        'src/data/**/*.js',
        'src/rules/**/*.js',
        'src/sort.js',
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

gulp.task('jsonLintRules', function() {
    gulp.src(paths.jsonRules)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('jsonLintGroups', function() {
    gulp.src(paths.jsonGroups)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('jsonRules', ['js', 'jsonLintRules'], function() {
    return gulp.src(paths.jsonRules)
        .pipe(gulpJsonRules('typograf.titles.json'))
        .pipe(gulp.dest(destDir))
        .on('end', function() {
            typografUtils.buildTitles();
            typografUtils.updateBowerVersion();
            typografUtils.makeMdRules();
        });
});

gulp.task('jsonGroups', ['js', 'jsonLintGroups'], function() {
    return gulp.src(paths.jsonGroups)
        .pipe(rename('typograf.groups.json'))
        .pipe(gulp.dest(destDir))
        .on('end', function() {
            typografUtils.buildGroups();
        });
});

gulp.task('minjs', ['js'], function() {
    return gulp.src(destDir + 'typograf.js')
        .pipe(rename('typograf.min.js'))
        .pipe(uglify({
            output: {ascii_only: true},
            preserveComments: 'license'
        }))
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
        .pipe(gulp.dest(destDir));
});

gulp.task('jsLint', function() {
    return gulp.src(paths.js)
        .pipe(filter())
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter());
});

gulp.task('default', ['js', 'minjs', 'testRules', 'jsLint', 'css']);

gulp.task('dist', ['default', 'jsonRules', 'jsonLintRules', 'jsonGroups', 'jsonLintGroups'], function() {
    return gulp.src(paths.build).pipe(gulp.dest(paths.dist));
});
