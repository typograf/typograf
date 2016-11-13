## Правила типографа

| № | Имя ▼ | Название | [Индекс](./RULES_SORTED.ru.md) | Очередь | Вкл. |
|--:|-------|----------|----------------------------:|:-------:|:----:|
| 1. | [common/html/e-mail](../src/rules/common/html/e-mail.js) | Расстановка ссылок для эл. почты | 1210 | end |  |
| 2. | [common/html/escape](../src/rules/common/html/escape.js) | Экранирование HTML | 1310 | end |  |
| 3. | [common/html/nbr](../src/rules/common/html/nbr.js) | Замена перевода строки на <br/> | 1215 | end |  |
| 4. | [common/html/p](../src/rules/common/html/p.js) | Расстановка абзацев | 1210 | end |  |
| 5. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Удаление HTML-тегов | 1309 | end |  |
| 6. | [common/html/url](../src/rules/common/html/url.js) | Расстановка ссылок | 1210 | end |  |
| 7. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Нераз. пробел между числом и словом | 510 |  |  |
| 8. | [common/nbsp/afterParagraph](../src/rules/common/nbsp/afterParagraph.js) | Нераз. узкий пробел после § | 510 |  | ✓ |
| 9. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Нераз. пробел после короткого слова | 510 |  | ✓ |
| 10. | [common/nbsp/beforeShortLastNumber](../src/rules/common/nbsp/beforeShortLastNumber.js) | Нераз. пробел перед числом (не более 2 цифр) в конце предложения | 510 |  | ✓ |
| 11. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Нераз. пробел перед последним коротким словом в предложении | 510 |  | ✓ |
| 12. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Нераз. пробел перед lpi и dpi | 510 |  | ✓ |
| 13. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr | 510 | end | ✓ |
| 14. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Замена неразрывного пробела на обычный | 510 | utf |  |
| 15. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/3 → ¾ | 610 |  | ✓ |
| 16. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 610 |  | ✓ |
| 17. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 610 |  | ✓ |
| 18. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Удаление символа BOM (Byte Order Mark) | -1 | start | ✓ |
| 19. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Удаление повтора слова | 910 |  |  |
| 20. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Удаление двойной пунктуации | 410 |  | ✓ |
| 21. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | Пробел после знаков пунктуации | 210 |  | ✓ |
| 22. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Пробел перед открывающей скобкой | 210 |  | ✓ |
| 23. | [common/space/bracket](../src/rules/common/space/bracket.js) | Удаление лишних пробелов после открывающей и перед закрывающей скобки | 210 |  | ✓ |
| 24. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Удаление пробела перед %, ‰ и ‱ | 210 |  | ✓ |
| 25. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Удаление пробелов перед знаками пунктуации | 210 |  | ✓ |
| 26. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Удаление пробелов в начале строки | 210 |  |  |
| 27. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Удаление повторяющихся переносов строки (от трёх и более) | 209 |  | ✓ |
| 28. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Удаление повторяющихся пробелов между символами | 209 |  | ✓ |
| 29. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Удаление пробелов в конце строки | 207 |  | ✓ |
| 30. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Замена таба на 4 пробела | 205 |  | ✓ |
| 31. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Удаление лишних пробелов после открывающей и перед закрывающей квадратной скобки | 210 |  | ✓ |
| 32. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Удаление пробелов и переносов строк в начале текста | 206 |  | ✓ |
| 33. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Удаление пробелов и переносов строк в конце текста | 207 |  | ✓ |
| 34. | [common/symbols/arrow](../src/rules/common/symbols/arrow.js) | -> → →, <- → ← | 110 |  | ✓ |
| 35. | [common/symbols/cf](../src/rules/common/symbols/cf.js) | Добавление ° к C и F | 110 |  | ✓ |
| 36. | [common/symbols/copy](../src/rules/common/symbols/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 110 |  | ✓ |
| 37. | [en/punctuation/quote](../src/rules/en/punctuation/quote.js) | Расстановка кавычек в текстах на английском | 410 |  | ✓ |
| 38. | [ru/dash/centuries](../src/rules/ru/dash/centuries.js) | Замена дефиса на тире в веках | 310 |  | ✓ |
| 39. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.js) | Тире между днями одного месяца | 310 |  | ✓ |
| 40. | [ru/dash/de](../src/rules/ru/dash/de.js) | Дефис перед «де» | 310 |  |  |
| 41. | [ru/dash/decade](../src/rules/ru/dash/decade.js) | Тире в десятилетиях, 80—90-е гг. | 310 |  | ✓ |
| 42. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.js) | Тире в прямой речи | 310 |  | ✓ |
| 43. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Дефис между «из-под» | 310 |  | ✓ |
| 44. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Дефис между «из-за» | 310 |  | ✓ |
| 45. | [ru/dash/ka](../src/rules/ru/dash/ka.js) | Дефис перед «ка» и «кась» | 310 |  | ✓ |
| 46. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Дефис после «кое» и «кой» | 310 |  | ✓ |
| 47. | [ru/dash/main](../src/rules/ru/dash/main.js) | Замена дефиса на тире | 305 |  | ✓ |
| 48. | [ru/dash/month](../src/rules/ru/dash/month.js) | Тире между месяцами | 310 |  | ✓ |
| 49. | [ru/dash/surname](../src/rules/ru/dash/surname.js) | Сокращения с помощью тире | 310 |  | ✓ |
| 50. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Дефис между «верно-таки» и т. д. | 310 |  | ✓ |
| 51. | [ru/dash/time](../src/rules/ru/dash/time.js) | Тире в интервалах времени | 310 |  | ✓ |
| 52. | [ru/dash/to](../src/rules/ru/dash/to.js) | Дефис перед «то», «либо», «нибудь» | 310 |  | ✓ |
| 53. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Тире между днями недели | 310 |  | ✓ |
| 54. | [ru/dash/years](../src/rules/ru/dash/years.js) | Замена дефиса на тире в годах | 310 |  | ✓ |
| 55. | [ru/date/fromISO](../src/rules/ru/date/fromISO.js) | Преобразование дат YYYY-MM-DD к виду DD.MM.YYYY | 810 |  | ✓ |
| 56. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 810 |  | ✓ |
| 57. | [ru/money/currency](../src/rules/ru/money/currency.js) | Символ валюты ($, €, ¥, Ұ, £ и ₤) после числа, $100 → 100 $ | 710 |  | ✓ |
| 58. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 710 |  |  |
| 59. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Нераз. пробел в сокращениях, например, в «т. д.» | 510 |  | ✓ |
| 60. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Расстановка неразрывного пробела после «г.», «обл.», «ул.», «пр.», «кв.» и др. | 510 |  | ✓ |
| 61. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Нераз. узкий пробел после № | 510 |  | ✓ |
| 62. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Нераз. пробел перед «ли», «ль», «же», «бы», «б» | 515 |  | ✓ |
| 63. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.js) | Удаление пробелов и лишних точек в «вв.» | 510 |  | ✓ |
| 64. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Нераз. пробел между числом и месяцем | 510 |  | ✓ |
| 65. | [ru/nbsp/groupNumbers](../src/rules/ru/nbsp/groupNumbers.js) | Замена пробела на неразрывный узкий пробел в группах чисел | 510 |  | ✓ |
| 66. | [ru/nbsp/initials](../src/rules/ru/nbsp/initials.js) | Привязка инициалов к фамилии | 510 |  | ✓ |
| 67. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | м2 → м², м3 → м³ и нераз. пробел | 515 |  | ✓ |
| 68. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Нераз. пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ | 510 |  | ✓ |
| 69. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Нераз. пробел после «стр.», «гл.», «рис.», «илл.» | 510 |  | ✓ |
| 70. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Нераз. пробел в P. S. и P. P. S. | 510 |  | ✓ |
| 71. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.js) | Нераз. пробел перед «руб.» и «коп.» | 510 |  | ✓ |
| 72. | [ru/nbsp/see](../src/rules/ru/nbsp/see.js) | Нераз. пробел после сокращений «см.» и «им.» | 510 |  | ✓ |
| 73. | [ru/nbsp/year](../src/rules/ru/nbsp/year.js) | Нераз. пробел после XXXX г. (2012 г.) | 510 |  | ✓ |
| 74. | [ru/nbsp/years](../src/rules/ru/nbsp/years.js) | г.г. → гг. и нераз. пробел | 515 |  | ✓ |
| 75. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 610 |  | ✓ |
| 76. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | для открывающей скобки | 1010 |  |  |
| 77. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | для запятой | 1010 |  |  |
| 78. | [ru/optalign/quote](../src/rules/ru/optalign/quote.js) | для открывающей кавычки | 1010 |  |  |
| 79. | [ru/other/accent](../src/rules/ru/other/accent.js) | Замена заглавной буквы на строчную с добавлением ударения | 910 |  |  |
| 80. | [ru/other/phone-number](../src/rules/ru/other/phone-number.js) | Форматирование телефонных номеров | 910 |  | ✓ |
| 81. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Расстановка запятых перед «а» и «но» | 410 |  | ✓ |
| 82. | [ru/punctuation/apostrophe](../src/rules/ru/punctuation/apostrophe.js) | Расстановка правильного апострофа | 405 |  | ✓ |
| 83. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.js) | !! → ! | 410 |  | ✓ |
| 84. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.js) | !? → ?! | 415 |  | ✓ |
| 85. | [ru/punctuation/hellip](../src/rules/ru/punctuation/hellip.js) | Три точки на многоточие, ?... → ?.. и пр. | 410 |  | ✓ |
| 86. | [ru/punctuation/quote](../src/rules/ru/punctuation/quote.js) | Расстановка кавычек в текстах на русском | 410 |  | ✓ |
| 87. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.js) | Пробел после ..., !.. и ?.. | 210 |  | ✓ |
| 88. | [ru/space/year](../src/rules/ru/space/year.js) | Пробел между числом и словом «год» | 210 |  | ✓ |
| 89. | [ru/typo/switchingKeyboardLayout](../src/rules/ru/typo/switchingKeyboardLayout.js) | Замена латинских букв на русские. Опечатки, возникающие при переключении клавиатурной раскладки | 1110 |  | ✓ |
