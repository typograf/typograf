'use strict';

const gulp = require('gulp');
const paths = require('./paths');

const taskClean = require('./tasks/clean');
const taskCss = require('./tasks/css');

const taskJsonLintRules = require('./tasks/jsonLintRules');
const taskJsonLintGroups = require('./tasks/jsonLintGroups');
const taskJsonGroups = require('./tasks/jsonGroups');
const taskJsonRules = require('./tasks/jsonRules');

const taskTs = require('./tasks/ts');
const taskTsES6 = require('./tasks/ts.es');
const taskMinJs = require('./tasks/minJs');

const taskAllTs = require('./tasks/allTs');
const taskAllTsES6 = require('./tasks/allTs.es');
const taskAllMinJs = require('./tasks/allMinJs');

gulp.task('default', gulp.series(
    taskClean,
    gulp.parallel(
        taskCss,
        taskJsonLintRules,
        taskJsonLintGroups,
        taskJsonGroups
    ),
    gulp.parallel(
        taskTs,
        taskTsES6
    ),
    gulp.parallel(
        taskJsonRules,
        taskMinJs
    )
));

gulp.task('dist',
    gulp.series(
        'default',
        gulp.parallel(
            taskAllTs,
            taskAllTsES6,
        ),
        taskAllMinJs,
        function dist() {
            return gulp.src(`${paths.dir.build}typograf.*`)
                .pipe(gulp.dest(paths.dir.dist));
        }
    )
);
