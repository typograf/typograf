var fs = require('fs');

var queue = {
    start: 1,
    'undefined': 2,
    end: 3
};

module.exports = {
    updateBowerVersion: function() {
        var pack = require('../package.json');
        var bower = require('../bower.json');
        if(pack.version !== bower.version) {
            bower.version = pack.version;
            fs.writeFileSync('../bower.json', JSON.stringify(bower, null, '  '));
        }
    },
    buildTitles: function() {
        var txt = fs.readFileSync('dist/typograf.titles.json');
        fs.writeFileSync('dist/typograf.titles.js', 'Typograf.prototype.titles = ' + txt + ';\n');
    },
    makeMdRules: function() {
        var Typograf = require('../dist/typograf.js'),
            titles = require('../dist/typograf.titles.json'),
            rules = Typograf.prototype._rules,
            getRow = function(rule, i, lang) {
                var title = titles[rule.name][lang] || titles[rule.name].common;
                return '| ' + i + '. | [' +
                    rule.name + '](../src/rules/' + rule.name + '.js) | ' +
                    title + ' | ' +
                    rule.sortIndex + ' | ' +
                    (rule.queue || '') + ' | ' +
                    (rule.enabled !== false ? '✓' : '') + ' |\n';
            },
            processTemplate = function(file, templateFile, text) {
                var template = fs.readFileSync(templateFile).toString();
                fs.writeFileSync(file, template.replace(/{{content}}/, text));
            },
            buildDoc = function() {
                Typograf._langs.forEach(function(lang) {
                    var text = '';

                    rules.forEach(function(rule, i) {
                        text += getRow(rule, i + 1, lang);
                    });

                    processTemplate('docs/RULES.' + lang + '.md', 'gulp/templates/RULES.' + lang + '.md', text);
                });
            };

        rules.sort(function(a, b) {
            if(a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        });

        buildDoc();

        rules.sort(function(a, b) {
            var queueA = queue[a.queue],
                queueB = queue[b.queue];
            if(queueA === queueB) {
                if(a.sortIndex > b.sortIndex) {
                    return 1;
                } else if(a.sortIndex < b.sortIndex) {
                    return -1;
                } else {
                    return 0;
                }
            } else if(queueA > queueB) {
                return 1;
            } else {
                return -1;
            }
        });

        buildDoc();
    }
};
