import type { TypografRule } from '../../../main';

// Match dotted dates as a whole so their year cannot start another match in a range.
const date = /(^|\D)(?:(\d{2}\.\d{2}\.\d{4})|(\d{4})[-./](\d{2})[-./](\d{2})|(\d{2})[-/](\d{2})[-/](\d{4}))(?!\d)/g;

function isValidDate(year: string, month: string, day: string): boolean {
    const monthIndex = Number(month) - 1;
    const dayOfMonth = Number(day);
    const calendarDate = new Date(0);
    // setUTCFullYear preserves years 0000–0099.
    calendarDate.setUTCFullYear(Number(year), monthIndex, dayOfMonth);

    return calendarDate.getUTCMonth() === monthIndex && calendarDate.getUTCDate() === dayOfMonth;
}

export const fromISORule: TypografRule = {
    name: 'ru/date/fromISO',
    handler(text) {
        return text.replace(date, (match, prefix, dotted, isoYear, isoMonth, isoDay, usMonth, usDay, usYear) => {
            if (dotted) {
                return match;
            }

            const year = isoYear || usYear;
            const month = isoMonth || usMonth;
            const day = isoDay || usDay;

            return isValidDate(year, month, day) ? `${prefix}${day}.${month}.${year}` : match;
        });
    },
};
