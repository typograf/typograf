import { assert } from 'chai';
import Typograf from '../../build/typograf';

const t = new Typograf({locale: 'ru'});

export function typografTest(name, tests, mainPrefs) {
    describe(name, function() {
        tests.forEach(function(item) {
            it(item[0], function() {
                const [before, after, localPrefs] = item;
                const prefs = Object.assign({}, mainPrefs, localPrefs);

                if (!prefs.locale) {
                    prefs.locale = ['ru', 'en-US'];
                }

                const tp = new Typograf(prefs);
                const result = tp.execute(before, prefs);
                assert.equal(result, after, 'first step');

                const result2 = tp.execute(result, prefs);
                assert.equal(result2, after, 'second step');
            });
        });
    });
}

export function executeInnerRule(name, text) {
    const rules = t._innerRules;

    rules.forEach(function(f) {
        if (f.name === name) {
            text = f.handler.call(t, text, t._settings[f.name]);
        }
    });

    return text;
}

export function getLocale(name, props) {
    return props ? props.locale : name.split(/\//)[0];
}

export function typografInnerRuleTest(data) {
    const [name, items] = data;
    it(name, function() {
        items.forEach(function(item) {
            const [before, after] = item;

            t.enableRule(name);
            assert.equal(executeInnerRule(name, before), after, before + ' → ' + after);
        });
    });
}

export function typografRuleTest(data) {
    const [name, items, props] = data;
    it(name, function() {
        items.forEach(function(item) {
            const [before, after, testSettings] = item;
            const itTypograf = new Typograf({
                disableRule: '*',
                enableRule: [].concat(name, testSettings && testSettings.enableRule)
            });
            let result = itTypograf.execute(before, {locale: getLocale(name, props)});

            assert.equal(result, after, before + ' → ' + after);

            if (!itTypograf._getRule(name).disabled) {
                result = itTypograf.execute(result, {locale: getLocale(name, props)});

                assert.equal(result, after, before + ' → ' + after);
            }
        });
    });
}
