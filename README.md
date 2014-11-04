[![Build Status](https://travis-ci.org/hcodes/typograf.png?branch=master)](https://travis-ci.org/hcodes/typograf)

Типограф на JavaScript
======================

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


## Черты:
 + гибкость и расширяемость;
 + кроссбраузерность;
 + мультиязычность;
 + utf-8;
 + поддержка Node.js.


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

## Включить/отключить правило
  ```JavaScript
var tp = new Typograf({lang: 'ru'});
tp.disable('ru/space/afterNum'); // Отключить правило
//...
tp.enable('ru/space/afterNum'); // Включить правило
  ```

## Добавить правило
  ```JavaScript
Typograf.rule({
    title: 'Пример правила',
    name: 'common/other/parampampam', // common - для любого языка, группа "other", правило "parampampam"
    sortIndex: 2000, // меньше - раньше, больше - позже выполняется
    func: function(text) {
        return text.replace(/parampampam/g, 'tryam');
    }
});
  ```


## Режим работы
  ```JavaScript
var tp = new Typograf({lang: 'ru'}); // Режим по умолчанию, HTML-сущности в utf-8
tp.execute('...'); // …

var tpName = new Typograf({lang: 'ru', mode: 'name'}); // HTML-сущности как имена
tpName.execute('...'); // &hellip;

var tpDigit = new Typograf({lang: 'ru', mode: 'digit'}); // HTML-сущности как цифры
tpDigit.execute('...'); //&#8230; 
  ```


## Лицензия
MIT License


## Ссылки
+ [Ководство](http://www.artlebedev.ru/kovodstvo/)
+ [Все типографы](http://rmcreative.ru/blog/post/vse-tipografy)
+ [Сравнение типографов](http://www.typograf.ru/flog/)
