'use strict';

const { src, dest } = require('gulp');
const fs = require('fs');
const gulpRename = require('gulp-rename');
const paths = require('../paths');

function jsonGroups() {
    return src(paths.json.groups)
        .pipe(gulpRename('typograf.groups.json'))
        .pipe(dest(paths.dir.build))
        .on('end', () => {
            const dir = paths.dir.build;
            const txt = fs.readFileSync(`${dir}typograf.groups.json`);
            fs.writeFileSync(`${dir}typograf.groups.ts`, `export default ${txt};
`);
        });
}

module.exports = jsonGroups;
