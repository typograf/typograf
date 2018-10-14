'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const babel = require('rollup-plugin-babel');
const del = require('del');

const uglifyOptions = {output: {ascii_only: true, comments: /^!/}};
const gulpJsonRules = require('./gulp/json-rules');
const typografUtils = require('./gulp/utils');
const filter = () => $.filter(['**/*.js', '!**/*.spec.js']);

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

gulp.task('clean', () => {
    return del([buildDir, distDir]);
});

gulp.task('data', () => {
    return gulp.src(paths.jsData)
        .pipe($.concat('data.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('rules', () => {
    return gulp.src(paths.jsRules)
        .pipe(filter())
        .pipe($.concat('rules.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('js', () => {
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

gulp.task('jsonLintRules', () => {
    return gulp.src(paths.jsonRules)
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter());
});

gulp.task('jsonRules', () => {
    return gulp.src(paths.jsonRules)
        .pipe(gulpJsonRules('typograf.titles.json'))
        .pipe(gulp.dest(buildDir))
        .on('end', () => {
            typografUtils.buildTitles();
            typografUtils.makeMdRules();
        });
});

gulp.task('jsonLintGroups', () => {
    return gulp.src(paths.jsonGroups)
        .pipe($.jsonlint())
        .pipe($.jsonlint.reporter());
});

gulp.task('jsonGroups', () => {
    return gulp.src(paths.jsonGroups)
        .pipe($.rename('typograf.groups.json'))
        .pipe(gulp.dest(buildDir))
        .on('end', () => {
            typografUtils.buildGroups();
        });
});

gulp.task('all.js', () => {
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

gulp.task('min.js', () => {
    return gulp.src(buildDir + 'typograf.js')
        .pipe($.rename('typograf.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest(buildDir));
});

gulp.task('all.min.js', () => {
    return gulp.src(buildDir + 'typograf.all.js')
        .pipe($.rename('typograf.all.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest(buildDir));
});

gulp.task('css', () => {
    return gulp.src(paths.css)
        .pipe($.concat('typograf.css'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('specs', () => {
    return gulp.src(paths.specRules)
        .pipe($.concat('specs.js'))
        .pipe(gulp.dest(buildDir));
});

gulp.task('default', gulp.series(
    'clean',
    'data',
    'rules',
    'js',
    'jsonLintRules',
    'jsonRules',
    'jsonLintGroups',
    'jsonGroups',
    'min.js',
    'specs',
    'css'
));

gulp.task('dist', gulp.series(
    'default',
    'all.js',
    'all.min.js'
, function dist() {
    return gulp.src(paths.build).pipe(gulp.dest(distDir));
}));
