'use strict';

const gulp = require('gulp');
const fs = require('fs');
const $ = require('gulp-load-plugins')();
const babel = require('rollup-plugin-babel');

const uglifyOptions = {output: {ascii_only: true, comments: /^!/}};
const gulpJsonRules = require('./gulp/json-rules');
const typografUtils = require('./gulp/utils');
const filter = function() { return $.filter(['**/*.js', '!**/*.spec.js']); };

const srcDir = './src/';
const buildDir = './build/';
const distDir = './dist/';

const paths = {
    build: 'build/typograf.*',
    mainJs: 'src/main.js',
    allJs: 'src/all.js',
    jsData: [
        'src/build-import.js',
        'src/data/**/*.js'
    ],
    jsRules: [
        'src/build-import.js',
        'src/rules/**/*.js'
    ],
    jsonRules: [
        'src/rules/**/*.json'
    ],
    jsonGroups: [
        'src/groups.json'
    ],
    css: [
        'src/**/*.css'
    ],
    specRules: [
        'src/main.spec.js',
        'src/rules/**/*.spec.js'
    ]
};

gulp.task('data', function() {
    return gulp.src(paths.jsData)
        .pipe($.concat('data.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('rules', function() {
    return gulp.src(paths.jsRules)
        .pipe(filter())
        .pipe($.concat('rules.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('js', ['data', 'rules'], function() {
    return gulp.src(['./src/**/*.js', './build/**/*.js'])
        .pipe($.rollup({
            input: paths.mainJs,
            output: {
                format: 'umd',
                name: 'Typograf'
            },
            plugins: [babel()]
        }))
        .pipe(typografUtils.updateVersion())
        .pipe(typografUtils.addCopyright())
        .pipe($.rename('typograf.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('all.js', ['js', 'jsonRules', 'jsonGroups'], function() {
    return gulp.src(['./src/**/*.js', './build/**/*.js'])
        .pipe($.rollup({
            input: paths.allJs,
            output: {
                format: 'umd',
                name: 'Typograf'
            },
            plugins: [babel()]
        }))
        .pipe(typografUtils.updateVersion())
        .pipe(typografUtils.addCopyright())
        .pipe($.rename('typograf.all.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('jsonLintRules', function() {
    return gulp.src(paths.jsonRules)
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter());
});

gulp.task('jsonLintGroups', function() {
    return gulp.src(paths.jsonGroups)
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter());
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
        .pipe($.rename('typograf.groups.json'))
        .pipe(gulp.dest(buildDir))
        .on('end', function() {
            typografUtils.buildGroups();
        });
});

gulp.task('min.js', ['js'], function() {
    return gulp.src(buildDir + 'typograf.js')
        .pipe($.rename('typograf.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest(buildDir));
});

gulp.task('all.min.js', ['all.js'], function() {
    return gulp.src(buildDir + 'typograf.all.js')
        .pipe($.rename('typograf.all.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest(buildDir));
});

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe($.concat('typograf.css'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('specs', function() {
    return gulp.src(paths.specRules)
        .pipe($.concat('specs.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('default', ['min.js', 'specs', 'css']);

gulp.task('dist', [
    'default',
    'jsonRules',
    'jsonGroups',
    'all.min.js'
], () => gulp.src(paths.build).pipe(gulp.dest(distDir)));
