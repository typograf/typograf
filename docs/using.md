# Использование

## Установка
```
npm install typograf
```

## В браузере

### Оттипографить текст
```HTML
<script src="./node_modules/typograf/dist/typograf.min.js"></script>
<script>
    var tp = new Typograf({locale: ['ru', 'en-US']});
    alert(tp.execute('     Мир - мой мир!!      '));
</script>
```

### Оттипографить DOM-элемент
```HTML
<p class="example">     Мир - мой мир!!      </p>
<script src="./node_modules/typograf/dist/typograf.min.js"></script>
<script>
(function() {
    var tp = new Typograf({locale: ['ru', 'en-US']});
    var elem = document.querySelector('.example');
    elem.innerHTML = tp.execute(elem.innerHTML);
})();
</script>
```
### Оттипографить текстовое поле
```HTML
<input type="text" class="my-text" value="Мир - мой мир!!" />
<button class="do">Сделать красиво</button>
<script src="./node_modules/typograf/dist/typograf.min.js"></script>
<script>
(function() {
    var tp = new Typograf({locale: ['ru', 'en-US']});
    var elem = document.querySelector('input.my-text');
    document.querySelector('button.do').addEventListener('click', function() {
        elem.value = tp.execute(elem.value);
    }, false);
})();
</script>
```

## Node.js
```js
const Typograf = require('typograf');
const tp = new Typograf({locale: ['ru', 'en-US']});

console.log(tp.execute(' Мир - мой мир!!   '));
```
