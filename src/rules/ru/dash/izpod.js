Typograf.addRule({
    name: 'ru/dash/izpod',
    handler(text) {
        const re = new RegExp(Typograf.getData('ru/dashBefore') + '(И|и)з под' + Typograf.getData('ru/dashAfter'), 'g');

        return text.replace(re, '$1$2з-под');
    }
});
