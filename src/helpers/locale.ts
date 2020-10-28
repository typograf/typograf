export function prepareLocale(...params: (string | undefined | string[])[]): string[] {
    let result: string[] = [];

    params.forEach(locale => {
        if (Array.isArray(locale)) {
            result = result.concat(locale);
        } else if (locale) {
            result.push(locale);
        }
    });

    return result.filter(Boolean);
}
