'use strict';

const gulp = require('gulp');
const paths = require('./paths');

const taskClean = require('./tasks/clean');
const taskCss = require('./tasks/css');

const taskJsonGroups = require('./tasks/jsonGroups');
const taskJsonRules = require('./tasks/jsonRules');

const taskJs = require('./tasks/js');
const taskMinJs = require('./tasks/minJs');

const taskAllJs = require('./tasks/allJs');
const taskAllMinJs = require('./tasks/allMinJs');

gulp.task('default', gulp.series(
    taskClean,
    gulp.parallel(
        taskCss,
        taskJsonGroups
    ),
    taskJs("umd"),
    taskJs("es"),
    gulp.parallel(
        taskJsonRules,
        taskMinJs
    )
));

gulp.task('dist',
    gulp.series(
        'default',
        taskAllJs,
        taskAllMinJs,
        function dist() {
            return gulp.src(`${paths.dir.build}typograf.*`)
                .pipe(gulp.dest(paths.dir.dist));
        }
    )
);
