var fs = require('fs');
var queue = {
    'start': 0,
    'utf': 1,
    'default': 3,
    'entity': 5,
    'end': 10
};

module.exports = {
    updateBowerVersion: function() {
        var pack = require('../package.json'),
            bower = require('../bower.json');
        if(pack.version !== bower.version) {
            bower.version = pack.version;
            fs.writeFileSync('./bower.json', JSON.stringify(bower, null, '  '));
        }
    },
    buildTitles: function() {
        var txt = fs.readFileSync('build/typograf.titles.json');
        fs.writeFileSync('build/typograf.titles.js', 'Typograf.titles = ' + txt + ';\n');
    },
    buildGroups: function() {
        var txt = fs.readFileSync('build/typograf.groups.json');
        fs.writeFileSync('build/typograf.groups.js', 'Typograf.groups = ' + txt + ';\n');
    },
    makeMdRules: function() {
        var Typograf = require('../build/typograf.js'),
            titles = require('../build/typograf.titles.json'),
            rules = Typograf.prototype._rules,
            getRow = function(rule, i, lang) {
                var title = titles[rule.name][lang] || titles[rule.name].common;
                return '| ' + i + '. | [' +
                    rule.name + '](../src/rules/' + rule.name + '.js) | ' +
                    title + ' | ' +
                    rule._index + ' | ' +
                    (rule.queue || '') + ' | ' +
                    (rule.enabled === false || rule.disabled === true ? '' : '✓') + ' |\n';
            },
            processTemplate = function(file, templateFile, text) {
                var template = fs.readFileSync(templateFile).toString();
                fs.writeFileSync(file, template.replace(/{{content}}/, text));
            },
            buildDoc = function(prefix) {
                Typograf._langs.forEach(function(lang) {
                    var text = '';

                    rules.forEach(function(rule, i) {
                        text += getRow(rule, i + 1, lang);
                    });

                    processTemplate(
                        'docs/RULES' + prefix + '.' + lang + '.md',
                        'gulp/templates/RULES' + prefix + '.' + lang + '.md',
                        text
                    );
                });
            };

        rules.sort(function(a, b) {
            if(a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        });

        buildDoc('');

        rules.sort(function(a, b) {
            var queueA = queue[a.queue || 'default'],
                queueB = queue[b.queue || 'default'];
            if(queueA === queueB) {
                if(a._index > b._index) {
                    return 1;
                } else if(a._index < b._index) {
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

        buildDoc('_SORTED');
    }
};
