'use strict';

const gulp = require('gulp');
const fs = require('fs');
const concat = require('gulp-concat');
const gulpFilter = require('gulp-filter');
const jsonlint = require('gulp-jsonlint');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const gulpJsonRules = require('./gulp/json-rules');
const typografUtils = require('./gulp/utils');
const filter = function() { return gulpFilter(['**/*.js', '!**/*.spec.js']); };
const version = require('./package.json').version;
const destDir = './build/';

const paths = {
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
        'src/version.js',
        'src/indexes.js',
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

gulp.task('version', function() {
    const file = './src/version.js';
    gulp.src(file, {base: './'})
        .pipe(replace(/'[\d.]+'/, '\'' + version + '\''))
        .pipe(gulp.dest(''));
});

gulp.task('js', ['version'], function() {
    gulp.src(paths.js)
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
    gulp.src(paths.jsonRules)
        .pipe(gulpJsonRules('typograf.titles.json'))
        .pipe(gulp.dest(destDir))
        .on('end', function() {
            typografUtils.buildTitles();
            typografUtils.makeMdRules();
        });
});

gulp.task('jsonGroups', ['js', 'jsonLintGroups'], function() {
    gulp.src(paths.jsonGroups)
        .pipe(rename('typograf.groups.json'))
        .pipe(gulp.dest(destDir))
        .on('end', function() {
            typografUtils.buildGroups();
        });
});

gulp.task('minjs', ['js'], function() {
    gulp.src(destDir + 'typograf.js')
        .pipe(rename('typograf.min.js'))
        .pipe(uglify({
            output: {ascii_only: true},
            preserveComments: 'license'
        }))
        .pipe(gulp.dest(destDir));
});

gulp.task('css', function() {
    gulp.src(paths.css)
        .pipe(concat('typograf.css'))
        .pipe(gulp.dest(destDir));
});

gulp.task('testRules', function() {
    const filterSpec = gulpFilter(['**/*.spec.js']);

    gulp.src(paths.testRules)
        .pipe(filterSpec)
        .pipe(concat('rules.js'))
        .pipe(gulp.dest(destDir));
});

gulp.task('default', ['js', 'minjs', 'testRules', 'css']);

gulp.task('dist', ['default', 'jsonRules', 'jsonLintRules', 'jsonGroups', 'jsonLintGroups'], function() {
    return gulp.src(paths.build).pipe(gulp.dest(paths.dist));
});
