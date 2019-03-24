'use strict';

const currentYear = new Date().getFullYear();
const packageJson = require('../../package');
const gulpReplace = require('gulp-replace');

const comment = [
    '/*! ',
    [
        packageJson.name,
        `© ${currentYear} ${packageJson.author.name}`,
        `${packageJson.license}  License`,
        packageJson.author.url
    ].join(' | '),
    ' */\n'
].join('');

module.exports = function copyright() {
    return gulpReplace(/^/, comment);
};
