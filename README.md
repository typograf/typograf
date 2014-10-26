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
 + utf-8;
 + поддержка Node.js.


## Использование
  ```HTML
<script src="typograf.min.js"></script>
<script>
    var tp = new Typograf();
    alert(tp.execute('     Мир - мой мир!      '));
</script>
  ```


## Включить/отключить правило
  ```JavaScript
var tp = new Typograf();
tp.disable('space_after_num'); // Отключить правило
//...
tp.enable('space_after_num'); // Включить правило
  ```


## Добавить правило
  ```JavaScript
Typograf.rule({
    title: 'Пример правила',
    name: 'parampampam', 
    sortIndex: 2000, // меньше - раньше, выше - позже выполняется
    func: function(text) {
        return text.replace(/parampampam/g, 'tryam');
    }
});
  ```


## Режим работы
  ```JavaScript
var tp = new Typograf(); // Режим по умолчанию, HTML-сущности в utf-8
tp.execute('...'); // …

var tpName = new Typograf({mode: 'name'}); // HTML-сущности как имена
tpName.execute('...'); // &hellip;

var tpDigit = new Typograf({mode: 'digit'}); // HTML-сущности как цифры
tpDigit.execute('...'); //&#8230; 
  ```


## Лицензия
MIT License
