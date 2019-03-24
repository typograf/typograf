'use strict';

const { src, dest } = require('gulp');
const paths = require('../paths');
const gulpRename = require('gulp-rename');
const uglify = require('./uglify');

function allMinJs() {
    const dir = paths.dir.build;

    return src(`${dir}typograf.all.js`)
        .pipe(gulpRename('typograf.all.min.js'))
        .pipe(uglify())
        .pipe(dest(dir));
}

module.exports = allMinJs;
