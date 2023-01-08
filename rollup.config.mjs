import typescript from '@rollup/plugin-typescript';

const plugins = [ typescript({ tsconfig: './tsconfig.json' }) ];

export default [
    {
        input: 'src/typograf.ts',
        output: {
            format: 'umd',
            name: 'Typograf',
            file: './build/typograf.js'
        },
        plugins,
    },
    {
        input: 'src/typograf.ts',
        output: {
            format: 'es',
            file: './build/typograf.es.mjs'
        },
        plugins,
    }
];
