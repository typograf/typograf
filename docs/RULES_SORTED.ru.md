## Правила типографа по порядку выполнения

| № | [Имя](./RULES.ru.md) | Название | Индекс ▼ | Очередь | Вкл. |
|--:|-------------------|----------|---------:|:-------:|:----:|
| 1. | [common/html/e-mail](../src/rules/common/html/e-mail.js) | Расстановка ссылок для эл. почты | undefined | end |  |
| 2. | [common/html/escape](../src/rules/common/html/escape.js) | Экранирование HTML | undefined | end |  |
| 3. | [common/html/nbr](../src/rules/common/html/nbr.js) | Замена перевода строки на <br/> | undefined | end |  |
| 4. | [common/html/p](../src/rules/common/html/p.js) | Расстановка абзацев | undefined | end |  |
| 5. | [common/html/processingAttrs](../src/rules/common/html/processingAttrs.js) | Типографирование HTML-атрибутов | undefined | hide-safe-tags-own |  |
| 6. | [common/html/quot](../src/rules/common/html/quot.js) | &⁠quot; → " | undefined | hide-safe-tags | ✓ |
| 7. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Удаление HTML-тегов | undefined | end |  |
| 8. | [common/html/url](../src/rules/common/html/url.js) | Расстановка ссылок | undefined | end |  |
| 9. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Нераз. пробел между числом и словом | undefined |  |  |
| 10. | [common/nbsp/afterParagraphMark](../src/rules/common/nbsp/afterParagraphMark.js) | Нераз. пробел после ¶ | undefined |  | ✓ |
| 11. | [common/nbsp/afterSectionMark](../src/rules/common/nbsp/afterSectionMark.js) | Нераз. узкий пробел после § | undefined |  | ✓ |
| 12. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Нераз. пробел после короткого слова | undefined |  | ✓ |
| 13. | [common/nbsp/beforeShortLastNumber](../src/rules/common/nbsp/beforeShortLastNumber.js) | Нераз. пробел перед числом (не более 2 цифр) в конце предложения | undefined |  | ✓ |
| 14. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Нераз. пробел перед последним коротким словом в предложении | undefined |  | ✓ |
| 15. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Нераз. пробел перед lpi и dpi | undefined |  | ✓ |
| 16. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr | undefined | end | ✓ |
| 17. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Замена неразрывного пробела на обычный перед типографированием | undefined | utf |  |
| 18. | [common/number/digitGrouping](../src/rules/common/number/digitGrouping.js) | Разбивать длинные числа по разрядам | undefined |  |  |
| 19. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/4 → ¾ | undefined |  | ✓ |
| 20. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | undefined |  | ✓ |
| 21. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | undefined |  | ✓ |
| 22. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Удаление символа BOM (Byte Order Mark) | undefined | start | ✓ |
| 23. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Удаление повтора слова | undefined |  |  |
| 24. | [common/punctuation/apostrophe](../src/rules/common/punctuation/apostrophe.js) | Расстановка правильного апострофа | undefined |  | ✓ |
| 25. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Удаление двойной пунктуации | undefined |  | ✓ |
| 26. | [common/punctuation/hellip](../src/rules/common/punctuation/hellip.js) | Замена трёх точек на многоточие | undefined |  | ✓ |
| 27. | [common/punctuation/quote](../src/rules/common/punctuation/quote.js) | Расстановка кавычек правильного вида | undefined |  | ✓ |
| 28. | [common/punctuation/quoteLink](../src/rules/common/punctuation/quoteLink.js) | Вынос кавычек за пределы ссылки | undefined | show-safe-tags-html | ✓ |
| 29. | [common/space/afterColon](../src/rules/common/space/afterColon.js) | Пробел после двоеточия | undefined |  | ✓ |
| 30. | [common/space/afterComma](../src/rules/common/space/afterComma.js) | Пробел после запятой | undefined |  | ✓ |
| 31. | [common/space/afterExclamationMark](../src/rules/common/space/afterExclamationMark.js) | Пробел после знака восклицания | undefined |  | ✓ |
| 32. | [common/space/afterQuestionMark](../src/rules/common/space/afterQuestionMark.js) | Пробел после знака вопроса | undefined |  | ✓ |
| 33. | [common/space/afterSemicolon](../src/rules/common/space/afterSemicolon.js) | Пробел после точки с запятой | undefined |  | ✓ |
| 34. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Пробел перед открывающей скобкой | undefined |  | ✓ |
| 35. | [common/space/bracket](../src/rules/common/space/bracket.js) | Удаление лишних пробелов после открывающей и перед закрывающей скобкой | undefined |  | ✓ |
| 36. | [common/space/delBeforeDot](../src/rules/common/space/delBeforeDot.js) | Удаление пробела перед точкой | undefined |  | ✓ |
| 37. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Удаление пробела перед %, ‰ и ‱ | undefined |  | ✓ |
| 38. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Удаление пробелов перед знаками пунктуации | undefined |  | ✓ |
| 39. | [common/space/delBetweenExclamationMarks](../src/rules/common/space/delBetweenExclamationMarks.js) | Удаление пробелов между знаками восклицания | undefined |  | ✓ |
| 40. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Удаление пробелов в начале строки | undefined |  |  |
| 41. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Удаление повторяющихся переносов строки | undefined |  | ✓ |
| 42. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Удаление повторяющихся пробелов между символами | undefined |  | ✓ |
| 43. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Удаление пробелов в конце строки | undefined |  | ✓ |
| 44. | [common/space/insertFinalNewline](../src/rules/common/space/insertFinalNewline.js) | Вставить в конце текста перевод строки | undefined | end |  |
| 45. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Замена таба на 4 пробела | undefined |  | ✓ |
| 46. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Удаление лишних пробелов после открывающей и перед закрывающей квадратной скобкой | undefined |  | ✓ |
| 47. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Удаление пробелов и переносов строк в начале текста | undefined |  | ✓ |
| 48. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Удаление пробелов и переносов строк в конце текста | undefined |  | ✓ |
| 49. | [common/symbols/arrow](../src/rules/common/symbols/arrow.js) | -> → →, <- → ← | undefined |  | ✓ |
| 50. | [common/symbols/cf](../src/rules/common/symbols/cf.js) | Добавление ° к C и F | undefined |  | ✓ |
| 51. | [common/symbols/copy](../src/rules/common/symbols/copy.js) | (c) → ©, (tm) → ™, (r) → ® | undefined |  | ✓ |
| 52. | [en-US/dash/main](../src/rules/en-US/dash/main.js) | Замена дефиса на длинное тире | undefined |  | ✓ |
| 53. | [ru/dash/centuries](../src/rules/ru/dash/centuries.js) | Замена дефиса на тире в веках | undefined |  | ✓ |
| 54. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.js) | Тире между днями одного месяца | undefined |  | ✓ |
| 55. | [ru/dash/de](../src/rules/ru/dash/de.js) | Дефис перед «де» | undefined |  |  |
| 56. | [ru/dash/decade](../src/rules/ru/dash/decade.js) | Тире в десятилетиях, 80—90-е гг. | undefined |  | ✓ |
| 57. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.js) | Тире в прямой речи | undefined |  | ✓ |
| 58. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Дефис между «из-под» | undefined |  | ✓ |
| 59. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Дефис между «из-за» | undefined |  | ✓ |
| 60. | [ru/dash/ka](../src/rules/ru/dash/ka.js) | Дефис перед «ка» и «кась» | undefined |  | ✓ |
| 61. | [ru/dash/kakto](../src/rules/ru/dash/kakto.js) | Дефис для «как то» | undefined |  | ✓ |
| 62. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Дефис после «кое» и «кой» | undefined |  | ✓ |
| 63. | [ru/dash/main](../src/rules/ru/dash/main.js) | Замена дефиса на тире | undefined |  | ✓ |
| 64. | [ru/dash/month](../src/rules/ru/dash/month.js) | Тире между месяцами | undefined |  | ✓ |
| 65. | [ru/dash/surname](../src/rules/ru/dash/surname.js) | Сокращения с помощью тире | undefined |  | ✓ |
| 66. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Дефис между «верно-таки» и т. д. | undefined |  | ✓ |
| 67. | [ru/dash/time](../src/rules/ru/dash/time.js) | Тире в интервалах времени | undefined |  | ✓ |
| 68. | [ru/dash/to](../src/rules/ru/dash/to.js) | Дефис перед «то», «либо», «нибудь» | undefined |  | ✓ |
| 69. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Тире между днями недели | undefined |  | ✓ |
| 70. | [ru/dash/years](../src/rules/ru/dash/years.js) | Замена дефиса на тире в годах | undefined |  | ✓ |
| 71. | [ru/date/fromISO](../src/rules/ru/date/fromISO.js) | Преобразование дат YYYY-MM-DD к виду DD.MM.YYYY | undefined |  | ✓ |
| 72. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | undefined |  | ✓ |
| 73. | [ru/money/currency](../src/rules/ru/money/currency.js) | Символ валюты ($, €, ¥, Ұ, £ и ₤) после числа, $100 → 100 $ | undefined |  |  |
| 74. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | undefined |  |  |
| 75. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Нераз. пробел в сокращениях, например, в «т. д.» | undefined |  | ✓ |
| 76. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Расстановка нераз. пробела после «г.», «обл.», «ул.», «пр.», «кв.» и др. | undefined |  | ✓ |
| 77. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Нераз. узкий пробел после № | undefined |  | ✓ |
| 78. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Нераз. пробел перед «ли», «ль», «же», «бы», «б» | undefined |  | ✓ |
| 79. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.js) | Удаление пробелов и лишних точек в «вв.» | undefined |  | ✓ |
| 80. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Нераз. пробел между числом и месяцем | undefined |  | ✓ |
| 81. | [ru/nbsp/initials](../src/rules/ru/nbsp/initials.js) | Привязка инициалов к фамилии | undefined |  | ✓ |
| 82. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | м2 → м², м3 → м³ и нераз. пробел | undefined |  | ✓ |
| 83. | [ru/nbsp/mln](../src/rules/ru/nbsp/mln.js) | Неразр. пробел между числом и «тыс.», «млн», «млрд» и «трлн» | undefined |  | ✓ |
| 84. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Нераз. пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ | undefined |  | ✓ |
| 85. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Нераз. пробел после «стр.», «гл.», «рис.», «илл.» | undefined |  | ✓ |
| 86. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Нераз. пробел в P. S. и P. P. S. | undefined |  | ✓ |
| 87. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.js) | Нераз. пробел перед «руб.» и «коп.» | undefined |  | ✓ |
| 88. | [ru/nbsp/see](../src/rules/ru/nbsp/see.js) | Нераз. пробел после сокращений «см.» и «им.» | undefined |  | ✓ |
| 89. | [ru/nbsp/year](../src/rules/ru/nbsp/year.js) | Нераз. пробел после XXXX г. (2012 г.) | undefined |  | ✓ |
| 90. | [ru/nbsp/years](../src/rules/ru/nbsp/years.js) | г.г. → гг. и нераз. пробел | undefined |  | ✓ |
| 91. | [ru/number/comma](../src/rules/ru/number/comma.js) | Замена точки на запятую в числах | undefined |  | ✓ |
| 92. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | undefined |  | ✓ |
| 93. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | для открывающей скобки | undefined |  |  |
| 94. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | для запятой | undefined |  |  |
| 95. | [ru/optalign/quote](../src/rules/ru/optalign/quote.js) | для открывающей кавычки | undefined |  |  |
| 96. | [ru/other/accent](../src/rules/ru/other/accent.js) | Замена заглавной буквы на строчную с добавлением ударения | undefined |  |  |
| 97. | [ru/other/phone-number](../src/rules/ru/other/phone-number.js) | Форматирование телефонных номеров | undefined |  | ✓ |
| 98. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Расстановка запятых перед «а» и «но» | undefined |  | ✓ |
| 99. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.js) | !! → ! | undefined |  | ✓ |
| 100. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.js) | !? → ?! | undefined |  | ✓ |
| 101. | [ru/punctuation/hellipQuestion](../src/rules/ru/punctuation/hellipQuestion.js) | «?…» → «?..», «!…» → «!..», «…,» → «…» | undefined |  | ✓ |
| 102. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.js) | Пробел после «...», «!..» и «?..» | undefined |  | ✓ |
| 103. | [ru/space/year](../src/rules/ru/space/year.js) | Пробел между числом и словом «год» | undefined |  | ✓ |
| 104. | [ru/symbols/NN](../src/rules/ru/symbols/NN.js) | №№ → № | undefined |  | ✓ |
| 105. | [ru/typo/switchingKeyboardLayout](../src/rules/ru/typo/switchingKeyboardLayout.js) | Замена латинских букв на русские. Опечатки, возникающие при переключении клавиатурной раскладки | undefined |  | ✓ |
