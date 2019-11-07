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
    ]
};
