'use strict';

module.exports = {
    dir: {
        build: './build/',
        dist: './dist/'
    },
    js: {
        main: 'src/main.js',
        all: 'src/all.js',
        rules: [
            'src/build-import.js',
            'src/rules/**/*.js'
        ]
    },
    json: {
        rules: [
            'src/rules/**/*.json'
        ],
        groups: [
            'src/groups.json'
        ]
    },
    css: [
        'src/**/*.css'
    ],
    tests: [
        'src/main.test.js',
        'src/rules/**/*.test.js'
    ]
};
