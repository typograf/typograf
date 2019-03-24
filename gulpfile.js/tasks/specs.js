'use strict';

const { dest, src } = require('gulp');
const gulpConcat = require('gulp-concat');
const paths = require('../paths');

function specs() {
    return src(paths.specs)
        .pipe(gulpConcat('specs.js'))
        .pipe(dest(paths.dir.build));
}

module.exports = specs;
