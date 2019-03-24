'use strict';

const { src } = require('gulp');
const gulpJsonlint = require('gulp-jsonlint');
const paths = require('../paths');

function jsonLintGroups() {
    return src(paths.json.groups)
        .pipe(gulpJsonlint())
        .pipe(gulpJsonlint.reporter());
}

module.exports = jsonLintGroups;
