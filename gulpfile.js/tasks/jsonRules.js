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
    fs.writeFileSync(`${paths.dir.build}typograf.titles.js`, `export default ${txt};
`);
}

function getRow(titles, rule, i, locale) {
    const title = titles[rule.name][locale] || titles[rule.name].common;
    return '| ' + i + '. | [' +
        rule.name + '](../src/rules/' + rule.name + '.js) | ' +
        title + ' | ' +
        rule._index + ' | ' +
        (rule.queue || '') + ' | ' +
        (rule.enabled === false || rule.disabled === true ? '' : '✓') + ' |\n';
}

function processTemplate(file, templateFile, text) {
    const template = fs.readFileSync(templateFile).toString();
    fs.writeFileSync(file, template.replace(/{{content}}/, text));
}

function makeMdRules() {
    const Typograf = require('../../build/typograf.js');
    const titles = require('../../build/typograf.titles.json');
    const rules = Typograf.prototype._rules;

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

    rules.sort(function(a, b) {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });

    buildDoc('');

    rules.sort(function(a, b) {
        const queueA = queue[a.queue || 'default'];
        const queueB = queue[b.queue || 'default'];

        if (queueA === queueB) {
            if (a._index > b._index) {
                return 1;
            } else if (a._index < b._index) {
                return -1;
            } else {
                return 0;
            }
        } else if (queueA > queueB) {
            return 1;
        } else {
            return -1;
        }
    });

    buildDoc('_SORTED');
}

module.exports = jsonRules;
