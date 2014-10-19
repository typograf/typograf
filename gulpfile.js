var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    gulpFilter = require('gulp-filter'),
    destDir = './',
    filterWithoutSpec = gulpFilter(function(file) {
        return file.path.search(/spec\.js/) === -1;
    }),
    filterOnlySpec = gulpFilter(function(file) {
        return file.path.search(/spec\.js/) !== -1;
    });

var paths = {
    js: [
        'src/main.js',
        'src/entities.js',
        'src/rules/**/*.js',
        'src/end.js'
    ],
    testJs: [
        'src/rules/**/*.js'
    ]
};

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(filterWithoutSpec)
        .pipe(concat('typograf.js'))
        .pipe(gulp.dest(destDir));
});

gulp.task('minjs', function() {
    return gulp.src(paths.js)
        .pipe(filterWithoutSpec)
        .pipe(concat('typograf.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));
});

gulp.task('test-js', function() {
    return gulp.src(paths.testJs)
        .pipe(filterOnlySpec)
        .pipe(concat('rules.js'))
        .pipe(gulp.dest('./tests/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(filterWithoutSpec)
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['js']);
});

gulp.task('default', ['js', 'minjs', 'test-js', 'watch', 'lint']);
