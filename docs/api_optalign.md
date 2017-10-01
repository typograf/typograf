# Висячая пунктуация
По умолчанию висячая пунктуация отключена.

Для включения необходимо подключить правила `ru/optalign/*`:
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
