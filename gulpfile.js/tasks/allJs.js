'use strict';

const { src, dest } = require('gulp');
const gulpRollup = require('gulp-rollup');
const gulpRename = require('gulp-rename');
const babel = require('rollup-plugin-babel');
const copyright = require('../utils/copyright');
const version = require('../utils/version');
const paths = require('../paths');

function AllJs() {
    return src(['./src/**/*.js', './build/**/*.js'])
        .pipe(gulpRollup({
            input: paths.js.all,
            output: {
                format: 'umd',
                name: 'Typograf'
            },
            plugins: [babel()]
        }))
        .pipe(version())
        .pipe(copyright())
        .pipe(gulpRename('typograf.all.js'))
        .pipe(dest(paths.dir.build));
}

module.exports = AllJs;
