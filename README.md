Типограф на JavaScript
======================
[![NPM version](https://img.shields.io/npm/v/typograf.svg?style=flat)](https://www.npmjs.com/package/typograf)
[![NPM downloads](https://img.shields.io/npm/dm/typograf.svg?style=flat)](https://www.npmjs.com/package/typograf)
[![Build Status](https://img.shields.io/travis/typograf/typograf.svg?style=flat)](https://travis-ci.org/typograf/typograf)
[![Build Status](https://img.shields.io/appveyor/ci/hcodes/typograf/dev.svg?style=flat)](https://ci.appveyor.com/project/hcodes/typograf)
[![Coverage Status](https://img.shields.io/coveralls/typograf/typograf.svg?style=flat)](https://coveralls.io/r/typograf/typograf)

[![Dependency Status](https://img.shields.io/david/typograf/typograf.svg?style=flat)](https://david-dm.org/typograf/typograf) [![devDependency Status](https://img.shields.io/david/dev/typograf/typograf.svg?style=flat)](https://david-dm.org/typograf/typograf#info=devDependencies)

[Типограф в действии](https://typograf.github.io) с [мобильной версией](https://typograf.github.io/mobile.html)

## Черты:
 + гибкость и расширяемость;
 + кроссплатформенность;
 + кроссбраузерность;
 + мультиязычность;
 + UTF-8;
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
<link rel="stylesheet" href="dist/typograf.css" />
```

### Включить/отключить правило
```JavaScript
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
```JavaScript
var tp = new Typograf({lang: 'ru'});
// Название правила, название настройки, значение
tp.setting('common/nbsp/beforeShortLast', 'lengthLastWord', 5);
```

### Добавить правило
```JavaScript
Typograf.rule({
    // Язык/группа/правило
    name: 'common/other/parampampam',
    // Очередность выполнения правил, чем меньше индекс, тем раньше выполнится правило
    index: 2000,
    // Функция обработки правила
    handler: function(text) {
        return text.replace(/parampampam/g, 'tryam');
    }
});
```

### Режим работы
```JavaScript
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

### Сжатие с UglifyJS
Если `typograf.js` сжимается вместе с другими js-файлами в `UglifyJS`,
то необходимо использовать [опцию](http://lisperator.net/uglifyjs/compress) `ascii_only: false`, иначе типограф будет работать некорректно.


## Разработка
`git clone https://github.com/typograf/typograf.git`

Пересборка:
`gulp`

Пересборка и запуск тестов:
`npm test`

Подготовка новой версии:
`gulp dist`

## [Лицензия](./LICENSE.ru.md)
MIT License


## Ссылки
+ [Букмарклет для типографа](https://github.com/typograf/bookmarklet)
+ [Средство поиска опечаток в текстах](https://github.com/hcodes/yaspeller)
+ [Восстановление буквы «ё» в русских текстах](https://github.com/hcodes/eyo)
