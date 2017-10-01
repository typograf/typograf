# Сжатие с UglifyJS
Если `typograf.js` сжимается вместе с другими js-файлами в `UglifyJS`,
то необходимо использовать [опцию](http://lisperator.net/uglifyjs/compress) `ascii_only: false`, иначе типограф будет работать некорректно.
