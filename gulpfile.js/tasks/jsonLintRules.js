'use strict';

const { src } = require('gulp');
const gulpJsonlint = require('gulp-jsonlint');
const paths = require('../paths');

function jsonlintRules() {
    return src(paths.json.rules)
        .pipe(gulpJsonlint())
        .pipe(gulpJsonlint.reporter());
}

module.exports = jsonlintRules;
