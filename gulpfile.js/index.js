'use strict';

const gulp = require('gulp');

const taskCss = require('./tasks/css');

const taskJsonGroups = require('./tasks/jsonGroups');
const taskJsonRules = require('./tasks/jsonRules');

const taskJs = require('./tasks/js');

const taskAllJs = require('./tasks/allJs');

gulp.task('default', gulp.series(
    gulp.parallel(
        taskCss,
        taskJsonGroups
    ),
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
