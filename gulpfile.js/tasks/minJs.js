'use strict';

const { src, dest } = require('gulp');
const gulpRename = require('gulp-rename');
const uglify = require('./uglify');
const paths = require('../paths');

function minJs() {
    const dir = paths.dir.build;

    return src(`${dir}typograf.js`)
        .pipe(gulpRename('typograf.min.js'))
        .pipe(uglify())
        .pipe(dest(dir));
}

module.exports = minJs;
