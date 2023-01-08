import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/typograf.ts',
        output: {
            format: 'umd',
            name: 'Typograf',
            file: './build/typograf.js'
        },
        plugins: [ typescript({ tsconfig: './tsconfig.json' }) ],
    }
];
