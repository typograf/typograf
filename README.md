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
    var tp = new Typograf({lang: 'ru'});
    alert(tp.execute('     Мир - мой мир!      '));
</script>
```

### Node.js
```
npm install typograf
```

```js
const Typograf = require('typograf');
const tp = new Typograf({lang: 'ru'});

console.log(tp.execute(' Мир - мой мир!!   '));
```

### Плагины
 + [grunt-typograf](https://github.com/typograf/grunt-typograf)
 + [gulp-typograf](https://github.com/typograf/gulp-typograf)
 + [typograf-loader](https://github.com/exah/typograf-loader)
 + [hexo-typograf](https://github.com/toiletpatrol/hexo-typograf)

### [Командный интерфейс](https://github.com/typograf/typograf-cli)

## API
### Висячая пунктуация
По умолчанию висячая пунктуация отключена.

Для включения необходимо подключить правила:
```js
var Typograf = require('typograf'),
    tp = new Typograf({lang: 'ru'});

tp.enable('ru/optalign/*');
console.log(tp.execute('"Мир"'));
```

А также в HTML-код страницы добавить:
```HTML
<link rel="stylesheet" href="dist/typograf.css" />
```

### Включить или отключить правила
```js
var tp = new Typograf({lang: 'ru'});
tp.enable('ru/money/ruble'); // Включить правило
tp.enable('ru/money/*'); // Включить все правила в группе
tp.enable('*'); // Включить все правила
//...
tp.disable('ru/money/ruble'); // Отключить правило
tp.disable('ru/money/*'); // Отключить все правила в группе
tp.disable('*'); // Отключить все правила
```

### Изменить настройку у правила
```js
var tp = new Typograf({lang: 'ru'});
// Название правила, название настройки, значение
tp.setting('common/nbsp/beforeShortLastWord', 'lengthLastWord', 5);
```

### Добавить простое правило
```js
Typograf.rule({
    name: 'common/other/emoji',
    handler: function (text) {
        return text.replace(/:-\)/g, '\uD83D\uDE0A');
    }
});
```

### Режим работы
```js
// Режим по умолчанию, HTML-сущности, как UTF-8 символы
var tp = new Typograf({lang: 'ru'});
tp.execute('...'); // …

// HTML-сущности, как имена
var tpName = new Typograf({lang: 'ru', mode: 'name'});
tpName.execute('...'); // &hellip;

// HTML-сущности, как цифры
var tpDigit = new Typograf({lang: 'ru', mode: 'digit'});
tpDigit.execute('...'); // &#8230;
```

### Типографика на лету
Данный live-режим необходим, если текст типографируется на каждый ввод символа в текстовых полях.
```js
var tp = new Typograf({lang: 'ru', live: true});
```
[Подробнее](https://github.com/typograf/jquery-typograf)

### Неразрывные пробелы
По умолчанию типограф не заменяет неразрывные пробелы на обычные, чтобы не удалить ранее проставленные неразрывные пробелы. Если в тексте неправильно расставлены неразрывные пробелы, включите правило `common/nbsp/replaceNbsp`.

Перед типографированием в live-режиме неразрывные пробелы заменяются на обычные, т. к. один и тот же текст типографируется многократно при каждом вводе символа.

### Отключение типографирования в участках текста
```js
var tp = new Typograf({lang: 'ru'});

// Отключить типографирование внутри тега <no-typography>
tp.addSafeTag('<no-typography>', '</no-typography>');
//...
// Отключить типографирование внутри управляющих конструкций какого-нибудь шаблонизатора
tp.addSafeTag('{{', '}}');
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
