import HtmlEntities from './htmlEntities/index';
import { prepareLocale } from './helpers/locale';
import SafeTags from './safeTags';

import { replaceNbsp, isHTML, removeCR, fixLineEnding } from './helpers/string';
import { deepCopy } from './helpers/object';
import { COMMON_LOCALE, privateSeparateLabel } from './consts';
import { Context, Options, PreparedOptions, Rule, PreparedRule, Queue } from './types';
import { sortRules, prepareRule, getSettingsRule } from './helpers/rule';

export default class Typograf {
    static version = '__version__';

    static groups: Array<{ name: string; title: { ru: string; 'en-US': string; };}> = [];
    static titles: Record<string, Record<string, string>> = {};

    static data: Record<string, any> = {};

    /**
     * Get data for use in rules.
     */
    static getData<T>(key: string): T {
        return this.data[key];
    }

    /**
     * Set data for use in rules.
     */
    static setData(key: string | Record<string, unknown>, value?: string | number): void {
        if (typeof key === 'string') {
            this.addLocale(key);
            this.data[key] = value;
        } else if (typeof key === 'object') {
            Object.keys(key).forEach((k) => {
                this.addLocale(k);
                this.data[k] = key[k];
            });
        }
    }

    static locales: string[] = [];

    /**
     * Add a locale.
     */
    static addLocale(locale: string): void {
        const code = (locale || '').split('/')[0];

        if (code && code !== COMMON_LOCALE && !this.hasLocale(code)) {
            this.locales.push(code);
            this.locales.sort();
        }
    }

    /**
     * Get locales.
     */
    static getLocales(): string[] {
        return this.locales;
    }

    /**
     * Has a locale.
     */
    static hasLocale(locale: string): boolean {
        return locale === COMMON_LOCALE || this.locales.indexOf(locale) !== -1;
    }

    static rules: PreparedRule[] = [];
    static innerRules: PreparedRule[] = [];

    /**
     * Add a rule.
     */
    static addRule(rule: Rule): typeof Typograf {
        const preparedRule = prepareRule(rule);

        this.addLocale(preparedRule.locale);

        Typograf.rules.push(preparedRule);

        sortRules(Typograf.rules);

        return this;
    }

    /**
     * Add rules.
     */
    static addRules(rules: Rule[]): typeof Typograf {
        rules.forEach((item) => this.addRule(item));

        return this;
    }

    /**
     * Add internal rule.
     * Internal rules are executed before main.
     */
    static addInnerRule(rule: Rule): typeof Typograf {
        const prparedRule = prepareRule(rule);

        Typograf.innerRules.push(prparedRule);

        return this;
    }

    /**
     * Add internal rules.
     * Internal rules are executed before main.
     */
    static addInnerRules(rules: Rule[]): typeof Typograf {
        rules.forEach(item => this.addInnerRule(item));

        return this;
    }

    safeTags: SafeTags;

    onBeforeRule?: (ruleName: PreparedRule, text: string, context: Context) => void;
    onAfterRule?: (ruleName: PreparedRule, text: string, context: Context) => void;

    private rules: PreparedRule[];
    private rulesByQueues: Record<string, PreparedRule[]>;

    private innerRules: PreparedRule[];
    private innerRulesByQueues: Record<string, PreparedRule[]>;

    private options: PreparedOptions;
    private separatePartsTags: string[];

    private enabledRules: Record<string, boolean>;
    private settings: Record<string, Record<string, any> | undefined>;

    constructor(options?: Options) {
        options = typeof options === 'object' ? options : {};

        this.options = {
            ...options,
            locale: prepareLocale(options.locale),
            htmlEntity: options.htmlEntity || { type: 'default'},
        };

        this.safeTags = new SafeTags();

        this.settings = {};
        this.enabledRules = {};

        this.innerRulesByQueues = {};
        this.innerRules = [ ...Typograf.innerRules ];
        this.innerRules.forEach(rule => {
            const { queue } = rule;
            this.innerRulesByQueues[queue] = this.innerRulesByQueues[queue] ?? [];
            this.innerRulesByQueues[queue].push(rule);
        });

        this.rulesByQueues = {};
        this.rules = [ ...Typograf.rules ];
        this.rules.forEach(rule => {
            const { name, queue } = rule;

            this.settings[name] = getSettingsRule(rule);
            this.enabledRules[name] = rule.enabled;

            this.rulesByQueues[queue] = this.rulesByQueues[queue] ?? [];
            this.rulesByQueues[queue].push(rule);
        });

        this.options.disableRule && this.disableRule(this.options.disableRule);
        this.options.enableRule && this.enableRule(this.options.enableRule);

        this.separatePartsTags = [
            'title',
            'p',
            'h[1-6]',
            'select',
            'legend'
        ];
    }

