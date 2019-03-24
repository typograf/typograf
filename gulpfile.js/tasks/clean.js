'use strict';

const del = require('del');
const paths = require('../paths')

function clean() {
    return del([
        paths.dir.build,
        paths.dir.dist
    ]);
}

module.exports = clean;
