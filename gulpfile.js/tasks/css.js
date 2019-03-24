'use strict';

const { src, dest } = require('gulp');
const paths = require('../paths');
const gulpConcat = require('gulp-concat');

function css() {
    return src(paths.css)
        .pipe(gulpConcat('typograf.css'))
        .pipe(dest(paths.dir.build));
}

module.exports = css;
