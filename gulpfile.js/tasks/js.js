'use strict';

const { src, dest } = require('gulp');
const gulpRename = require('gulp-rename');
const gulpRollup = require('gulp-rollup');
const paths = require('../paths');
const babel = require('rollup-plugin-babel');

const copyright = require('../utils/copyright');
const version = require('../utils/version');

function js() {
    return src(['./src/**/*.js', './build/**/*.js'])
        .pipe(gulpRollup({
            input: paths.js.index,
            output: {
                format: 'umd',
                name: 'Typograf'
            },
            plugins: [babel()]
        }))
        .pipe(version())
        .pipe(copyright())
        .pipe(gulpRename('typograf.js'))
        .pipe(dest(paths.dir.build));
}

module.exports = js;
