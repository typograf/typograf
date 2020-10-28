'use strict';

const replace = require('@rollup/plugin-replace');
const rollup = require('rollup');
const paths = require('../paths');
const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript');
const version = require('../../package.json').version;

async function allTs() {
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
        file: `${paths.dir.build}typograf.all.js`,
        format: 'umd',
        name: 'Typograf'
    });
}

module.exports = allTs;

