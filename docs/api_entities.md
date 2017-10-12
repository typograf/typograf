# HTML-сущности

После обработки текста HTML-сущности преобразуются в один из трёх типов:

|№ |Тип                    |`type`      |Пример           |
|--|-----------------------|------------|-----------------|
|1.|Готовые символы (UTF-8)|По умолчанию|`«Я»`            |
|2.|В виде цифр            |`digit`     |`&#171;Я&#187;`  |
|3.|В виде имён            |`name`      |`&laquo;Я&raquo;`|

## Примеры
HTML-сущности готовыми символами, по умолчанию:
```js
var tp = new Typograf({locale: ['ru', 'en-US']});
tp.execute('12 кг...'); // 12 кг…
```

HTML-сущности в виде имён:
```js
var tp = new Typograf({
    locale: ['ru', 'en-US'],
    htmlEntity: {type: 'name'}
});
tp.execute('12 кг...'); // 12&nbsp;кг&hellip;
```

HTML-сущности в виде цифр:
```js
var tp = new Typograf({
    locale: ['ru', 'en-US'],
    htmlEntity: {type: 'digit'}
});
tp.execute('12 кг...'); // 12&#160;кг&#8230;
```

Все HTML-сущности готовыми символами, а невидимые сущности — в виде цифр.
Невидимые сущности — `&nbsp;` `&thinsp;` `&ensp;` `&emsp;` `&shy;` `&zwnj;` `&zwj;` `&lrm;` `&rlm;`.
```js
var tp = new Typograf({
    locale: ['ru', 'en-US'],
    htmlEntity: {
        type: 'name',
        onlyInvisible: true
    }
});
tp.execute('12 кг...'); // 12&nbsp;кг…
```

Все HTML-сущности готовыми символами, а заданные в списке — в виде цифр:
```js
var tp = new Typograf({
    locale: ['ru', 'en-US'],
    htmlEntity: {
        type: 'digit',
        list: ['nbsp', 'shy', 'mdash', 'ndash']
    }
});
tp.execute('12 кг...'); // 12&#160;кг…
```
