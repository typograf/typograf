import visibleEntities from './visible';
import invisibleEntities from './invisible';

class HtmlEntities {
    constructor() {
        this._entities = this._prepareEntities([].concat(visibleEntities, invisibleEntities));

        this._entitiesByName = {};
        this._entitiesByNameEntity = {};
        this._entitiesByDigitEntity = {};
        this._entitiesByUtf = {};

        this._entities.forEach(function(entity) {
            this._entitiesByName[entity.name] = entity;
            this._entitiesByNameEntity[entity.nameEntity] = entity;
            this._entitiesByDigitEntity[entity.digitEntity] = entity;
            this._entitiesByUtf[entity.utf] = entity;
        }, this);

        this._invisibleEntities = this._prepareEntities(invisibleEntities);
    }

    /**
     * Entities as name or digit to UTF-8.
     *
     * @param {Object} context
     */
    toUtf(context) {
        if (context.text.search(/&#/) !== -1) {
            context.text = this.decHexToUtf(context.text);
        }

        if (context.text.search(/&[a-z]/i) !== -1) {
            // 2 - min length of entity without & and ;. Example: &DD;
            // 31 - max length of entity without & and ;. Example: &CounterClockwiseContourIntegral;
            context.text = context.text.replace(/&[a-z\d]{2,31};/gi, key => {
                const entity = this._entitiesByNameEntity[key];
                return entity ? entity.utf : key;
            });
        }
    }

    /**
     * Entities in decimal or hexadecimal form to UTF-8.
     *
     * @param {string} text
     * @returns {string}
     */
    decHexToUtf(text) {
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
     *
     * @param {Object} context
     */
    restore(context) {
        const params = context.prefs.htmlEntity;
        const type = params.type;
        let entities = this._entities;

        if (type === 'name' || type === 'digit') {
            if (params.onlyInvisible || params.list) {
                entities = [];

                if (params.onlyInvisible) {
                    entities = entities.concat(this._invisibleEntities);
                }

                if (params.list) {
                    entities = entities.concat(this._prepareListParam(params.list));
                }
            }

            context.text = this._restoreEntitiesByIndex(
                context.text,
                type + 'Entity',
                entities
            );
        }
    }

    /**
     * Get a entity by utf using the type.
     *
     * @param {string} symbol
     * @param {string} [type]
     * @returns {string}
     */
    getByUtf(symbol, type) {
        let result = '';

        switch (type) {
            case 'digit':
                result = this._entitiesByDigitEntity[symbol];
                break;
            case 'name':
                result = this._entitiesByNameEntity[symbol];
                break;
            default:
                result = symbol;
                break;
        }

        return result;
    }

    _prepareEntities(entities) {
        let result = [];

        entities.forEach(function(entity) {
            const name = entity[0];
            const digit = entity[1];
            const utf = String.fromCharCode(digit);

            result.push({
                name,
                nameEntity: '&' + name + ';', // &nbsp;
                digitEntity: '&#' + digit + ';', // &#160;
                utf, // \u00A0
                reName: new RegExp('&' + name + ';', 'g'),
                reUtf: new RegExp(utf, 'g')
            });
        }, this);

        return result;
    }

    _prepareListParam(list) {
        let result = [];

        list.forEach(function(name) {
            const entity = this._entitiesByName[name];
            if (entity) {
                result.push(entity);
            }
        }, this);

        return result;
    }

    _restoreEntitiesByIndex(text, type, entities) {
        entities.forEach(function(entity) {
            text = text.replace(entity.reUtf, entity[type]);
        });

        return text;
    }
}

export default new HtmlEntities();

/**
 * @typedef HtmlEntity
 *
 * @property {string} type - 'default' - UTF-8, 'digit' - &#160;, 'name' - &nbsp;
 * @property {boolean} [onlyInvisible]
 * @property {string[]} [list]
 */
