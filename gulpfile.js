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

gulp.task('data', function data() {
    return gulp.src(paths.jsData)
        .pipe($.concat('data.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('rules', function rules() {
    return gulp.src(paths.jsRules)
        .pipe(filter())
        .pipe($.concat('rules.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('js', gulp.series('data', 'rules', function js() {
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
}));

gulp.task('jsonLintRules', function jsonLintRules() {
    return gulp.src(paths.jsonRules)
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter());
});

gulp.task('jsonRules', gulp.series('js', 'jsonLintRules', function jsonRules() {
    return gulp.src(paths.jsonRules)
        .pipe(gulpJsonRules('typograf.titles.json'))
        .pipe(gulp.dest(buildDir))
        .on('end', function() {
            typografUtils.buildTitles();
            typografUtils.makeMdRules();
        });
}));

gulp.task('jsonLintGroups', function jsonLintGroups() {
    return gulp.src(paths.jsonGroups)
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter());
});

gulp.task('jsonGroups', gulp.series('js', 'jsonLintGroups', function jsonGroups() {
    return gulp.src(paths.jsonGroups)
        .pipe($.rename('typograf.groups.json'))
        .pipe(gulp.dest(buildDir))
        .on('end', function() {
            typografUtils.buildGroups();
        });
}));

gulp.task('all.js', gulp.series('js', 'jsonRules', 'jsonGroups', function allJs() {
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
}));

gulp.task('min.js', gulp.series('js', function minJs() {
    return gulp.src(buildDir + 'typograf.js')
        .pipe($.rename('typograf.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest(buildDir));
}));

gulp.task('all.min.js', gulp.series('all.js', function jsAllMin() {
    return gulp.src(buildDir + 'typograf.all.js')
        .pipe($.rename('typograf.all.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest(buildDir));
}));

gulp.task('css', function css() {
    return gulp.src(paths.css)
        .pipe($.concat('typograf.css'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('specs', function specs() {
    return gulp.src(paths.specRules)
        .pipe($.concat('specs.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('default', gulp.series('min.js', 'specs', 'css'));

gulp.task('dist', gulp.series(
    'default',
    'jsonRules',
    'jsonGroups',
    'all.min.js'
, function dist() {
    return gulp.src(paths.build).pipe(gulp.dest(distDir));
}));
