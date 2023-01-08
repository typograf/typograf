import { addLocale } from './locale';

const data: Record<string, unknown> = {};

/**
 * Get data for use in rules.
 */
export function getData(key: string): unknown {
    return data[key];
}

/**
 * Set data for use in rules.
 */
export function setData(newData: Record<string,unknown>) {
    Object.keys(newData).forEach(key => {
        addLocale(key);
        data[key] = newData[key];
    });
}

export type DataChar = string;
export type DataCommonQuote = string;
export type DataQuote = {
    left: string;
    right: string;
    spacing?: boolean;
    removeDuplicateQuotes?: true;
};
