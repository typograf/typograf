'use strict';

module.exports = {
    dir: {
        build: './build/',
        dist: './dist/'
    },
    js: {
        index: 'src/index.js',
        all: 'src/index_all.js'
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
