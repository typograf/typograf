'use strict';

module.exports = {
    dir: {
        build: './build/',
        dist: './dist/'
    },
    js: {
        main: 'src/main.js',
        all: 'src/all.js'
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
