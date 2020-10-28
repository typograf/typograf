'use strict';

module.exports = {
    dir: {
        build: './build/',
        dist: './dist/'
    },
    ts: {
        index: 'src/index.ts',
        all: 'src/index.all.ts'
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
