const gulpReplace = require('gulp-replace');
const packageVersion = require('../../package.json').version;

module.exports = function version() {
    return gulpReplace(/\{\{version\}\}/, packageVersion);
};
