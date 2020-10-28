import visibleEntities from './visible';
import invisibleEntities from './invisible';
import { Context } from '../types';

interface HTMLEntity {
    name: string;
    nameEntity: string;
    digitEntity: string;
    utf: string;
    reName: RegExp;
    reUtf: RegExp;
}

class HtmlEntities {
    private entities: HTMLEntity[];
    private invisibleEntities: HTMLEntity[];
    private entitiesByName: Record<string, HTMLEntity> = {};
    private entitiesByNameEntity: Record<string, HTMLEntity> = {};
    private entitiesByDigitEntity: Record<string, HTMLEntity> = {};
    private entitiesByUtf: Record<string, HTMLEntity> = {};

    constructor() {
        this.entities = this.prepareEntities([...visibleEntities, ...invisibleEntities]);

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
    toUtf(context: Context) {
        if (context.text.search(/&#/) !== -1) {
            context.text = this.decHexToUtf(context.text);
        }

        if (context.text.search(/&[a-z]/i) !== -1) {
            // 2 - min length of entity without & and ;. Example: &DD;
            // 31 - max length of entity without & and ;. Example: &CounterClockwiseContourIntegral;
            context.text = context.text.replace(/&[a-z\d]{2,31};/gi, key => {
                const entity = this.entitiesByNameEntity[key];
                return entity ? entity.utf : key;
            });
        }
    }

    /**
     * Entities in decimal or hexadecimal form to UTF-8.
     */
    decHexToUtf(text: string) {
        return text
            .replace(/&#(\d{1,6});/gi, ($0, $1: string) => {
                return String.fromCharCode(parseInt($1, 10));
            })
            .replace(/&#x([\da-f]{1,6});/gi, ($0, $1: string) => {
                return String.fromCharCode(parseInt($1, 16));
            });
    }

    /**
     * Restore HTML entities in text.
     */
    restore(context: Context) {
        const { type } = context.options.htmlEntity;
        const isName = type === 'name';
        const isDigit = type === 'digit';

        if (isName || isDigit) {
            context.text = this.restoreEntitiesByIndex(
                context.text,
                isName ? 'nameEntity' : 'digitEntity',
                this.getPrefsEntities(context)
            );
        }
    }

    private getPrefsEntities(context: Context) {
        const { onlyInvisible, list } = context.options.htmlEntity;
        let { entities } = this;

        if (onlyInvisible || list) {
            entities = [];

            if (onlyInvisible) {
                entities = entities.concat(this.invisibleEntities);
            }

            if (list) {
                entities = entities.concat(this.prepareListParam(list));
            }
        }

        return entities;
    }

    private prepareEntities(entities: [string, number][]): HTMLEntity[] {
        return entities.map(entity => {
            const [name, digit] = entity;
            const utf = String.fromCharCode(digit);

            return {
                name,
                nameEntity: '&' + name + ';', // &nbsp;
                digitEntity: '&#' + digit + ';', // &#160;
                utf, // \u00A0
                reName: new RegExp('&' + name + ';', 'g'),
                reUtf: new RegExp(utf, 'g')
            };
        });
    }

    private prepareListParam(list: string[]) {
        const result: HTMLEntity[] = [];

        list.forEach(name => {
            const entity = this.entitiesByName[name];

            if (entity) {
                result.push(entity);
            }
        });

        return result;
    }

    private restoreEntitiesByIndex(text: string, type: 'nameEntity' | 'digitEntity', entities: HTMLEntity[]) {
        entities.forEach(entity => {
            text = text.replace(entity.reUtf, entity[type]);
        });

        return text;
    }
}

export default new HtmlEntities();