    /**
     * Execute typographical rules for text.
     */
    execute(text?: string | number | null, options?: Options): string {
        if (!text && text !== 0) { return ''; }

        text = '' + text;

        const context = this.prepareContext(text);

        this.prepareOptions(context, options || {});

        return this.process(context);
    }

    private prepareContext(text: string): Context {
        const { options, safeTags} = this;
        const contextOptions = deepCopy(options);

        return {
            text,
            isHTML: isHTML(text),
            options: contextOptions,
            getData: (key: string) => {
                return Typograf.getData(contextOptions.locale[0] + '/' + key);
            },
            getCharData() {
                return contextOptions.locale.map(item => {
                    return Typograf.getData(item + '/char');
                }).join('');
            },
            safeTags,
        };
    }

    private prepareOptions(context: Context, options: Options) {
        options = options || {};

        const contextOptions = context.options;

        contextOptions.htmlEntity = options.htmlEntity ?? contextOptions.htmlEntity;
        contextOptions.lineEnding = options.lineEnding ?? contextOptions.lineEnding;
        contextOptions.ruleFilter = options.ruleFilter ?? contextOptions.ruleFilter;
        contextOptions.processingSeparateParts = options.processingSeparateParts ?? contextOptions.processingSeparateParts;

        contextOptions.locale = prepareLocale(options.locale ?? this.options.locale);

        const locale = contextOptions.locale;
        const locale0 = locale[0];

        if (!locale.length || !locale0) {
            throw Error('Not defined the property "locale".');
        }

        if (!Typograf.hasLocale(locale0)) {
            throw Error(`"${locale0}" is not supported locale.`);
        }
    }

    private splitBySeparateParts(context: Context) {
        if (!context.isHTML || context.options.processingSeparateParts === false) {
            return [ context.text ];
        }

        const text = [];
        const reTags = new RegExp('<(' + this.separatePartsTags.join('|') + ')(\\s[^>]*?)?>[^]*?</\\1>', 'gi');

        let position = 0;

        context.text.replace(reTags, ($0, $1, $2, offset: number) => {
            if (position !== offset) {
                text.push(
                    (position ? privateSeparateLabel : '') +
                    context.text.slice(position, offset) +
                    privateSeparateLabel
                );
            }

            text.push($0);

            position = offset + $0.length;

            return $0;
        });

        text.push(
            position ?
                (privateSeparateLabel + context.text.slice(position, context.text.length)) :
                context.text
        );

        return text;
    }

    private process(context: Context) {
        context.text = removeCR(context.text);

        this.executeRules(context, 'start');

        this.safeTags.hide(context, 'own');
        this.executeRules(context, 'hide-safe-tags-own');

        this.safeTags.hide(context, 'html');
        this.executeRules(context, 'hide-safe-tags-html');

        const isRootHTML = context.isHTML;
        const re = new RegExp(privateSeparateLabel, 'g');

        context.text = this.splitBySeparateParts(context).map((item) => {
            context.text = item;
            context.isHTML = isHTML(item);
            this.safeTags.hideHTMLTags(context);

            this.safeTags.hide(context, 'url');
            this.executeRules(context, 'hide-safe-tags-url');

            this.executeRules(context, 'hide-safe-tags');

            HtmlEntities.toUtf(context);

            if (this.options.live) {
                context.text = replaceNbsp(context.text);
            }

            this.executeRules(context, 'utf');

            this.executeRules(context, 'default');

            HtmlEntities.restore(context);

            this.executeRules(context, 'html-entities');

            this.safeTags.show(context, 'url');
            this.executeRules(context, 'show-safe-tags-url');

            return context.text.replace(re, '');
        }).join('');

        context.isHTML = isRootHTML;

        this.safeTags.show(context, 'html');
        this.executeRules(context, 'show-safe-tags-html');

        this.safeTags.show(context, 'own');
        this.executeRules(context, 'show-safe-tags-own');

        this.executeRules(context, 'end');

        return fixLineEnding(context.text, context.options.lineEnding);
    }

