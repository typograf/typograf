import fs from 'fs';
import Typograf from '../build/typograf.js';

const rules = Typograf.getRules();

const titles = JSON.parse(
    fs.readFileSync('./build/typograf.titles.json', 'utf-8')
);

const queue = {
    'start': 0,
    'utf': 1,
    'default': 3,
    'entity': 5,
    'end': 10
};

const langs = ['ru', 'en-US'];

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

function getRow(titles, rule, i, locale) {
    const title = titles[rule.name][locale] || titles[rule.name].common;
    return '| ' + i + '. | [' +
        rule.name + '](../src/rules/' + rule.name + '.ts) | ' +
        title + ' | ' +
        rule.index + ' | ' +
        (rule.queue || '') + ' | ' +
        (rule.enabled === false || rule.disabled === true ? '' : '✓') + ' |\n';
}

function processTemplate(file, templateFile, text) {
    const template = fs.readFileSync(templateFile).toString();
    fs.writeFileSync(file, template.replace(/{{content}}/, text));
}

function buildDoc(prefix) {
    langs.forEach((locale) => {
        let text = '';

        rules.forEach((rule, i) => {
            text += getRow(titles, rule, i + 1, locale);
        });

        const postFix = `${prefix}.${locale}.md`;
        processTemplate(
            `docs/RULES${postFix}`,
            `tools/templates/RULES${postFix}`,
            text
        );
    });
}

rules.sort((a, b) => a.name > b.name ? 1 : -1);

buildDoc('');

rules.sort((a, b) => {
    const queueA = queue[a.queue || 'default'];
    const queueB = queue[b.queue || 'default'];

    const queueIndexA = getQueueIndex(queueA);
    const queueIndexB = getQueueIndex(queueB);

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
