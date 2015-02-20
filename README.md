Типограф на JavaScript
======================
[![NPM version](https://img.shields.io/npm/v/typograf.svg?style=flat)](https://www.npmjs.com/package/typograf)
[![NPM downloads](https://img.shields.io/npm/dm/typograf.svg?style=flat)](https://www.npmjs.com/package/typograf)
[![Build Status](https://img.shields.io/travis/typograf/typograf.svg?style=flat)](https://travis-ci.org/typograf/typograf)
[![Build Status](https://img.shields.io/appveyor/ci/hcodes/typograf/master.svg?style=flat)](https://ci.appveyor.com/project/hcodes/typograf)
[![Coverage Status](https://img.shields.io/coveralls/typograf/typograf.svg?style=flat)](https://coveralls.io/r/typograf/typograf)

[![Dependency Status](https://img.shields.io/david/typograf/typograf.svg?style=flat)](https://david-dm.org/typograf/typograf) [![devDependency Status](https://img.shields.io/david/dev/typograf/typograf.svg?style=flat)](https://david-dm.org/typograf/typograf#info=devDependencies)

[Типограф в действии](https://typograf.github.io) с [мобильной версией](https://typograf.github.io/mobile.html)

## Черты:
 + гибкость и расширяемость;
 + кроссбраузерность;
 + мультиязычность;
 + utf-8;
 + поддержка Node.js;
 + TDD.

## [Поддерживаемые правила](./docs/RULES.md)

## Форматы:
 + HTML
 + TXT
 + SVG
 + XML

## Использование

### В браузере
```
bower install typograf
```

```HTML
<script src="dist/typograf.min.js"></script>
<script>
    var tp = new Typograf({lang: 'ru'});
    alert(tp.execute('     Мир - мой мир!      '));
</script>
```

### Node.js
```
npm install typograf
```

```JavaScript
var Typograf = require('typograf'),
    tp = new Typograf({lang: 'ru'});

console.log(tp.execute(' Мир - мой мир!!   '));
```

### Плагины
 + [grunt-typograf](https://github.com/typograf/grunt-typograf)
 + [gulp-typograf](https://github.com/typograf/gulp-typograf)

### Командная строка
```
npm install typograf -g
```
`typograf` — вывод справки

`typograf -l ru my_file.txt` — типографировать текст по русским правилам

`typograf -l en my_file.txt` — типографировать файл по английским правилам

`typograf -l ru -d ru/punctuation/quot -e ru/optaling/* my_file.txt > new_my_file` — типографировать файл с отключенным правилом `ru/punctuation/quot` и включенными правилами `ru/optaling/*`

## API
### Висячая пунктуация
По умолчанию висячая пунктуация отключена.

Для включения необходимо подключить правила:
```JavaScript
var Typograf = require('typograf'),
    tp = new Typograf({lang: 'ru'});

tp.enable('ru/optalign/*');
console.log(tp.execute('"Мир"'));
```

А также в HTML-код страницы добавить:
```HTML
<link rel="stylesheet" href="dist/typograf.css" type="text/css" />
```

### Включить/отключить правило
```JavaScript
var tp = new Typograf({lang: 'ru'});
tp.enable('ru/money/ruble'); // Включить правило
//...
tp.disable('ru/money/ruble'); // Отключить правило
```

### Добавить правило
```JavaScript
Typograf.rule({
    // Заголовок
    title: 'Пример правила',
    // язык/группа/правило
    name: 'common/other/parampampam',
    // Очередность выполнения правил, чем меньше индекс, тем раньше выполнится правило
    sortIndex: 2000,
    // Функция обработки правила
    func: function(text) {
        return text.replace(/parampampam/g, 'tryam');
    }
});
```

### Установить настройку у правила
```JavaScript
var tp = new Typograf({lang: 'ru'});
// Название правила, название настройки, значение
tp.setting('common/nbsp/beforeShortLast', 'lengthLastWord', 5);
```

### Режим работы
```JavaScript
// Режим по умолчанию, HTML-сущности, как utf-8 символы
var tp = new Typograf({lang: 'ru'});
tp.execute('...'); // …

// HTML-сущности, как имена
var tpName = new Typograf({lang: 'ru', mode: 'name'});
tpName.execute('...'); // &hellip;

// HTML-сущности, как цифры
var tpDigit = new Typograf({lang: 'ru', mode: 'digit'});
tpDigit.execute('...'); // &#8230;
```

## Разработка
`git clone https://github.com/typograf/typograf.git ./typograf`

Пересборка и запуск тестов:
`gulp && npm test`

## [Лицензия](./LICENSE.ru.md)
MIT License


## Ссылки
+ [Букмарклет для типографа](https://github.com/typograf/bookmarklet)
+ [Средство поиска опечаток в текстах](https://github.com/hcodes/yaspeller)
