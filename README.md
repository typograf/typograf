Типограф на JavaScript
======================
[![NPM version](https://badge.fury.io/js/typograf.svg)](http://badge.fury.io/js/typograf)
[![Build Status](https://travis-ci.org/typograf/typograf.svg?branch=master)](https://travis-ci.org/typograf/typograf)
[![Coverage Status](https://coveralls.io/repos/typograf/typograf/badge.png?branch=master)](https://coveralls.io/r/typograf/typograf)
[![Dependency Status](https://david-dm.org/typograf/typograf.svg)](https://david-dm.org/typograf/typograf)
[![devDependency Status](https://david-dm.org/typograf/typograf/dev-status.svg)](https://david-dm.org/typograf/typograf#info=devDependencies)

[Типограф в действии](https://typograf.github.io/web/) с [мобильной версией](https://typograf.github.io/web/mobile.html)
## Что может типограф:
+ правильно расставлять кавычки и тире;
+ удаляет:
    + «табы» и повторы пробелов;
    + пробелы в начале и конце текста, а также пустые строки;
    + пробелы перед знаками пунктуации, перед знаком %.
+ расстановка абзацев и переносов строк;
+ ставит неразрывный пробел:
    + перед последним словом;
    + после коротких слов;
    + перед частицами: ли, ль, же, ж, бы, б;
    + после знака № и §.
+ заменяет:
    + 10 C на 10 °С и 10 F на 10 °F;
    + 2007г. на 2007 г.;
    + три точки на троеточие;
    + Кв. м (км, дм, см, мм) на м²;
    + Куб. м (км, дм, см, мм) на м³;
    + 12x18 на 12×18;
    + `http://example.com` на http://example.com;
    + (с) на ©, (r) на ™, +- на ±;
    + и пр.
+ висячая пунктуация.


## Черты:
 + гибкость и расширяемость;
 + кроссбраузерность;
 + мультиязычность;
 + utf-8;
 + поддержка Node.js;
 + TDD.


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

### Командная строка
```
npm install typograf -g
```
`typograf` - вывод справки

`typograf my_file.txt` - оттипографировать текст по русским правилам

`typograf -l en my_file.txt` - оттипографировать файл по английским правилам

`typograf -d ru/quot -e ru/optaling/* my_file.txt > new_my_file` - оттипографировать файл с отключенным правилом `ru/quot` и включенными правилами `ru/optaling/*`

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
tp.disable('ru/space/afterNum'); // Отключить правило
//...
tp.enable('ru/space/afterNum'); // Включить правило
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
tpDigit.execute('...'); //&#8230;
```


## Лицензия
MIT License


## Ссылки
+ [Средство поиска опечаток в текстах](https://github.com/hcodes/yaspeller)
+ [Ководство](http://www.artlebedev.ru/kovodstvo/)
+ [Все типографы](http://rmcreative.ru/blog/post/vse-tipografy)
+ [Сравнение типографов](http://www.typograf.ru/flog/)
