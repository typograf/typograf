'use strict';

const gulp = require('gulp');

const taskJsonRules = require('./tasks/jsonRules');

gulp.task('default', gulp.series(
    taskJsonRules,
));
