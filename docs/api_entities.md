# HTML-сущности
```js
// Режим по умолчанию, HTML-сущности, как UTF-8 символы
var tp = new Typograf({locale: ['ru', 'en-US']});
tp.execute('12 кг...'); // 12 кг…

// HTML-сущности в виде имён
var tpName = new Typograf({
    locale: ['ru', 'en-US'],
    htmlEntity: {type: 'name'}
});
tpName.execute('12 кг...'); // 12&nbsp;кг&hellip;

// HTML-сущности в виде цифр
var tpDigit = new Typograf({
    locale: ['ru', 'en-US'],
    htmlEntity: {type: 'digit'}
});
tpDigit.execute('12 кг...'); // 12&#160;кг&#8230;

// Все HTML-сущности в UTF-8, а невидимые сущности в виде цифр
// Невидимые сущности — &nbsp; &thinsp; &ensp; &emsp; &shy; &zwnj; &zwj; &lrm; &rlm;
var tpNameInvisible = new Typograf({
    locale: ['ru', 'en-US'],
    htmlEntity: {
        type: 'name',
        onlyInvisible: true
    }
});
tpNameInvisible.execute('12 кг...'); // 12&nbsp;кг…

// Все HTML-сущности в UTF-8, а заданные в списке в виде цифр
var tpDigit = new Typograf({
    locale: ['ru', 'en-US'],
    htmlEntity: {
        type: 'digit',
        list: ['nbsp', 'shy', 'mdash', 'ndash']
    }
});
tpDigit.execute('12 кг...'); // 12&#160;кг…

```
