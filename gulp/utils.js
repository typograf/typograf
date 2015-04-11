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
            typografTitles = require('../dist/typograf.titles.json'),
            getRow = function(rule, i) {
                var title = typografTitles[rule.name].ru || typografTitles[rule.name].common;
                text += '| ' + (i + 1) + '. | [' +
                    rule.name + '](../src/rules/' + rule.name + '.js) | ' +
                    title + ' | ' +
                    rule.sortIndex + ' | ' +
                    (rule.queue || '') + ' | ' +
                    (rule.enabled !== false ? '✓' : '') + ' |\n';
            },
            processTemplate = function(file, templateFile) {
                var template = fs.readFileSync(templateFile).toString();
                fs.writeFileSync(file, template.replace(/{{content}}/, text));
            },
            text = '';

        Typograf.prototype._rules.sort(function(a, b) {
            if(a.name > b.name) {
                return 1;
            } else {
                return -1;
            }
        }).forEach(getRow);
        processTemplate('docs/RULES.md', 'gulp/templates/RULES.md');

        text = '';
        Typograf.prototype._rules.sort(function(a, b) {
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
        }).forEach(getRow);
        processTemplate('docs/RULES_SORTED.md', 'gulp/templates/RULES_SORTED.md');
    }
};
