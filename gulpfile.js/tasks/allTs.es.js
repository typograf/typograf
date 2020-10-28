'use strict';

const replace = require('@rollup/plugin-replace');
const rollup = require('rollup');
const paths = require('../paths');
const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript');
const version = require('../../package.json').version;

async function allTsES6() {
    const bundle = await rollup.rollup({
        input: paths.ts.all,
        plugins: [
            typescript(),
            babel(),
            replace({
                '__version__': version,
            })
        ]
    });

    return bundle.write({
        file: `${paths.dir.build}typograf.all.esm.js`,
        format: 'es',
    });
}

module.exports = allTsES6;

