'use strict';

const gulp = require('gulp');

const taskJsonRules = require('./tasks/jsonRules');

const taskJs = require('./tasks/js');

const taskAllJs = require('./tasks/allJs');

gulp.task('default', gulp.series(
    taskJs("umd"),
    taskJs("es"),
    taskJsonRules,
));

gulp.task('dist',
    gulp.series(
        'default',
        taskAllJs
    )
);
