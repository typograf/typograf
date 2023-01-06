module.exports = (ctx) => ({
    map: ctx.options.map,
    parser: ctx.options.parser,
    plugins: {
        'postcss-import-ext-glob': { root: ctx.file.dirname },
        'postcss-import': { root: ctx.file.dirname },
    },
});
