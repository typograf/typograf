var gulp = require('gulp'),
    fs = require('fs'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jsonlint = require('gulp-jsonlint');
    jscs = require('gulp-jscs'),
    gulpFilter = require('gulp-filter'),
    gulpJsonRules = require('./libs/gulp-json-rules'),
    filter = function() {
        return gulpFilter(['**/*.js', '!**/*.spec.js']);
    },
    queue = {
        start: 1,
        undefined: 2,
        end: 3
    },
    destDir = './dist/',
    makeMdRules = function() {
        var Typograf = require('./dist/typograf.js'),
            typografTitles = require('./dist/typograf.titles.json'),
            getRow = function(rule, i) {
                var title = typografTitles[rule.name].ru || typografTitles[rule.name].common;
                text += '| ' + (i + 1) + '. | [' +
                    rule.name + '](../src/rules/' + rule.name + '.js) | ' +
                    title + ' | ' +
                    rule.sortIndex + ' | ' +
                    (rule.queue || '') + ' | ' +
                    (rule.enabled !== false ? '✓' : '') + ' |\n';
            },
            processTemplate = function(file, templateFile) {
                var template = fs.readFileSync(templateFile).toString();
                fs.writeFileSync(file, template.replace(/{{content}}/, text));
            },
            text = '';

        Typograf.prototype._rules.sort(function(a, b) {
            if(a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        }).forEach(getRow);
        processTemplate('docs/RULES.md', 'templates/rules.md');

        text = '';
        Typograf.prototype._rules.sort(function(a, b) {
            var queueA = queue[a.queue],
                queueB = queue[b.queue];
            if(queueA === queueB) {
                if(a.sortIndex > b.sortIndex) {
                    return 1;
                } else if(a.sortIndex < b.sortIndex) {
                    return -1;
                } else {
                    return 0;
                }
            } else if(queueA > queueB) {
                return 1;
            } else {
                return -1;
            }
        }).forEach(getRow);
        processTemplate('docs/RULES_SORTED.md', 'templates/rules_sorted.md');
    };
    
function buildTitles() {
    var txt = fs.readFileSync('dist/typograf.titles.json');
    fs.writeFileSync('dist/typograf.titles.js', 'Typograf.prototype.titles = ' + txt + ';\n');
}

function updateBowerVersion() {
    var pack = require('./package.json');
    var bower = require('./bower.json');
    if(pack.version !== bower.version) {
        bower.version = pack.version;
        fs.writeFileSync('bower.json', JSON.stringify(bower, null, '  '));
    }
}

var paths = {
    json: [
        'src/**/*.json'
    ],
    js: [
        'src/main.js',
        'src/entities.js',
        'src/data/**/*.js',
        'src/rules/**/*.js',
        'src/end.js'
    ],
    css: [
        'src/**/*.css'
    ],
    testRules: [
        'src/main.spec.js',
        'src/rules/**/*.js'
    ]
};

gulp.task('js', function() {
    return gulp.src(paths.js)
        .pipe(filter())
        .pipe(concat('typograf.js'))
        .pipe(gulp.dest(destDir));
});

gulp.task('jsonlint', function() {
    gulp.src(paths.json)
        .pipe(jsonlint())
        .pipe(jsonlint.reporter());
});

gulp.task('json', ['js', 'jsonlint'], function() {
    return gulp.src(paths.json)
        .pipe(gulpJsonRules('typograf.titles.json'))
        .pipe(gulp.dest(destDir))
        .on('end', function() {
            buildTitles();
            updateBowerVersion();
            makeMdRules();
        });
});

gulp.task('minjs', ['js'], function() {
    return gulp.src('dist/typograf.js')
        .pipe(rename('typograf.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destDir));
});

gulp.task('css', function() {
    return gulp.src(paths.css)
        .pipe(concat('typograf.css'))
        .pipe(gulp.dest(destDir));
});

gulp.task('testRules', function() {
    var filterSpec = gulpFilter(['**/*.spec.js']);

    return gulp.src(paths.testRules)
        .pipe(filterSpec)
        .pipe(concat('rules.js'))
        .pipe(gulp.dest('./test/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(filter())
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*', 'test/**/*'], ['js', 'testRules', 'css', 'json', 'jsonlint']);
});

gulp.task('default', ['js', 'minjs', 'testRules', 'lint', 'css', 'json', 'jsonlint']);
