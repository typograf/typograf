import Typograf from '../typograf';

// Required letters based on the primary exemplarCharacters sets in Unicode CLDR 48.
// German ẞ is added explicitly because JavaScript does not case-fold it from ß.
// Punctuation and multi-character sequences are intentionally excluded.
const requiredChars = [
    ['be', 'абвгдеёжзійклмнопрстуўфхцчшыьэюя'],
    ['bg', 'абвгдежзийклмнопрстуфхцчшщъьюя'],
    ['ca', 'abcdefghijklmnopqrstuvwxyzàçèéíïòóúü'],
    ['cs', 'abcdefghijklmnopqrstuvwxyzáéíóúýčďěňřšťůž'],
    ['da', 'abcdefghijklmnopqrstuvwxyzæøå'],
    ['de', 'abcdefghijklmnopqrstuvwxyzßẞäöü'],
    ['el', 'ΐάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ'],
    ['en-GB', 'abcdefghijklmnopqrstuvwxyz'],
    ['en-US', 'abcdefghijklmnopqrstuvwxyz'],
    ['eo', 'abcĉdefgĝhĥijĵklmnoprsŝtuŭvz'],
    ['es', 'abcdefghijklmnopqrstuvwxyzáéíñóúü'],
    ['et', 'abcdefghijklmnopqrstuvwxyzäõöüšž'],
    ['fi', 'abcdefghijklmnopqrstuvwxyzšžåäö'],
    ['fr', 'abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ'],
    ['ga', 'aábcdeéfghiílmnoóprstuú'],
    ['hu', 'abcdefghijklmnopqrstuvwxyzáéíóöőúüű'],
    ['it', 'abcdefghijklmnopqrstuvwxyzàéèìòù'],
    ['lv', 'abcdefghijklmnoprstuvzāčēģīķļņšūž'],
    ['nl', 'abcdefghijklmnopqrstuvwxyzáäéëíïóöúü'],
    ['no', 'abcdefghijklmnopqrstuvwxyzàéóòôæøå'],
    ['pl', 'abcdefghijklmnoprstuwyząćęłńóśźż'],
    ['ro', 'abcdefghijklmnopqrstuvwxyzăâîșț'],
    ['ru', 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя'],
    ['sk', 'abcdefghijklmnopqrstuvwxyzáäčďéíĺľňóôŕšťúýž'],
    ['sl', 'abcdefghijklmnoprstuvzčšž'],
    ['sr', 'abcdefghijklmnoprstuvzčćđšž'],
    ['sv', 'abcdefghijklmnopqrstuvwxyzàéåäö'],
    ['tr', 'abcçdefgğhıiİjklmnoöprsştuüvyz'],
    ['uk', 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'],
];

describe('locale character data', () => {
    it.each(requiredChars)('%s covers its required letters', (locale, expected) => {
        const chars = Typograf.getData(locale + '/char') as string;
        const charPattern = new RegExp('^[' + chars + ']$');
        const missingChars = Array.from(expected).filter(char => !charPattern.test(char));

        expect(missingChars).toEqual([]);
    });
});
