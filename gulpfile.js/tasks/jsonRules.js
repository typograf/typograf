'use strict';

const { src, dest } = require('gulp');
const fs = require('fs');
const gulpJsonRules = require('../plugins/json-rules');
const paths = require('../paths');

const queue = {
    'start': 0,
    'utf': 1,
    'default': 3,
    'entity': 5,
    'end': 10
};

const langs = ['ru', 'en-US'];

function jsonRules() {
    return src(paths.json.rules)
        .pipe(gulpJsonRules('typograf.titles.json'))
        .pipe(dest(paths.dir.build))
        .on('end', () => {
            buildTitles();
            makeMdRules();
        });
}

function buildTitles() {
    const txt = fs.readFileSync(`${paths.dir.build}typograf.titles.json`);

    fs.writeFileSync(`${paths.dir.build}typograf.titles.ts`, `export default ${txt};
`);
}

function getRow(titles, rule, i, locale) {
    const title = titles[rule.name][locale] || titles[rule.name].common;

    return '| ' + i + '. | [' +
        rule.name + '](../src/rules/' + rule.name + '.ts) | ' +
        title + ' | ' +
        rule.index + ' | ' +
        rule.queue + ' | ' +
        (rule.enabled === false || rule.disabled === true ? '' : '✓') + ' |\n';
}

function processTemplate(file, templateFile, text) {
    const template = fs.readFileSync(templateFile).toString();

    fs.writeFileSync(file, template.replace(/{{content}}/, text));
}

function makeMdRules() {
    const Typograf = require('../../build/typograf.js');
    const titles = require('../../build/typograf.titles.json');
    const rules = Typograf.rules;

    function buildDoc(prefix) {
        langs.forEach(function(locale) {
            let text = '';

            rules.forEach(function(rule, i) {
                text += getRow(titles, rule, i + 1, locale);
            });

            const postFix = `${prefix}.${locale}.md`;
            processTemplate(
                `docs/RULES${postFix}`,
                `gulpfile.js/templates/RULES${postFix}`,
                text
            );
        });
    }

    rules.sort((a, b) => a.name > b.name ? 1 : -1);

    buildDoc('');

    rules.sort((a, b) => {
        const queueIndexA = getQueueIndex(queue[a.queue]);
        const queueIndexB = getQueueIndex(queue[b.queue]);

        if (queueIndexA === queueIndexB) {
            if (a.index > b.index) {
                return 1;
            } else if (a.index < b.index) {
                return -1;
            } else {
                return 0;
            }
        } else if (queueIndexA > queueIndexB) {
            return -1;
        } else {
            return 1;
        }
    });

    buildDoc('_SORTED');
}

function getQueueIndex(name) {
    return [
        'start',
        'hide-safe-tags-own',
        'hide-safe-tags-html',
        'hide-safe-tags-url',
        'hide-safe-tags',
        'utf',
        'default',
        'html-entities',
        'show-safe-tags-url',
        'show-safe-tags-html',
        'show-safe-tags-own',
        'end'
    ].indexOf(name);
}

module.exports = jsonRules;
