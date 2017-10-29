# Changelog

# v6.6.0
Доработки по расстановке кавычек #222, #274.

# v6.5.1
- Исправлена ошибка в правиле `ru/punctuation/ano` #271, #272.
- Ускорена работа с именными HTML-сущностями #269.

# v6.5.0
- Для лучшей расстановки кавычек теги (`p`, `h1-6`, `title` и др.) в HTML обрабатываются по отдельности #254.
- Кодовая база переведена на ES6 #261.
- Плагин для [Atom’а](https://github.com/red-typography/atom-red-typography).

# v6.4.0
- `ru/punctuation/hellip` → `common/punctuation/hellip` и добавлено новое правило `ru/punctuation/hellipQuestion` #251,
- из репозитория удалены папки `build/` и `dist/` #250.

# v6.3.1
Доработки в правилах:
- `ru/money/currency` #243
- `ru/nbsp/mln` #241

# v6.3.0
Новые правила:
- неразрывный пробел между числом и «тыс.», «млн», «млрд» и «трлн» `ru/nbsp/mln` #239,
- замена &quot; на " `common/html/quot` #238.

# v6.2.1
Исправлена ошибка, возникающая при расстановке ссылок и абзацев #236.

# v6.2.0
- Исправлен вид французcких кавычек.
- Французcкие кавычки отбиваются от слов неразрывным тонким пробелом.
- Добавлена возможность использования метода `execute` в правилах.

# v6.1.0
- Появилась возможность [типографировать HTML-атрибуты](https://github.com/typograf/typograf#%D0%A2%D0%B8%D0%BF%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-html-%D0%B0%D1%82%D1%80%D0%B8%D0%B1%D1%83%D1%82%D0%BE%D0%B2) #227.
- Для `en-GB` исправлен вид кавычек #226.

# v6.0.1
Правило `common/punctuation/quoteLink` теперь выполняется после `common/punctuation/quote`.

# v6.0.0

Переименованы методы:
- `Typograf.rule()` → `Typograf.addRule()`
- `Typograf.innerRule()` → `Typograf.addInnerRule()`
- `Typograf.data()` → `Typograf.getData()` и `Typograf.setData()`
- `Typograf.setting()` → `Typograf.getSetting()` и `Typograf.setSetting()`
- `Typograf.prototype.data()` → `Typograf.prototype.getData()`
- `Typograf.prototype.disable()` → `Typograf.prototype.disableRule()`
- `Typograf.prototype.disabled()` → `Typograf.prototype.isDisabledRule()`
- `Typograf.prototype.enable()` → `Typograf.prototype.enableRule()`
- `Typograf.prototype.enabled()` → `Typograf.prototype.isEnabledRule()`

Переименованы свойства в параметрах конструктора:
- `disable` → `disableRule`
- `enable` → `enableRule`
- `lang` → `locale`
- `mode` → `htmlEntity`

```js
// Было:
var tp = new Typograf({
    enable: 'ru/optalign/*',
    lang: 'ru',
    mode: 'digit'
});

// Стало:
var tp = new Typograf({
    enableRule: 'ru/optalign/*',
    locale: ['ru', 'en-US'],
    htmlEntity: {type: 'digit'}
});
```

Добавлена поддержка начальной типографики для [нескольких десятков локалей](https://github.com/typograf/typograf/blob/dev/docs/LOCALES.en-US.md). Добавлены методы по работе с локалями: `Typograf.addLocale()`, `Typograf.hasLocale()` и `Typograf.getLocales()`.

Добавлено правило `common/punctuation/quoteLink` для выноса кавычек из ссылки.

Правило по расстановке кавычек стало общим `common/punctuation/quote`. Правила `ru/punctuation/quote` и `en/punctuation/quote` удалены.

Переработана сборка с помощью `gulp-include`, упрощены тесты и пр.

# v5.8.0
Доработки по расстановке кавычек и апострофа #143, #214. Правило `ru/punctuation/apostrophe` переименовано в `common/punctuation/apostrophe`.

Рефакторинг обработки HTML-сущностей и безопасных тегов #216, #217.

# v5.7.0
Новые правила:
- Замена №№ на № `ru/symbols/NN` #205
- Замена точки на запятую в числах `ru/number/comma` #207

Доработки в правилах:
- `common/html/p` #195
- `common/number/fraction` #197 @greyevil
- `ru/number/ordinals` #206

Добавлено новое свойство `htmlEntity`, аналог `mode` #200, #208. Теперь можно [гибко настроить](https://github.com/typograf/typograf#html-%D1%81%D1%83%D1%89%D0%BD%D0%BE%D1%81%D1%82%D0%B8) какие HTML-сущности будут в UTF-8, а какие необходимо заменить на именной или цифровой вид.  
В следующей мажорной версии свойство `mode` будет удалено.

# v5.6.0
- Добавлена настройка переносов строк #190.
- Правило `common/html/pbr` переименовано в `common/html/p`, удалена расстановка тега `<br/>` внутри правила #185.

Доработки в правилах:
- `ru/nsbp/abbr` #181, #188
- `ru/optalign/quote` #184, #189
- `ru/other/phone` #183
- `common/html/nbr` #185

# v5.5.3
Отключена висячая пунктуация в `<title>` #172, #177.

# v5.5.2
Исправлена опечатка в правиле `ru/typo/switchingKeyboardLayout` #175 @zyulyaev.

# v5.5.1
Внесены правки по расстановке кавычек при пропуске пробелов #158.

# v5.5.0
- Новое правило `ru/typo/switchingKeyboardLayout` исправляет опечатки, возникающие при переключении клавиатурной раскладки.
- `dist/typograf.all.js`, включающий дополнительно `dist/typograf.groups.js` и `dist/typograf.titles.js`.

# v5.4.3
Доработка правила `common/nbsp/replaceNbsp`. [Подробнее](https://github.com/typograf/typograf/#%D0%9D%D0%B5%D1%80%D0%B0%D0%B7%D1%80%D1%8B%D0%B2%D0%BD%D1%8B%D0%B5-%D0%BF%D1%80%D0%BE%D0%B1%D0%B5%D0%BB%D1%8B) о работе типографа с неразрывными пробелами.

# v5.4.2
Доработка правила `ru/dash/main` для неразрывного пробела после тире #165.

# v5.4.1
Добавлен файл `typograf.d.ts` в npm-пакет.

# v5.4.0
- Новое правило `ru/other/phone-number` для форматирования российских телефонных номеров #162
- Добавлены typings для TypeScript #164 @trikadin

# v5.3.3
- Устранена ошибка в правиле `common/other/repeatWord`.

# v5.3.2
- Устранена ошибка в правиле `ru/money/currency`, снижающая скорость типографирования длинных текстов.

# v5.3.1
- Устранена ошибка в обработке аббревиатур #156

# v5.3.0
- Скрытие ссылок при типографировании текстов #151

# v5.2.0
Правило `ru/dash/kade` разделено на:
- `ru/dash/ka`
- `ru/dash/de` (отключено по умолчанию)

# v5.1.0
В интервалах изменено длинное тире на среднее.

# v5.0.0
- Удалена поддержка `bower`
- Доработки правила `ru/nbsp/initials` для привязки инициалов к фамилии
- Устранены ошибки в правилах `ru/nbsp/centuries` и `ru/nbsp/years`

# v4.3.0
Новые правила:
- Привязка инициалов к фамилии `ru/nbsp/initials`
- Расстановка неразр. пробела перед числом в конце предложения `common/nbsp/beforeShortLastNumber`

# v4.2.1
Устранены ошибки:
- `ru/dash/kade` в фамильных приставках «де»;
- `common/symbols/cf` для ссылок.

# v4.2.0
Новые правила:
- Замена обычного пробела на неразрывный узкий в группах чисел `ru/nbsp/groupNumbers`
- Неразрывный пробел перед «руб.» и «коп.» `ru/nbsp/rubleKopek`
- Неразрывный пробел перед знаками валют `ru/money/currency`

Добавлена возможность указывать блоки текста, где не нужно типографировать:
```js
var t = new Typograf({lang: 'ru'});
t.addSafeTag('<mytag>', '</mytag>');
t.addSafeTag('<mytag>', '</mytag>', '.*?');
t.addSafeTag(/<mytag>.*?</mytag>/gi);
```

# v4.1.0
Доработки правил:
- `common/nbsp/beforeShortLastWord`
- `common/number/mathSign`
- `common/space/afterPunctuation`
- `common/space/delBeforePunctuation`
- `common/space/delRepeatSpace`
- `ru/dash/directSpeech`
- `ru/nbsp/beforeParticle`

Добавлено свойство `Typograf.version`.

## v4.0.1
Исправления в правиле `ru/money/dollar` #144.

## v4.0.0
### Новые правила
- Нераз. пробел после сокращений «см.» и «им.» `ru/nbsp/see`
- Пробел перед многоточием, !.. и ?.. `ru/space/afterHellip`
- Тире между днями в одном месяце `ru/dash/daysMonth`
- Тире в интервалах времени `ru/dash/time`
- Тире в десятилетиях `ru/dash/decade`

Правило `ru/dash/main` разделено на несколько правил:
- Замена дефиса на тире в веках `ru/dash/centuries`
- Замена дефиса на тире в годах `ru/dash/years`
- Тире в прямой речи `ru/dash/directSpeech`
- Сокращения с помощью тире `ru/dash/surname`

### Переименование правил
- `common/sym/*` → `common/symbols/*`
- `ru/punctuation/quot` → `ru/punctuation/quote`
- `en/punctuation/quot` → `en/punctuation/quote`
- `ru/optalign/quot` → `ru/optalign/quote`
- `ru/nbsp/xxxx` → `ru/nbsp/year`
- `common/nbsp/afterPara` → `common/nbsp/afterParagraph`
- `ru/date/main` → `ru/date/fromISO`
- `ru/nbsp/cc` → `ru/nbsp/centuries`
- `common/punctuation/exclamation` → `ru/punctuation/exclamation`
- `common/punctuation/exclamationQuestion` → `ru/punctuation/exclamationQuestion`

### Прочее
- Неразрывный тонкий пробел после № и §
- Командный интерфейс перенесен в [отдельный репозиторий](https://github.com/typograf/typograf-cli)
- Удалено свойство `index` у большинства правил
- Рефакторинг регулярных выражений в правилах
- Исправлены неточности в описаниях правил

## v3.5.0
Добавлены новые правила:
- Расстановка правильного апострофа `ru/punctuation/apostrophe`
- Неразрывный пробел в P. S. и P. P. S. `ru/nbsp/ps`
- Удаление лишних пробелов внутри круглых скобок `common/space/bracket`
- Удаление лишних пробелов внутри квадратных скобок `common/space/squareBracket`
- Пробел перед открывающей скобкой `common/space/beforeBracket`

## v3.4.0
Добавлено новое правило «Пробел между числом и словом „год“».

Доработки и исправления в правилах:
- `common/nbsp/afterShortWord`
- `common/nbsp/beforeShortLastWord`
- `ru/nbsp/abbr`
- `ru/nbsp/page`
- `ru/nbsp/m`

## v3.3.0
### Типографирование на лету
```JavaScript
var tp = new Typograf({lang: 'ru', live: true});
```

У правил появилось дополнительное свойство `live` #133, #139.
```JavaScript
// Добавляем правило
Typograf.rule({
    name: 'common/other/emoji',
    live: false,
    handler: function (text) {
        return text.replace(/:-\)/g, '\uD83D\uDE0A');
    }
});
```
`live: true` — правило работает только в режиме типографирования на лету.
`live: false` — правило не работает на лету.

### Доработки
- Исправлены сложные случаи с кавычками и HTML-тегами #131
- Не типографировать экранированные HTML-теги #138

## v3.2.0
Доработки:
- Расстановка тире в месяцах `в апреле-мае`
- Сложные случаи с тире в прямой речи
- В правиле `ru/nbsp/beforeParticle` устранена лишняя расстановка неразрывных пробелов
- Переработка правила `common/punctuation/delDoublePunctuation`
- Замена `&quot;` на `"`

## v3.1.0
Добавлены правила:
- `common/number/mathSign` `!= → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ±` #126
- `common/other/delBOM` удаление BOM-символа #121
- `ru/punctuation/ano` расстановка запятых перед `а` и `но` #119

Доработки:
- Учесть переносы, скобки и теги в правиле `common/nbsp/afterShortWord` #123

Удалены правила:
- `ru/nbsp/but`
- `common/other/plusMinus`

## v3.0.0
- Правило `common/punctuation/hellip` переименовано в `ru/punctuation/hellip` и дополнено случаями с `!...`, `?...` и `...,` #116
- Сокращение с помощью тире #117
- Переименованы свойства при добавлении правила #118

## v2.14.0
- Новое правило «Неразрывный пробел в сокращениях» `ru/nbsp/abbr`  #111 @romashamin, #113

## v2.13.1
Пересборка

## v2.13.0
- Поддержка кавычек третьего уровня
- Удалён лишний метод `Typograf.prototype.data`

### Ошибки
- Неверная расстановка кавычек при вложенности #106
- Прямая речь в начале строки #107

## v2.12.1
- Некорректный пробел перед скобкой в правиле `common/space/afterPunctuation` #103 @f213

## v2.12.0
- Возможность включать и выключать правила с помощью свойств `disable` и `enable` в конструкторе Typograf
- Доработки по расстановке кавычек

## v2.11.1
- Некорректная расстановка кавычек рядом с тегами #100
- Добавлен Changelog

Исправлен ошибочный порядок выполнения правил:
- `common/html/pbr`
- `common/html/nbr`
- `common/nbsp/nowrap`

## v2.11.0
- В описании правила свойство enabled заменено на disabled
- Доработки правила common/nbsp/beforeShortLastWord
- Из bower-пакета удалены лишние файлы
- Мелкие доработки по инфраструктуре
