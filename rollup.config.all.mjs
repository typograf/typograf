import babel from '@rollup/plugin-babel';

export default [
    {
        input: 'src/index_all.js',
        output: {
            format: 'umd',
            name: 'Typograf',
            file: './build/typograf.all.js'
        },
        plugins: [
            babel({
                presets: [ '@babel/preset-env' ],
                babelHelpers: 'bundled'
            })
        ]
    }
];
