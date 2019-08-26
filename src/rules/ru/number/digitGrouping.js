Typograf.addRule({
    name: 'ru/number/digitGrouping',
    index: '310',
    handler(text, settings) {
        return text.replace(/(\d{5,}([.,]\d+)?)/g, function($0, $1) {
            const delimiter = $1.match(/[.,]/);
    
            let parts = $1.split(delimiter);
            parts[0] = parts[0].replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1' + settings.space);
    
            return (delimiter) ? parts[0] + delimiter + parts[1] : parts[0];
        });
    },
    settings: {
        space: '\u202F'
    },
    disabled: true
});
