import groupIndexes from '../groupIndexes';
import { deepCopy } from '../helpers/object';
import { PreparedRule, Rule } from '../types';

export function sortRules(rules: PreparedRule[]): void {
    rules.sort((a, b) => a.index > b.index ? 1 : -1);
}

export function prepareRule(rule: Rule): PreparedRule {
    const [locale, group, shortName] = rule.name.split('/');
    const index = getRuleIndex(rule, group);
    const preparedRule: PreparedRule = {
        ...rule,
        index,
        enabled: rule.disabled === true ? false : true,
        locale,
        group,
        shortName,
        queue: rule.queue || 'default',
    };

    return preparedRule;
}

export function getRuleIndex(rule: Rule, group: string): number {
    const index = rule.index;
    const groupIndex = groupIndexes[group];

    if (typeof index === 'undefined') {
        return groupIndex;
    }

    if (typeof index === 'string') {
        return (groupIndex || 0) + parseInt(index, 10);
    }

    return index;
}

export function getSettingsRule(rule: PreparedRule): Record<string, unknown> {
    if (typeof rule.settings === 'function') {
        return rule.settings(rule);
    }

    return deepCopy(rule.settings);
}