    /**
     * Get a setting.
     */
    getSetting<T>(ruleName: string, setting: string): T {
        const ruleSettings = this.settings[ruleName];

        return ruleSettings && ruleSettings[setting];
    }

    /**
     * Set a setting.
     */
    setSetting<T>(ruleName: string, setting: string, value: T): Typograf {
        const ruleSettings: Record<string, T | undefined> = this.settings[ruleName] || {};

        this.settings[ruleName] = ruleSettings;

        ruleSettings[setting] = value;

        return this;
    }

    /**
     * Is enabled a rule.
     */
    isEnabledRule(ruleName: string): boolean {
        return Boolean(this.enabledRules[ruleName]);
    }

    /**
     * Is disabled a rule.
     */
    isDisabledRule(ruleName: string): boolean {
        return !this.enabledRules[ruleName];
    }

    /**
     * Enable a rule.
     */
    enableRule(ruleName: string | string[]): Typograf {
        return this.enable(ruleName, true);
    }

    /**
     * Disable a rule.
     */
    disableRule(ruleName: string | string[]): Typograf {
        return this.enable(ruleName, false);
    }

    /**
     * Add safe tag.
     *
     * @example
     * // var t = new Typograf({locale: 'ru'});
     * // t.addSafeTag('<mytag>', '</mytag>');
     * // t.addSafeTag('<mytag>', '</mytag>', '.*?');
     * // t.addSafeTag(/<mytag>.*?</mytag>/gi);
     */
    addSafeTag(startTag: string | RegExp, ...params: string[]): Typograf {
        const tag = startTag instanceof RegExp ? startTag : [startTag, ...params];

        this.safeTags.add(tag);

        return this;
    }

    executeRules(context: Context, queue: Queue): void {
        const rules = this.rulesByQueues[queue];
        const innerRules = this.innerRulesByQueues[queue];

        innerRules && innerRules.forEach(rule => {
            this.ruleIterator(context, rule);
        });

        rules && rules.forEach(rule => {
            this.ruleIterator(context, rule);
        });
    }

    ruleIterator(context: Context, rule: PreparedRule): void {
        const rlocale = rule.locale;
        const live = this.options.live;

        if ((live === true && rule.live === false) || (live === false && rule.live === true)) {
            return;
        }

        if ((rlocale === COMMON_LOCALE || rlocale === context.options.locale[0]) && this.isEnabledRule(rule.name)) {
            if (context.options.ruleFilter && !context.options.ruleFilter(rule)) {
                return;
            }

            this.onBeforeRule && this.onBeforeRule(rule, context.text, context);
            context.text = rule.handler.call(this, context.text, this.settings[rule.name], context);
            this.onAfterRule && this.onAfterRule(rule, context.text, context);
        }
    }

    getRule(ruleName: string): Rule | null {
        let rule = null;

        this.rules.some(item => {
            if (item.name === ruleName) {
                rule = item;
                return true;
            }

            return false;
        });

        return rule;
    }

    private enable(rule: string | string[], enabled: boolean): Typograf {
        if (Array.isArray(rule)) {
            rule.forEach(el => {
                this.enableByMask(el, enabled);
            });
        } else {
            this.enableByMask(rule, enabled);
        }

        return this;
    }

    private enableByMask(rule: string, enabled: boolean): void {
        if (!rule) { return; }

        if (rule.search(/\*/) !== -1) {
            const re = new RegExp(rule
                .replace(/\//g, '\\/')
                .replace(/\*/g, '.*'));

            this.rules.forEach(item => {
                if (re.test(item.name)) {
                    this.enabledRules[item.name] = enabled;
                }
            });
        } else {
            this.enabledRules[rule] = enabled;
        }
    }
}
