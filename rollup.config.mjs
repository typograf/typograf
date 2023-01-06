import babel from '@rollup/plugin-babel';

export default [
    {
        input: 'src/index.js',
        output: {
            format: 'umd',
            name: 'Typograf',
            file: './build/typograf.js'
        },
        plugins: [
            babel({
                presets: [ '@babel/preset-env' ],
                babelHelpers: 'bundled'
            })
        ]
    },
    {
        input: 'src/index.js',
        output: {
            format: 'es',
            file: './build/typograf.es.mjs'
        }
    }
];
