var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var Buffer = require('buffer').Buffer;

function getRulePath(file) {
    var str = file.replace(/\.json$/, '').split(/\/|\\/);
    return [str[str.length - 3], str[str.length - 2], str[str.length - 1]].join('/');
}

module.exports = function(file, opt) {
  if (!file) {
    throw new PluginError('gulp-json-rules', 'Missing file option for gulp-json-rules');
  }
  opt = opt || {};

  var rules = {};
  var fileName;
  var firstFile;

  if (typeof file === 'string') {
    fileName = file;
  } else if (typeof file.path === 'string') {
    fileName = path.basename(file.path);
    firstFile = new File(file);
  } else {
    throw new PluginError('gulp-json-rules', 'Missing path in file options for gulp-json-rules');
  }

  function bufferContents(file) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', new PluginError('gulp-json-rules',  'Streaming not supported'));
    }

    if (!firstFile) {
      firstFile = file;
    }

    rules[getRulePath(file.relative)] = JSON.parse(file.contents);
  }

  function endStream() {
    var joinedFile;
    if (typeof file === 'string') {
      joinedFile = firstFile.clone({contents: false});
      joinedFile.path = path.join(firstFile.base, file);
    } else {
      joinedFile = firstFile;
    }

    joinedFile.contents = new Buffer(JSON.stringify(rules, null, '  '), 'utf8');

    this.emit('data', joinedFile);
    this.emit('end');
  }

  return through(bufferContents, endStream);
};
