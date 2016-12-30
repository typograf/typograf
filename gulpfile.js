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

const bodyJs = [
    'src/main.js',
    'src/version.js',
    'src/indexes.js',
    'src/html_entities.js',
    'src/block_elements.js',
    'src/inline_elements.js',
    'src/data/**/*.js',
    'src/rules/**/*.js',
    'src/sort.js'
];

const paths = {
    dist: 'dist/',
    build: 'build/typograf.*',
    jsonRules: [
        'src/rules/**/*.json'
    ],
    jsonGroups: [
        'src/groups.json'
    ],
    js: [].concat(
        'src/start.js',
        bodyJs,
        'src/end.js'
    ),
    allJs: [].concat(
        'src/start.js',
        bodyJs,
        'dist/typograf.titles.js',
        'dist/typograf.groups.js',
        'src/end.js'
    ),
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

    return gulp.src(file, {base: './'})
        .pipe(replace(/'[\d.]+'/, '\'' + version + '\''))
        .pipe(gulp.dest(''));
});

gulp.task('js', ['version'], function() {
    return gulp.src(paths.js)
        .pipe(filter())
        .pipe(concat('typograf.js'))
        .pipe(gulp.dest(destDir));
});

gulp.task('all.js', ['js', 'jsonRules', 'jsonGroups'], function() {
    return gulp.src(paths.allJs)
        .pipe(filter())
        .pipe(concat('typograf.all.js'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('jsonLintRules', function() {
    return gulp.src(paths.jsonRules)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('jsonLintGroups', function() {
    return gulp.src(paths.jsonGroups)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('jsonRules', ['js', 'jsonLintRules'], function() {
    return gulp.src(paths.jsonRules)
        .pipe(gulpJsonRules('typograf.titles.json'))
        .pipe(gulp.dest(destDir))
        .on('end', function() {
            typografUtils.buildTitles();
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

gulp.task('min.js', ['js'], function() {
    return gulp.src(destDir + 'typograf.js')
        .pipe(rename('typograf.min.js'))
        .pipe(uglify({
            output: {ascii_only: true},
            preserveComments: 'license'
        }))
        .pipe(gulp.dest(destDir));
});

gulp.task('all.min.js', ['all.js'], function() {
    return gulp.src(paths.dist + 'typograf.all.js')
        .pipe(rename('typograf.all.min.js'))
        .pipe(uglify({
            output: {ascii_only: true},
            preserveComments: 'license'
        }))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(concat('typograf.css'))
        .pipe(gulp.dest(destDir));
});

gulp.task('specs', function() {
    const filterSpec = gulpFilter(['**/*.spec.js']);

    return gulp.src(paths.testRules)
        .pipe(filterSpec)
        .pipe(concat('rules.js'))
        .pipe(gulp.dest(destDir));
});

gulp.task('default', ['min.js', 'specs', 'css']);

gulp.task('dist', [
    'default',
    'jsonRules',
    'jsonGroups',
    'all.min.js'
], () => gulp.src(paths.build).pipe(gulp.dest(paths.dist)));
