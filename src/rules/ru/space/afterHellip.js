export default {
    name: 'ru/space/afterHellip',
    handler(text) {
        return text
            .replace(/([а-яё])(\.\.\.|…)([А-ЯЁ])/g, '$1$2 $3')
            .replace(/([?!]\.\.)([а-яёa-z])/gi, '$1 $2');
    }
};
