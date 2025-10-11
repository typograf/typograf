import type { TypografContext } from '../main';
import { visibleEntities } from './visible';
import { invisibleEntities } from './invisible';

export type Entity = [string, number];

export type TypografHtmlEntityType = 'name' | 'digit' | 'js' | 'default';

interface HtmlEntityInfo {
    name: string;
    utf: string;
    reUtf: RegExp;
    type: {
        name: string;
        digit: string;
        js: string;
    };
}

class HtmlEntities {
    private entities: HtmlEntityInfo[];
    private invisibleEntities: HtmlEntityInfo[];

    private entitiesByName: Record<string, HtmlEntityInfo>;
    private entitiesByNameEntity: Record<string, HtmlEntityInfo>;
    private entitiesByJsEntity: Record<string, HtmlEntityInfo>;
    private entitiesByDigitEntity: Record<string, HtmlEntityInfo>;
    private entitiesByUtf: Record<string, HtmlEntityInfo>;

    constructor() {
        this.entities = this.prepareEntities([...visibleEntities, ...invisibleEntities]);

        this.entitiesByName = {};
        this.entitiesByNameEntity = {};
        this.entitiesByDigitEntity = {};
        this.entitiesByJsEntity = {};
        this.entitiesByUtf = {};

        this.entities.forEach(entity => {
            this.entitiesByName[entity.name] = entity;
            this.entitiesByNameEntity[entity.type.name] = entity;
            this.entitiesByDigitEntity[entity.type.digit] = entity;
            this.entitiesByJsEntity[entity.type.js] = entity;
            this.entitiesByUtf[entity.utf] = entity;
        });

        this.invisibleEntities = this.prepareEntities(invisibleEntities);
    }

    /**
     * Entities as name or digit to UTF-8.
     */
    public toUtf(context: TypografContext) {
        // &#160;
        if (context.text.search(/&#/) !== -1) {
            context.text = this.decHexToUtf(context.text);
        }

        // &nbsp;
        if (context.text.search(/&[a-z]/i) !== -1) {
            // 2 - min length of entity without & and ;. Example: &DD;
            // 31 - max length of entity without & and ;. Example: &CounterClockwiseContourIntegral;
            context.text = context.text.replace(/&[a-z\d]{2,31};/gi, (key: string) => {
                const entity = this.entitiesByNameEntity[key];
                return entity ? entity.utf : key;
            });
        }

        // \u00a0
        if (context.text.search(/\\u[\da-f]/i) !== -1) {
            context.text = context.text.replace(/\\u[\da-f]{4};/gi, (key: string) => {
                const entity = this.entitiesByJsEntity[key.toLowerCase()];
                return entity ? entity.utf : key;
            });
        }
    }

    /**
     * Entities in decimal or hexadecimal form to UTF-8.
     */
    public decHexToUtf(text: string) {
        return text
            .replace(/&#(\d{1,6});/gi, function($0, $1) {
                return String.fromCharCode(parseInt($1, 10));
            })
            .replace(/&#x([\da-f]{1,6});/gi, function($0, $1) {
                return String.fromCharCode(parseInt($1, 16));
            });
    }

    /**
     * Restore HTML entities in text.
     */
    public restore(context: TypografContext) {
        const params = context.prefs.htmlEntity;
        const type = params.type;

        if (type === 'default') {
            return;
        }

        let entities = this.entities;

        if (params.onlyInvisible || params.list) {
            entities = [];

            if (params.onlyInvisible) {
                entities = entities.concat(this.invisibleEntities);
            }

            if (params.list) {
                entities = entities.concat(this.prepareListParam(params.list));
            }
        }

        context.text = this.restoreEntitiesByIndex(
            context.text,
            type,
            entities
        );
    }

    /**
     * Get a entity by utf using the type.
     */
    public getByUtf(symbol: string, type?: TypografHtmlEntityType): HtmlEntityInfo | string | undefined {
        switch (type) {
            case 'digit':
                return this.entitiesByDigitEntity[symbol];
            case 'name':
                return this.entitiesByNameEntity[symbol];
            case 'js':
                return this.entitiesByJsEntity[symbol];
        }

        return symbol;
    }

    private prepareEntities(entities: [string, number][]): HtmlEntityInfo[] {
        const result: HtmlEntityInfo[] = [];

        entities.forEach(entity => {
            const [name, digit] = entity;
            const utf = String.fromCharCode(digit);

            result.push({
                name,
                utf, // \u00a0
                reUtf: new RegExp(utf, 'g'),
                type: {
                    name: '&' + name + ';', // &nbsp;
                    digit: '&#' + digit + ';', // &#160;
                    js: '\\u' + ('0000' + digit.toString(16)).slice(-4), // \u00a0
                },
            });
        });

        return result;
    }

    private prepareListParam(list: string[]) {
        const result: HtmlEntityInfo[] = [];

        list.forEach(name => {
            const entity = this.entitiesByName[name];
            if (entity) {
                result.push(entity);
            }
        });

        return result;
    }

    private restoreEntitiesByIndex(text: string, type: TypografHtmlEntityType, entities: HtmlEntityInfo[]) {
        entities.forEach(entity => {
            text = text.replace(entity.reUtf, entity.type[type]);
        });

        return text;
    }
}

export const htmlEntities = new HtmlEntities();
