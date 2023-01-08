import type { TypografLineEnding, TypografExecutePrefs, TypografPrefs, TypografPrefsInternal } from './main';
import { prepareLocale } from './locale';

export function prepareHtmlEntity(htmlEntity?: Partial<TypografPrefsInternal['htmlEntity']>): TypografPrefsInternal['htmlEntity'] {
    const result = {
        type: htmlEntity?.type || 'default',
        list: htmlEntity?.list,
        onlyInvisible: Boolean(htmlEntity?.onlyInvisible),
    };

    return result;
}

export function prepareLineEnding(lineEnding?: TypografLineEnding) {
    return lineEnding || 'LF';
}

export function prepareProcessingSeparateParts(value?: boolean) {
    return value === false ? false : true;
}

export function preparePrefs(prefs: TypografPrefs): TypografPrefsInternal {
    const result: TypografPrefsInternal = {
        locale: prepareLocale(prefs.locale),
        lineEnding: prepareLineEnding(prefs.lineEnding),
        live: Boolean(prefs.live),
        ruleFilter: prefs.ruleFilter,
        enableRule: prefs.enableRule,
        disableRule: prefs.disableRule,
        processingSeparateParts: prefs.processingSeparateParts,
        htmlEntity: prepareHtmlEntity(prefs.htmlEntity),
    };

    return result;
}

export function prepareContextPrefs(prefs: TypografPrefsInternal, executePrefs?: TypografExecutePrefs) {
    const result: TypografPrefsInternal = {
        ...prefs,
    };

    if (!executePrefs) {
        return result;
    }

    if ('locale' in executePrefs) {
        result.locale = prepareLocale(executePrefs.locale);
    }

    if ('htmlEntity' in executePrefs) {
        result.htmlEntity = prepareHtmlEntity(executePrefs.htmlEntity);
    }

    if ('lineEnding' in executePrefs) {
        result.lineEnding = prepareLineEnding(executePrefs.lineEnding);
    }

    if ('processingSeparateParts' in executePrefs) {
        result.processingSeparateParts = executePrefs.processingSeparateParts;
    }

    if ('ruleFilter' in executePrefs) {
        result.ruleFilter = executePrefs.ruleFilter;
    }

    return result;
}
