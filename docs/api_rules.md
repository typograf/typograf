## Включить или отключить правила
```js
var tp = new Typograf({locale: ['ru', 'en-US']});
tp.enableRule('ru/money/ruble'); // Включить правило
tp.enableRule('ru/money/*'); // Включить все правила в группе
tp.enableRule('*'); // Включить все правила
//...
tp.disableRule('ru/money/ruble'); // Отключить правило
tp.disableRule('ru/money/*'); // Отключить все правила в группе
tp.disableRule('*'); // Отключить все правила
```

## Изменить настройку у правила
```js
var tp = new Typograf({locale: ['ru', 'en-US']});

// Название правила, название настройки, значение

// Неразрывный пробел перед последним словом в предложении, не более 5 символов
tp.setSetting('common/nbsp/beforeShortLastWord', 'lengthLastWord', 5);

// Вложенные кавычки тоже «ёлочки» для русской типографики
tp.setSetting('common/punctuation/quote', 'ru', {left: '«', right: '»', removeDuplicateQuotes: true});

// Неразрывный пробел после короткого слова, не более 3 символов
tp.setSetting('common/nbsp/afterShortWord', 'lengthShortWord', 3);
```

## Добавить простое правило
```js
// Типографический смайлик
Typograf.addRule({
    name: 'common/other/typographicSmiley',
    handler: function (text) {
        return text.replace(/:-\)/g, ':—)');
    }
});
```
