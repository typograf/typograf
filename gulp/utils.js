'use strict';

const fs = require('fs');
const queue = {
    'start': 0,
    'utf': 1,
    'default': 3,
    'entity': 5,
    'end': 10
};
const langs = ['ru', 'en-US'];

module.exports = {
    buildTitles() {
        const txt = fs.readFileSync('build/typograf.titles.json');
        fs.writeFileSync('build/typograf.titles.js', `export default ${txt};
`);
    },
    buildGroups() {
        const txt = fs.readFileSync('build/typograf.groups.json');
        fs.writeFileSync('build/typograf.groups.js', `export default ${txt};
`);
    },
    makeMdRules() {
        const Typograf = require('../build/typograf.js');
        const titles = require('../build/typograf.titles.json');
        const rules = Typograf.prototype._rules;
        
        function getRow(rule, i, locale) {
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
        
        function buildDoc(prefix) {
            langs.forEach(function(locale) {
                let text = '';

                rules.forEach(function(rule, i) {
                    text += getRow(rule, i + 1, locale);
                });

                processTemplate(
                    'docs/RULES' + prefix + '.' + locale + '.md',
                    'gulp/templates/RULES' + prefix + '.' + locale + '.md',
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
};
