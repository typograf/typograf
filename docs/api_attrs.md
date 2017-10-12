# Типографирование HTML-атрибутов
Для типографирования HTML-атрибутов необходимо включить правило `common/html/processingAttrs`.
В правиле, по умолчанию, обрабатываются атрибуты `title` и `placeholder`.
```js
var tp = new Typograf({locale: ['ru', 'en-US']});
tp.enableRule('common/html/processingAttrs');

// Дополнительно будем типографировать атрибуты alt и my-attr.
tp.setSetting('common/html/processingAttrs', 'attrs', ['title', 'placeholder', 'alt', 'my-attr']);
```
