import typescript from '@rollup/plugin-typescript';

const plugins = [ typescript({ tsconfig: './tsconfig.json' }) ];

export default [
    {
        input: 'src/typograf.all.ts',
        output: {
            format: 'umd',
            name: 'Typograf',
            file: './build/typograf.all.js'
        },
        plugins,
    }
];
