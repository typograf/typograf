'use strict';

const gulp = require('gulp');
const fs = require('fs');
const concat = require('gulp-concat');
const gulpFilter = require('gulp-filter');
const include = require('gulp-include');
const jsonlint = require('gulp-jsonlint');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const uglifyOptions = {output: {ascii_only: true, comments: /^!/}};
const gulpJsonRules = require('./gulp/json-rules');
const typografUtils = require('./gulp/utils');
const filter = function() { return gulpFilter(['**/*.js', '!**/*.spec.js']); };
const version = require('./package.json').version;
const srcDir = './src/';
const buildDir = './build/';
const distDir = './dist/';

const paths = {
    build: 'build/typograf.*',
    js: [
        'src/main.js'
    ],
    jsRules: [
        'src/rules/**/*.js'
    ],
    jsonRules: [
        'src/rules/**/*.json'
    ],
    jsonGroups: [
        'src/groups.json'
    ],
    allJs: [
        'build/typograf.js',
        'build/typograf.titles.js',
        'build/typograf.groups.js'
    ],
    css: [
        'src/**/*.css'
    ],
    specRules: [
        'src/main.spec.js',
        'src/rules/**/*.spec.js'
    ]
};

gulp.task('version', function() {
    const file = srcDir + 'version.js';

    return gulp.src(file, {base: './'})
        .pipe(replace(/'[\d.]+'/, '\'' + version + '\''))
        .pipe(gulp.dest(''));
});

gulp.task('rules', function() {
    return gulp.src(paths.jsRules)
        .pipe(filter())
        .pipe(concat('_rules.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('js', ['version', 'rules'], function() {
    return gulp.src(paths.js)
        .pipe(include())
        .pipe(rename('typograf.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('all.js', ['js', 'jsonRules', 'jsonGroups'], function() {
    return gulp.src(paths.allJs)
        .pipe(concat('typograf.all.js'))
        .pipe(gulp.dest(buildDir));
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
        .pipe(gulp.dest(buildDir))
        .on('end', function() {
            typografUtils.buildTitles();
            typografUtils.makeMdRules();
        });
});

gulp.task('jsonGroups', ['js', 'jsonLintGroups'], function() {
    return gulp.src(paths.jsonGroups)
        .pipe(rename('typograf.groups.json'))
        .pipe(gulp.dest(buildDir))
        .on('end', function() {
            typografUtils.buildGroups();
        });
});

gulp.task('min.js', ['js'], function() {
    return gulp.src(buildDir + 'typograf.js')
        .pipe(rename('typograf.min.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest(buildDir));
});

gulp.task('all.min.js', ['all.js'], function() {
    return gulp.src(buildDir + 'typograf.all.js')
        .pipe(rename('typograf.all.min.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest(buildDir));
});

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(concat('typograf.css'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('specs', function() {
    return gulp.src(paths.specRules)
        .pipe(concat('specs.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('default', ['min.js', 'specs', 'css']);

gulp.task('dist', [
    'default',
    'jsonRules',
    'jsonGroups',
    'all.min.js'
], () => gulp.src(paths.build).pipe(gulp.dest(distDir)));
