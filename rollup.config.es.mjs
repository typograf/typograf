import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/typograf.ts',
        output: {
            format: 'es',
            file: './build/typograf.es.mjs'
        },
        plugins: [ typescript({ tsconfig: './tsconfig.json' }) ],
    }
];
