import type { TypografContext } from '../main';
import { visibleEntities } from './visible';
import { invisibleEntities } from './invisible';

export type Entity = [string, number];

export type TypografHtmlEntityType = 'name' | 'digit' | 'default';

interface HtmlEntityInfo {
    name: string;
    nameEntity: string;
    digitEntity: string;
    utf: string;
    reName: RegExp;
    reUtf: RegExp;
}

class HtmlEntities {
    private entities: HtmlEntityInfo[];
    private invisibleEntities: HtmlEntityInfo[];

    private entitiesByName: Record<string, HtmlEntityInfo>;
    private entitiesByNameEntity: Record<string, HtmlEntityInfo>;
    private entitiesByDigitEntity: Record<string, HtmlEntityInfo>;
    private entitiesByUtf: Record<string, HtmlEntityInfo>;

    constructor() {
        this.entities = this.prepareEntities([...visibleEntities, ...invisibleEntities]);

        this.entitiesByName = {};
        this.entitiesByNameEntity = {};
        this.entitiesByDigitEntity = {};
        this.entitiesByUtf = {};

        this.entities.forEach(entity => {
            this.entitiesByName[entity.name] = entity;
            this.entitiesByNameEntity[entity.nameEntity] = entity;
            this.entitiesByDigitEntity[entity.digitEntity] = entity;
            this.entitiesByUtf[entity.utf] = entity;
        });

        this.invisibleEntities = this.prepareEntities(invisibleEntities);
    }

    /**
     * Entities as name or digit to UTF-8.
     */
    public toUtf(context: TypografContext) {
        if (context.text.search(/&#/) !== -1) {
            context.text = this.decHexToUtf(context.text);
        }

        if (context.text.search(/&[a-z]/i) !== -1) {
            // 2 - min length of entity without & and ;. Example: &DD;
            // 31 - max length of entity without & and ;. Example: &CounterClockwiseContourIntegral;
            context.text = context.text.replace(/&[a-z\d]{2,31};/gi, (key: string) => {
                const entity = this.entitiesByNameEntity[key];
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
        let entities = this.entities;

        if (type === 'name' || type === 'digit') {
            if (params.onlyInvisible || params.list) {
                entities = [];

                if (params.onlyInvisible) {
                    entities = entities.concat(this.invisibleEntities);
                }

                if (params.list) {
                    entities = entities.concat(this.prepareListParam(params.list));
                }
            }

            const entityType = type === 'name' ? 'nameEntity' : 'digitEntity';
            context.text = this.restoreEntitiesByIndex(
                context.text,
                entityType,
                entities
            );
        }
    }

    /**
     * Get a entity by utf using the type.
     */
    public getByUtf(symbol: string, type?: TypografHtmlEntityType): HtmlEntityInfo | string | undefined {
        let result: HtmlEntityInfo | string | undefined;

        switch (type) {
            case 'digit':
                result = this.entitiesByDigitEntity[symbol];
                break;
            case 'name':
                result = this.entitiesByNameEntity[symbol];
                break;
            default:
                result = symbol;
                break;
        }

        return result;
    }

    private prepareEntities(entities: [string, number][]): HtmlEntityInfo[] {
        const result: HtmlEntityInfo[] = [];

        entities.forEach(entity => {
            const [name, digit] = entity;
            const utf = String.fromCharCode(digit);

            result.push({
                name,
                nameEntity: '&' + name + ';', // &nbsp;
                digitEntity: '&#' + digit + ';', // &#160;
                utf, // \u00A0
                reName: new RegExp('&' + name + ';', 'g'),
                reUtf: new RegExp(utf, 'g')
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

    private restoreEntitiesByIndex(text: string, type: 'nameEntity' | 'digitEntity', entities: HtmlEntityInfo[]) {
        entities.forEach(entity => {
            text = text.replace(entity.reUtf, entity[type]);
        });

        return text;
    }
}

export const htmlEntities = new HtmlEntities();
