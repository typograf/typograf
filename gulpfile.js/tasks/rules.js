'use strict';

const { dest, src } = require('gulp');
const gulpFilter = require('gulp-filter');
const gulpConcat = require('gulp-concat');
const fileFilter = () => gulpFilter(['**/*.js', '!**/*.spec.js']);
const paths = require('../paths');

function rules() {
    return src(paths.js.rules)
        .pipe(fileFilter())
        .pipe(gulpConcat('rules.js'))
        .pipe(dest(paths.dir.build));
}

module.exports = rules;
