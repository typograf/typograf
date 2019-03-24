'use strict';

const { src, dest } = require('gulp');
const paths = require('../paths');
const gulpConcat = require('gulp-concat');

function data() {
    return src(paths.js.data)
        .pipe(gulpConcat('data.js'))
        .pipe(dest(paths.dir.build));
}

module.exports = data;
