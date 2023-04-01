## Правила типографа

| № | Имя ▼ | Название | [Индекс](./RULES_SORTED.ru.md) | Очередь | Вкл. |
|--:|-------|----------|----------------------------:|:-------:|:----:|
| 1. | [common/html/e-mail](../src/rules/common/html/e-mail.ts) | Расстановка ссылок для эл. почты | 1210 | end |  |
| 2. | [common/html/escape](../src/rules/common/html/escape.ts) | Экранирование HTML | 1310 | end |  |
| 3. | [common/html/nbr](../src/rules/common/html/nbr.ts) | Замена перевода строки на <br/> | 1220 | end |  |
| 4. | [common/html/p](../src/rules/common/html/p.ts) | Расстановка абзацев | 1215 | end |  |
| 5. | [common/html/processingAttrs](../src/rules/common/html/processingAttrs.ts) | Типографирование HTML-атрибутов | 1210 | hide-safe-tags-own |  |
| 6. | [common/html/quot](../src/rules/common/html/quot.ts) | &⁠quot; → " | 1210 | hide-safe-tags | ✓ |
| 7. | [common/html/stripTags](../src/rules/common/html/stripTags.ts) | Удаление HTML-тегов | 1309 | end |  |
| 8. | [common/html/url](../src/rules/common/html/url.ts) | Расстановка ссылок | 1210 | end |  |
| 9. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.ts) | Нераз. пробел между числом и словом | 510 | default |  |
| 10. | [common/nbsp/afterParagraphMark](../src/rules/common/nbsp/afterParagraphMark.ts) | Нераз. пробел после ¶ | 510 | default | ✓ |
| 11. | [common/nbsp/afterSectionMark](../src/rules/common/nbsp/afterSectionMark.ts) | Нераз. узкий пробел после § | 510 | default | ✓ |
| 12. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.ts) | Нераз. пробел после короткого слова | 510 | default | ✓ |
| 13. | [common/nbsp/beforeShortLastNumber](../src/rules/common/nbsp/beforeShortLastNumber.ts) | Нераз. пробел перед числом (не более 2 цифр) в конце предложения | 510 | default | ✓ |
| 14. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.ts) | Нераз. пробел перед последним коротким словом в предложении | 510 | default | ✓ |
| 15. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.ts) | Нераз. пробел перед lpi и dpi | 510 | default | ✓ |
| 16. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.ts) | Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr | 510 | end | ✓ |
| 17. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.ts) | Замена неразрывного пробела на обычный перед типографированием | 510 | utf |  |
| 18. | [common/number/digitGrouping](../src/rules/common/number/digitGrouping.ts) | Разбивать длинные числа по разрядам | 460 | default |  |
| 19. | [common/number/fraction](../src/rules/common/number/fraction.ts) | 1/2 → ½, 1/4 → ¼, 3/4 → ¾ | 150 | default | ✓ |
| 20. | [common/number/mathSigns](../src/rules/common/number/mathSigns.ts) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 150 | default | ✓ |
| 21. | [common/number/times](../src/rules/common/number/times.ts) | x → × (10 x 5 → 10×5) | 150 | default | ✓ |
| 22. | [common/other/delBOM](../src/rules/common/other/delBOM.ts) | Удаление символа BOM (Byte Order Mark) | -1 | start | ✓ |
| 23. | [common/other/repeatWord](../src/rules/common/other/repeatWord.ts) | Удаление повтора слова | 910 | default |  |
| 24. | [common/punctuation/apostrophe](../src/rules/common/punctuation/apostrophe.ts) | Расстановка правильного апострофа | 410 | default | ✓ |
| 25. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.ts) | Удаление двойной пунктуации | 410 | default | ✓ |
| 26. | [common/punctuation/hellip](../src/rules/common/punctuation/hellip.ts) | Замена трёх точек на многоточие | 410 | default | ✓ |
| 27. | [common/punctuation/quote](../src/rules/common/punctuation/quote.ts) | Расстановка кавычек правильного вида | 410 | default | ✓ |
| 28. | [common/punctuation/quoteLink](../src/rules/common/punctuation/quoteLink.ts) | Вынос кавычек за пределы ссылки | 415 | show-safe-tags-html | ✓ |
| 29. | [common/space/afterColon](../src/rules/common/space/afterColon.ts) | Пробел после двоеточия | 210 | default | ✓ |
| 30. | [common/space/afterComma](../src/rules/common/space/afterComma.ts) | Пробел после запятой | 210 | default | ✓ |
| 31. | [common/space/afterExclamationMark](../src/rules/common/space/afterExclamationMark.ts) | Пробел после знака восклицания | 210 | default | ✓ |
| 32. | [common/space/afterQuestionMark](../src/rules/common/space/afterQuestionMark.ts) | Пробел после знака вопроса | 210 | default | ✓ |
| 33. | [common/space/afterSemicolon](../src/rules/common/space/afterSemicolon.ts) | Пробел после точки с запятой | 210 | default | ✓ |
| 34. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.ts) | Пробел перед открывающей скобкой | 210 | default | ✓ |
| 35. | [common/space/bracket](../src/rules/common/space/bracket.ts) | Удаление лишних пробелов после открывающей и перед закрывающей скобкой | 210 | default | ✓ |
| 36. | [common/space/delBeforeDot](../src/rules/common/space/delBeforeDot.ts) | Удаление пробела перед точкой | 210 | default | ✓ |
| 37. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.ts) | Удаление пробела перед %, ‰ и ‱ | 210 | default | ✓ |
| 38. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.ts) | Удаление пробелов перед знаками пунктуации | 210 | default | ✓ |
| 39. | [common/space/delBetweenExclamationMarks](../src/rules/common/space/delBetweenExclamationMarks.ts) | Удаление пробелов между знаками восклицания | 210 | default | ✓ |
| 40. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.ts) | Удаление пробелов в начале строки | 210 | default |  |
| 41. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.ts) | Удаление повторяющихся переносов строки | 209 | default | ✓ |
| 42. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.ts) | Удаление повторяющихся пробелов между символами | 209 | default | ✓ |
| 43. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.ts) | Удаление пробелов в конце строки | 207 | default | ✓ |
| 44. | [common/space/insertFinalNewline](../src/rules/common/space/insertFinalNewline.ts) | Вставить в конце текста перевод строки | 210 | end |  |
| 45. | [common/space/replaceTab](../src/rules/common/space/replaceTab.ts) | Замена таба на 4 пробела | 205 | default | ✓ |
| 46. | [common/space/squareBracket](../src/rules/common/space/squareBracket.ts) | Удаление лишних пробелов после открывающей и перед закрывающей квадратной скобкой | 210 | default | ✓ |
| 47. | [common/space/trimLeft](../src/rules/common/space/trimLeft.ts) | Удаление пробелов и переносов строк в начале текста | 206 | default | ✓ |
| 48. | [common/space/trimRight](../src/rules/common/space/trimRight.ts) | Удаление пробелов и переносов строк в конце текста | 207 | default | ✓ |
| 49. | [common/symbols/arrow](../src/rules/common/symbols/arrow.ts) | -> → →, <- → ← | 110 | default | ✓ |
| 50. | [common/symbols/cf](../src/rules/common/symbols/cf.ts) | Добавление ° к C и F | 110 | default | ✓ |
| 51. | [common/symbols/copy](../src/rules/common/symbols/copy.ts) | (c) → ©, (tm) → ™, (r) → ® | 110 | default | ✓ |
| 52. | [en-US/dash/main](../src/rules/en-US/dash/main.ts) | Замена дефиса на длинное тире | 305 | default | ✓ |
| 53. | [ru/dash/centuries](../src/rules/ru/dash/centuries.ts) | Замена дефиса на тире в веках | 310 | default | ✓ |
| 54. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.ts) | Тире между днями одного месяца | 310 | default | ✓ |
| 55. | [ru/dash/de](../src/rules/ru/dash/de.ts) | Дефис перед «де» | 310 | default |  |
| 56. | [ru/dash/decade](../src/rules/ru/dash/decade.ts) | Тире в десятилетиях, 80—90-е гг. | 310 | default | ✓ |
| 57. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.ts) | Тире в прямой речи | 310 | default | ✓ |
| 58. | [ru/dash/izpod](../src/rules/ru/dash/izpod.ts) | Дефис между «из-под» | 310 | default | ✓ |
| 59. | [ru/dash/izza](../src/rules/ru/dash/izza.ts) | Дефис между «из-за» | 310 | default | ✓ |
| 60. | [ru/dash/ka](../src/rules/ru/dash/ka.ts) | Дефис перед «ка» и «кась» | 310 | default | ✓ |
| 61. | [ru/dash/kakto](../src/rules/ru/dash/kakto.ts) | Дефис для «как то» | 310 | default | ✓ |
| 62. | [ru/dash/koe](../src/rules/ru/dash/koe.ts) | Дефис после «кое» и «кой» | 310 | default | ✓ |
| 63. | [ru/dash/main](../src/rules/ru/dash/main.ts) | Замена дефиса на тире | 305 | default | ✓ |
| 64. | [ru/dash/month](../src/rules/ru/dash/month.ts) | Тире между месяцами | 310 | default | ✓ |
| 65. | [ru/dash/surname](../src/rules/ru/dash/surname.ts) | Сокращения с помощью тире | 310 | default | ✓ |
| 66. | [ru/dash/taki](../src/rules/ru/dash/taki.ts) | Дефис между «верно-таки» и т. д. | 310 | default | ✓ |
| 67. | [ru/dash/time](../src/rules/ru/dash/time.ts) | Тире в интервалах времени | 310 | default | ✓ |
| 68. | [ru/dash/to](../src/rules/ru/dash/to.ts) | Дефис перед «то», «либо», «нибудь» | 310 | default | ✓ |
| 69. | [ru/dash/weekday](../src/rules/ru/dash/weekday.ts) | Тире между днями недели | 310 | default | ✓ |
| 70. | [ru/dash/years](../src/rules/ru/dash/years.ts) | Замена дефиса на тире в годах | 310 | default | ✓ |
| 71. | [ru/date/fromISO](../src/rules/ru/date/fromISO.ts) | Преобразование дат YYYY-MM-DD к виду DD.MM.YYYY | 810 | default | ✓ |
| 72. | [ru/date/weekday](../src/rules/ru/date/weekday.ts) | 2 Мая, Понедельник → 2 мая, понедельник | 810 | default | ✓ |
| 73. | [ru/money/currency](../src/rules/ru/money/currency.ts) | Символ валюты ($, €, ¥, Ұ, £ и ₤) после числа, $100 → 100 $ | 710 | default |  |
| 74. | [ru/money/ruble](../src/rules/ru/money/ruble.ts) | 1 руб. → 1 ₽ | 710 | default |  |
| 75. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.ts) | Нераз. пробел в сокращениях, например, в «т. д.» | 510 | default | ✓ |
| 76. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.ts) | Расстановка нераз. пробела после «г.», «обл.», «ул.», «пр.», «кв.» и др. | 510 | default | ✓ |
| 77. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.ts) | Нераз. узкий пробел после № | 510 | default | ✓ |
| 78. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.ts) | Нераз. пробел перед «ли», «ль», «же», «бы», «б» | 515 | default | ✓ |
| 79. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.ts) | Удаление пробелов и лишних точек в «вв.» | 510 | default | ✓ |
| 80. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.ts) | Нераз. пробел между числом и месяцем | 510 | default | ✓ |
| 81. | [ru/nbsp/initials](../src/rules/ru/nbsp/initials.ts) | Привязка инициалов к фамилии | 510 | default | ✓ |
| 82. | [ru/nbsp/m](../src/rules/ru/nbsp/m.ts) | м2 → м², м3 → м³ и нераз. пробел | 515 | default | ✓ |
| 83. | [ru/nbsp/mln](../src/rules/ru/nbsp/mln.ts) | Неразр. пробел между числом и «тыс.», «млн», «млрд» и «трлн» | 510 | default | ✓ |
| 84. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.ts) | Нераз. пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ | 510 | default | ✓ |
| 85. | [ru/nbsp/page](../src/rules/ru/nbsp/page.ts) | Нераз. пробел после «стр.», «гл.», «рис.», «илл.» | 510 | default | ✓ |
| 86. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.ts) | Нераз. пробел в P. S. и P. P. S. | 510 | default | ✓ |
| 87. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.ts) | Нераз. пробел перед «руб.» и «коп.» | 510 | default | ✓ |
| 88. | [ru/nbsp/see](../src/rules/ru/nbsp/see.ts) | Нераз. пробел после сокращений «см.» и «им.» | 510 | default | ✓ |
| 89. | [ru/nbsp/year](../src/rules/ru/nbsp/year.ts) | Нераз. пробел после XXXX г. (2012 г.) | 510 | default | ✓ |
| 90. | [ru/nbsp/years](../src/rules/ru/nbsp/years.ts) | г.г. → гг. и нераз. пробел | 515 | default | ✓ |
| 91. | [ru/number/comma](../src/rules/ru/number/comma.ts) | Замена точки на запятую в числах | 150 | default | ✓ |
| 92. | [ru/number/ordinals](../src/rules/ru/number/ordinals.ts) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 150 | default | ✓ |
| 93. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.ts) | для открывающей скобки | 1010 | default |  |
| 94. | [ru/optalign/comma](../src/rules/ru/optalign/comma.ts) | для запятой | 1010 | default |  |
| 95. | [ru/optalign/quote](../src/rules/ru/optalign/quote.ts) | для открывающей кавычки | 1010 | default |  |
| 96. | [ru/other/accent](../src/rules/ru/other/accent.ts) | Замена заглавной буквы на строчную с добавлением ударения | 910 | default |  |
| 97. | [ru/other/phone-number](../src/rules/ru/other/phone-number.ts) | Форматирование телефонных номеров | 910 | default | ✓ |
| 98. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.ts) | Расстановка запятых перед «а» и «но» | 410 | default | ✓ |
| 99. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.ts) | !! → ! | 410 | default | ✓ |
| 100. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.ts) | !? → ?! | 415 | default | ✓ |
| 101. | [ru/punctuation/hellipQuestion](../src/rules/ru/punctuation/hellipQuestion.ts) | «?…» → «?..», «!…» → «!..», «…,» → «…» | 410 | default | ✓ |
| 102. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.ts) | Пробел после «...», «!..» и «?..» | 210 | default | ✓ |
| 103. | [ru/space/year](../src/rules/ru/space/year.ts) | Пробел между числом и словом «год» | 210 | default | ✓ |
| 104. | [ru/symbols/NN](../src/rules/ru/symbols/NN.ts) | №№ → № | 110 | default | ✓ |
| 105. | [ru/typo/switchingKeyboardLayout](../src/rules/ru/typo/switchingKeyboardLayout.ts) | Замена латинских букв на русские. Опечатки, возникающие при переключении клавиатурной раскладки | 1110 | default | ✓ |
