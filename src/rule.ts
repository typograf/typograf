import { groupIndexes } from './groupIndexes';
import { addLocale } from './locale';
import { TypografRule, TypografRuleInternal } from './main';

export const DEFAULT_RULE_INDEX = 0;
export const DEFAULT_QUEUE_NAME = 'default';

const rules: TypografRuleInternal[] = [];
const innerRules: TypografRuleInternal[] = [];

export function addInnerRule(rule: TypografRule) {
    innerRules.push(prepareRule(rule));
}

export function addRule(rule: TypografRule) {
    const preparedRule = prepareRule(rule);

    addLocale(preparedRule.locale);

    rules.push(preparedRule);
}

export function sortRules(rules: TypografRuleInternal[]) {
    rules.sort((a, b) => a.index > b.index ? 1 : -1);
}

export function getRules() {
    const result = [...rules];

    sortRules(result);

    return result;
}

export function getInnerRules() {
    return [...innerRules];
}

function getRuleIndex(rule: TypografRule) {
    if (typeof rule.index === 'number') {
        return rule.index;
    }

    const [, group] = rule.name.split('/');

    let groupIndex = groupIndexes[group];
    if (typeof groupIndex === 'undefined') {
        groupIndex = DEFAULT_RULE_INDEX;
    }

    if (typeof rule.index === 'string') {
        return groupIndex + parseInt(rule.index, 10);
    }

    return groupIndex;
}

export function prepareRule(rule: TypografRule): TypografRuleInternal {
    const [locale, group, shortName] = rule.name.split('/');

    const preparedRule: TypografRuleInternal = {
        name: rule.name,
        shortName,
        handler: rule.handler,
        queue: rule.queue || DEFAULT_QUEUE_NAME,
        enabled: rule.disabled === true ? false : true,
        locale,
        group,
        index: getRuleIndex(rule),
        settings: rule.settings,
        live: rule.live,
        htmlAttrs: rule.htmlAttrs,
    };

    return preparedRule;
}