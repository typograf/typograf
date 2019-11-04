'use strict';

const { dest, src } = require('gulp');
const gulpConcat = require('gulp-concat');
const paths = require('../paths');

function tests() {
    return src(paths.tests)
        .pipe(gulpConcat('tests.js'))
        .pipe(dest(paths.dir.build));
}

module.exports = tests;
