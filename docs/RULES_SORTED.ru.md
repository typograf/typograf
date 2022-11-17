## Правила типографа по порядку выполнения

| № | [Имя](./RULES.ru.md) | Название | Индекс ▼ | Очередь | Вкл. |
|--:|-------------------|----------|---------:|:-------:|:----:|
| 1. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Удаление символа BOM (Byte Order Mark) | -1 | start | ✓ |
| 2. | [common/symbols/arrow](../src/rules/common/symbols/arrow.js) | -> → →, <- → ← | 110 |  | ✓ |
| 3. | [common/symbols/cf](../src/rules/common/symbols/cf.js) | Добавление ° к C и F | 110 |  | ✓ |
| 4. | [common/symbols/copy](../src/rules/common/symbols/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 110 |  | ✓ |
| 5. | [ru/symbols/NN](../src/rules/ru/symbols/NN.js) | №№ → № | 110 |  | ✓ |
| 6. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/4 → ¾ | 150 |  | ✓ |
| 7. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 150 |  | ✓ |
| 8. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 150 |  | ✓ |
| 9. | [ru/number/comma](../src/rules/ru/number/comma.js) | Замена точки на запятую в числах | 150 |  | ✓ |
| 10. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 150 |  | ✓ |
| 11. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Замена таба на 4 пробела | 205 |  | ✓ |
| 12. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Удаление пробелов и переносов строк в начале текста | 206 |  | ✓ |
| 13. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Удаление пробелов в конце строки | 207 |  | ✓ |
| 14. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Удаление пробелов и переносов строк в конце текста | 207 |  | ✓ |
| 15. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Удаление повторяющихся переносов строки | 209 |  | ✓ |
| 16. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Удаление повторяющихся пробелов между символами | 209 |  | ✓ |
| 17. | [common/space/afterColon](../src/rules/common/space/afterColon.js) | Пробел после двоеточия | 210 |  | ✓ |
| 18. | [common/space/afterComma](../src/rules/common/space/afterComma.js) | Пробел после запятой | 210 |  | ✓ |
| 19. | [common/space/afterExclamationMark](../src/rules/common/space/afterExclamationMark.js) | Пробел после знака восклицания | 210 |  | ✓ |
| 20. | [common/space/afterQuestionMark](../src/rules/common/space/afterQuestionMark.js) | Пробел после знака вопроса | 210 |  | ✓ |
| 21. | [common/space/afterSemicolon](../src/rules/common/space/afterSemicolon.js) | Пробел после точки с запятой | 210 |  | ✓ |
| 22. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Пробел перед открывающей скобкой | 210 |  | ✓ |
| 23. | [common/space/bracket](../src/rules/common/space/bracket.js) | Удаление лишних пробелов после открывающей и перед закрывающей скобкой | 210 |  | ✓ |
| 24. | [common/space/delBeforeDot](../src/rules/common/space/delBeforeDot.js) | Удаление пробела перед точкой | 210 |  | ✓ |
| 25. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Удаление пробела перед %, ‰ и ‱ | 210 |  | ✓ |
| 26. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Удаление пробелов перед знаками пунктуации | 210 |  | ✓ |
| 27. | [common/space/delBetweenExclamationMarks](../src/rules/common/space/delBetweenExclamationMarks.js) | Удаление пробелов между знаками восклицания | 210 |  | ✓ |
| 28. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Удаление пробелов в начале строки | 210 |  |  |
| 29. | [common/space/insertFinalNewline](../src/rules/common/space/insertFinalNewline.js) | Вставить в конце текста перевод строки | 210 | end |  |
| 30. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Удаление лишних пробелов после открывающей и перед закрывающей квадратной скобкой | 210 |  | ✓ |
| 31. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.js) | Пробел после «...», «!..» и «?..» | 210 |  | ✓ |
| 32. | [ru/space/year](../src/rules/ru/space/year.js) | Пробел между числом и словом «год» | 210 |  | ✓ |
| 33. | [en-US/dash/main](../src/rules/en-US/dash/main.js) | Замена дефиса на длинное тире | 305 |  | ✓ |
| 34. | [ru/dash/main](../src/rules/ru/dash/main.js) | Замена дефиса на тире | 305 |  | ✓ |
| 35. | [ru/dash/centuries](../src/rules/ru/dash/centuries.js) | Замена дефиса на тире в веках | 310 |  | ✓ |
| 36. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.js) | Тире между днями одного месяца | 310 |  | ✓ |
| 37. | [ru/dash/de](../src/rules/ru/dash/de.js) | Дефис перед «де» | 310 |  |  |
| 38. | [ru/dash/decade](../src/rules/ru/dash/decade.js) | Тире в десятилетиях, 80—90-е гг. | 310 |  | ✓ |
| 39. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.js) | Тире в прямой речи | 310 |  | ✓ |
| 40. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Дефис между «из-под» | 310 |  | ✓ |
| 41. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Дефис между «из-за» | 310 |  | ✓ |
| 42. | [ru/dash/ka](../src/rules/ru/dash/ka.js) | Дефис перед «ка» и «кась» | 310 |  | ✓ |
| 43. | [ru/dash/kakto](../src/rules/ru/dash/kakto.js) | Дефис для «как то» | 310 |  | ✓ |
| 44. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Дефис после «кое» и «кой» | 310 |  | ✓ |
| 45. | [ru/dash/month](../src/rules/ru/dash/month.js) | Тире между месяцами | 310 |  | ✓ |
| 46. | [ru/dash/surname](../src/rules/ru/dash/surname.js) | Сокращения с помощью тире | 310 |  | ✓ |
| 47. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Дефис между «верно-таки» и т. д. | 310 |  | ✓ |
| 48. | [ru/dash/time](../src/rules/ru/dash/time.js) | Тире в интервалах времени | 310 |  | ✓ |
| 49. | [ru/dash/to](../src/rules/ru/dash/to.js) | Дефис перед «то», «либо», «нибудь» | 310 |  | ✓ |
| 50. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Тире между днями недели | 310 |  | ✓ |
| 51. | [ru/dash/years](../src/rules/ru/dash/years.js) | Замена дефиса на тире в годах | 310 |  | ✓ |
| 52. | [common/punctuation/apostrophe](../src/rules/common/punctuation/apostrophe.js) | Расстановка правильного апострофа | 410 |  | ✓ |
| 53. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Удаление двойной пунктуации | 410 |  | ✓ |
| 54. | [common/punctuation/hellip](../src/rules/common/punctuation/hellip.js) | Замена трёх точек на многоточие | 410 |  | ✓ |
| 55. | [common/punctuation/quote](../src/rules/common/punctuation/quote.js) | Расстановка кавычек правильного вида | 410 |  | ✓ |
| 56. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Расстановка запятых перед «а» и «но» | 410 |  | ✓ |
| 57. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.js) | !! → ! | 410 |  | ✓ |
| 58. | [ru/punctuation/hellipQuestion](../src/rules/ru/punctuation/hellipQuestion.js) | «?…» → «?..», «!…» → «!..», «…,» → «…» | 410 |  | ✓ |
| 59. | [common/punctuation/quoteLink](../src/rules/common/punctuation/quoteLink.js) | Вынос кавычек за пределы ссылки | 415 | show-safe-tags-html | ✓ |
| 60. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.js) | !? → ?! | 415 |  | ✓ |
| 61. | [common/number/digitGrouping](../src/rules/common/number/digitGrouping.js) | Разбивать длинные числа по разрядам | 460 |  |  |
| 62. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Нераз. пробел между числом и словом | 510 |  |  |
| 63. | [common/nbsp/afterParagraphMark](../src/rules/common/nbsp/afterParagraphMark.js) | Нераз. пробел после ¶ | 510 |  | ✓ |
| 64. | [common/nbsp/afterSectionMark](../src/rules/common/nbsp/afterSectionMark.js) | Нераз. узкий пробел после § | 510 |  | ✓ |
| 65. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Нераз. пробел после короткого слова | 510 |  | ✓ |
| 66. | [common/nbsp/beforeShortLastNumber](../src/rules/common/nbsp/beforeShortLastNumber.js) | Нераз. пробел перед числом (не более 2 цифр) в конце предложения | 510 |  | ✓ |
| 67. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Нераз. пробел перед последним коротким словом в предложении | 510 |  | ✓ |
| 68. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Нераз. пробел перед lpi и dpi | 510 |  | ✓ |
| 69. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr | 510 | end | ✓ |
| 70. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Замена неразрывного пробела на обычный перед типографированием | 510 | utf |  |
| 71. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Нераз. пробел в сокращениях, например, в «т. д.» | 510 |  | ✓ |
| 72. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Расстановка нераз. пробела после «г.», «обл.», «ул.», «пр.», «кв.» и др. | 510 |  | ✓ |
| 73. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Нераз. узкий пробел после № | 510 |  | ✓ |
| 74. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.js) | Удаление пробелов и лишних точек в «вв.» | 510 |  | ✓ |
| 75. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Нераз. пробел между числом и месяцем | 510 |  | ✓ |
| 76. | [ru/nbsp/initials](../src/rules/ru/nbsp/initials.js) | Привязка инициалов к фамилии | 510 |  | ✓ |
| 77. | [ru/nbsp/mln](../src/rules/ru/nbsp/mln.js) | Неразр. пробел между числом и «тыс.», «млн», «млрд» и «трлн» | 510 |  | ✓ |
| 78. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Нераз. пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ | 510 |  | ✓ |
| 79. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Нераз. пробел после «стр.», «гл.», «рис.», «илл.» | 510 |  | ✓ |
| 80. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Нераз. пробел в P. S. и P. P. S. | 510 |  | ✓ |
| 81. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.js) | Нераз. пробел перед «руб.» и «коп.» | 510 |  | ✓ |
| 82. | [ru/nbsp/see](../src/rules/ru/nbsp/see.js) | Нераз. пробел после сокращений «см.» и «им.» | 510 |  | ✓ |
| 83. | [ru/nbsp/year](../src/rules/ru/nbsp/year.js) | Нераз. пробел после XXXX г. (2012 г.) | 510 |  | ✓ |
| 84. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Нераз. пробел перед «ли», «ль», «же», «бы», «б» | 515 |  | ✓ |
| 85. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | м2 → м², м3 → м³ и нераз. пробел | 515 |  | ✓ |
| 86. | [ru/nbsp/years](../src/rules/ru/nbsp/years.js) | г.г. → гг. и нераз. пробел | 515 |  | ✓ |
| 87. | [ru/money/currency](../src/rules/ru/money/currency.js) | Символ валюты ($, €, ¥, Ұ, £ и ₤) после числа, $100 → 100 $ | 710 |  |  |
| 88. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 710 |  |  |
| 89. | [ru/date/fromISO](../src/rules/ru/date/fromISO.js) | Преобразование дат YYYY-MM-DD к виду DD.MM.YYYY | 810 |  | ✓ |
| 90. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 810 |  | ✓ |
| 91. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Удаление повтора слова | 910 |  |  |
| 92. | [ru/other/accent](../src/rules/ru/other/accent.js) | Замена заглавной буквы на строчную с добавлением ударения | 910 |  |  |
| 93. | [ru/other/phone-number](../src/rules/ru/other/phone-number.js) | Форматирование телефонных номеров | 910 |  | ✓ |
| 94. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | для открывающей скобки | 1010 |  |  |
| 95. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | для запятой | 1010 |  |  |
| 96. | [ru/optalign/quote](../src/rules/ru/optalign/quote.js) | для открывающей кавычки | 1010 |  |  |
| 97. | [ru/typo/switchingKeyboardLayout](../src/rules/ru/typo/switchingKeyboardLayout.js) | Замена латинских букв на русские. Опечатки, возникающие при переключении клавиатурной раскладки | 1110 |  | ✓ |
| 98. | [common/html/e-mail](../src/rules/common/html/e-mail.js) | Расстановка ссылок для эл. почты | 1210 | end |  |
| 99. | [common/html/processingAttrs](../src/rules/common/html/processingAttrs.js) | Типографирование HTML-атрибутов | 1210 | hide-safe-tags-own |  |
| 100. | [common/html/quot](../src/rules/common/html/quot.js) | &⁠quot; → " | 1210 | hide-safe-tags | ✓ |
| 101. | [common/html/url](../src/rules/common/html/url.js) | Расстановка ссылок | 1210 | end |  |
| 102. | [common/html/p](../src/rules/common/html/p.js) | Расстановка абзацев | 1215 | end |  |
| 103. | [common/html/nbr](../src/rules/common/html/nbr.js) | Замена перевода строки на <br/> | 1220 | end |  |
| 104. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Удаление HTML-тегов | 1309 | end |  |
| 105. | [common/html/escape](../src/rules/common/html/escape.js) | Экранирование HTML | 1310 | end |  |
