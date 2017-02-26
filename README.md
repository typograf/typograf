Типограф на JavaScript
======================
<img align="right" width="200" src="https://avatars0.githubusercontent.com/u/10176019" />

[![NPM version](https://img.shields.io/npm/v/typograf.svg?style=flat)](https://www.npmjs.com/package/typograf)
[![NPM downloads](https://img.shields.io/npm/dm/typograf.svg?style=flat)](https://www.npmjs.com/package/typograf)
[![Build Status](https://img.shields.io/travis/typograf/typograf.svg?style=flat)](https://travis-ci.org/typograf/typograf)
[![Build Status](https://img.shields.io/appveyor/ci/hcodes/typograf/dev.svg?style=flat)](https://ci.appveyor.com/project/hcodes/typograf)
[![Coverage Status](https://img.shields.io/coveralls/typograf/typograf.svg?style=flat)](https://coveralls.io/r/typograf/typograf)
[![Dependency Status](https://img.shields.io/david/typograf/typograf.svg?style=flat)](https://david-dm.org/typograf/typograf)

Помогает автоматически расставить неразрывные пробелы, исправить мелкие опечатки, привести кавычки к правильному виду, заменить дефисы на тире в нужных местах и многое другое.

Попробуйте [типограф в действии](https://typograf.github.io).

## Черты:
 + гибкость и расширяемость;
 + UTF-8;
 + кроссплатформенность;
 + кроссбраузерность;
 + поддержка Node.js;
 + [типографирование на лету](https://github.com/typograf/jquery-typograf);
 + TDD.

## [Поддерживаемые правила](./docs/RULES.ru.md)

## Форматы:
 + TXT
 + HTML
 + XML
 + SVG

## Использование

### В браузере
```
npm install typograf
```

```HTML
<script src="./node_modules/typograf/dist/typograf.min.js"></script>
<script>
    var tp = new Typograf({locale: ['ru', 'en-US']});
    alert(tp.execute('     Мир - мой мир!!      '));
</script>
```

### Node.js
```
npm install typograf
```

```js
const Typograf = require('typograf');
const tp = new Typograf({locale: ['ru', 'en-US']});

console.log(tp.execute(' Мир - мой мир!!   '));
```

### Плагины
 + [grunt-typograf](https://github.com/typograf/grunt-typograf)
 + [gulp-typograf](https://github.com/typograf/gulp-typograf)
 + [typograf-loader](https://github.com/exah/typograf-loader)
 + [hexo-typograf](https://github.com/toiletpatrol/hexo-typograf)
 + [TinyMCE](https://habrahabr.ru/post/266337/)

### [Командный интерфейс](https://github.com/typograf/typograf-cli)

## Локализация
Типограф поддерживает [несколько десятков локалей](https://github.com/typograf/typograf/blob/dev/docs/LOCALES.en-US.md).

Задать локаль можно как одну, так и несколько. Первая локаль является основной, по ней выбирается какие будут выполнены правила и вид кавычек.
```js
// Выполняются правила "common/*" и "ru/*".
// Кавычки русские.
// Расставка неразрывных пробелов только между русскими словами.
var tpRu = new Typograf({locale: 'ru'});

// Выполняются правила "common/*" и "ru/*".
// Кавычки русские.
// Расставка неразрывных пробелов между русскими и английскими словами.
var tpRuEn = new Typograf({locale: ['ru', 'en-US']});

// Выполняются правила "common/*" и "en-US/*".
// Кавычки английские.
// Расставка неразрывных пробелов между русскими и английскими словами.
var tpEnRu = new Typograf({locale: ['en-US', 'ru']});
```

## API
### Висячая пунктуация
По умолчанию висячая пунктуация отключена.

Для включения необходимо подключить правила:
```js
var Typograf = require('typograf'),
    tp = new Typograf({locale: ['ru', 'en-US']});

tp.enableRule('ru/optalign/*');
console.log(tp.execute('"Мир"'));
```

А также в HTML-код страницы добавить:
```HTML
<!-- Для висячей пунктуации -->
<link rel="stylesheet" href="dist/typograf.css" />
```

### Включить или отключить правила
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

### Изменить настройку у правила
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

### Добавить простое правило
```js
// Типографический смайлик
Typograf.addRule({
    name: 'common/other/typographicSmiley',
    handler: function (text) {
        return text.replace(/:-\)/g, ':—)');
    }
});
```

### HTML-сущности
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

### Типографика на лету
Данный live-режим необходим, если текст типографируется на каждый ввод символа в текстовых полях.
```js
var tp = new Typograf({locale: ['ru', 'en-US'], live: true});
```
[Подробнее](https://github.com/typograf/jquery-typograf)

### Неразрывные пробелы
По умолчанию типограф не заменяет неразрывные пробелы на обычные, чтобы не удалить ранее проставленные неразрывные пробелы. Если в тексте неправильно расставлены неразрывные пробелы, включите правило `common/nbsp/replaceNbsp`.

Перед типографированием в live-режиме неразрывные пробелы заменяются на обычные, т. к. один и тот же текст типографируется многократно при каждом вводе символа.

### Отключение типографирования в участках текста
```js
var tp = new Typograf({locale: ['ru', 'en-US']});

// Отключить типографирование внутри тега <no-typography>
tp.addSafeTag('<no-typography>', '</no-typography>');
//...
// Отключить типографирование внутри управляющих конструкций какого-нибудь шаблонизатора
tp.addSafeTag('\\{\\{', '\\}\\}'); // {{...}}
tp.addSafeTag('\\[\\[', '\\]\\]'); // [[...]]
//...
// Отключить типографирование внутри PHP-кода
tp.addSafeTag('<\\?php', '\\?>');

tp.execute(text);
```

### Сжатие с UglifyJS
Если `typograf.js` сжимается вместе с другими js-файлами в `UglifyJS`,
то необходимо использовать [опцию](http://lisperator.net/uglifyjs/compress) `ascii_only: false`, иначе типограф будет работать некорректно.


## Разработка
`git clone https://github.com/typograf/typograf.git`

Пересборка:
`npm run rebuild`

Пересборка и запуск тестов:
`npm test`

Подготовка новой версии:
`npm run dist`

Проверка скорости работы правил:
`npm run benchmark`

## [Лицензия](./LICENSE.md)
MIT License


## Ссылки
+ [Типограф для Mozilla Firefox](https://addons.mozilla.org/ru/firefox/addon/typografy/)
+ [Букмарклет для типографа](https://github.com/typograf/bookmarklet)
+ [Средство поиска опечаток в текстах](https://github.com/hcodes/yaspeller)
+ [Восстановление буквы «ё» в русских текстах](https://github.com/hcodes/eyo)
