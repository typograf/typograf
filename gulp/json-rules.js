'use strict';

const gutil = require('gulp-util');
const GFile = gutil.File;
const path = require('path');
const PluginError = gutil.PluginError;
const sortKeys = require('sort-keys');
const through = require('through');

function getRulePath(file) {
    const str = file.replace(/\.json$/, '').split(/\/|\\/);
    return [str[str.length - 3], str[str.length - 2], str[str.length - 1]].join('/');
}

module.exports = function(file) {
    if (!file) {
        throw new PluginError('gulp-json-rules', 'Missing file option for gulp-json-rules');
    }

    const rules = {};
    let firstFile;

    if (typeof file !== 'string') {
        if (typeof file.path === 'string') {
            firstFile = new GFile(file);
        } else {
            throw new PluginError('gulp-json-rules', 'Missing path in file options for gulp-json-rules');
        }
    }

    function bufferContents(file) {
        if (file.isNull()) {
            return;
        }

        if (file.isStream()) {
            return this.emit('error', new PluginError('gulp-json-rules', 'Streaming not supported'));
        }

        if (!firstFile) {
            firstFile = file;
        }

        rules[getRulePath(file.relative)] = JSON.parse(file.contents);
    }

    function endStream() {
        let joinedFile;
        if (typeof file === 'string') {
            joinedFile = firstFile.clone({contents: false});
            joinedFile.path = path.join(firstFile.base, file);
        } else {
            joinedFile = firstFile;
        }

        joinedFile.contents = new Buffer(JSON.stringify(sortKeys(rules, {deep: true}), null, '  '), 'utf8');

        this.emit('data', joinedFile);
        this.emit('end');
    }

    return through(bufferContents, endStream);
};
