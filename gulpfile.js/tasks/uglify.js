const gulpUglify = require('gulp-uglify');

module.exports = function uglify() {
    return gulpUglify({
        output: {
            ascii_only: true,
        }
    });
};
