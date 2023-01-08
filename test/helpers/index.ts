import { TypografExecutePrefs, TypografPrefs } from '../../src/main';
import Typograf from '../../src/typograf';

const mainTypograf = new Typograf({ locale: 'ru' });

export type TypografTest = [string, string, Partial<TypografPrefs>?];
export type TypografRuleSuit = [string, TypografTest[], Partial<TypografPrefs>?];

export function typografTest(name: string, tests: TypografTest[], mainPrefs?: TypografPrefs) {
    describe(name, () => {
        tests.forEach(item => {
            const [before, after, localPrefs] = item;
            const prefs = Object.assign({}, mainPrefs, localPrefs);

            if (!prefs.locale) {
                prefs.locale = ['ru', 'en-US'];
            }

            const localTypograf = new Typograf(prefs);
            const result = localTypograf.execute(before);

            it(item[0] + ': 1 step', () => {
                expect(result).toEqual(after);
            });

            it(item[0] + ': 2 step', () => {
                const result2 = localTypograf.execute(result);
                expect(result2).toEqual(after);
            });
        });
    });
}

export function executeInnerRule(name: string, text: string) {
    const innerRules = Typograf.getInnerRules();

    innerRules.forEach(rule => {
        if (rule.name === name) {
            const settings = rule.settings && rule.settings[rule.name] && {};
            text = rule.handler.call(rule, text, settings);
        }
    });

    return text;
}

export function getLocale(name: string, props: { locale?: string | string[]}) {
    return props ? props.locale : name.split(/\//)[0];
}

export function typografInnerRuleTest(data: TypografRuleSuit) {
    const [name, items] = data;
    it(name, () => {
        items.forEach(item => {
            const [before, after] = item;

            mainTypograf.enableRule(name);
            expect(executeInnerRule(name, before)).toEqual(after);
        });
    });
}

export function typografRuleTest(data: TypografRuleSuit) {
    const [name, items, props] = data;
    it(name, () => {
        items.forEach(item => {
            const [before, after, testSettings] = item;
            let enableRule = [name];
            if (testSettings && testSettings.enableRule) {
                enableRule = [].concat(enableRule, testSettings.enableRule);
            }

            const localTypograf = new Typograf({
                locale: 'ru',
                disableRule: '*',
                enableRule,
            });

            let result = localTypograf.execute(before, { locale: getLocale(name, props) });

            expect(result).toEqual(after);

            const rule = Typograf.getRule(name);
            if (rule && rule.enabled) {
                result = localTypograf.execute(result, { locale: getLocale(name, props) });

                expect(result).toEqual(after);
            }
        });
    });
}
