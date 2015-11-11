## Правила типографа по порядку выполнения

| № | [Имя](./RULES.ru.md) | Название | Индекс ▼ | Очередь | Вкл. |
|--:|-------------------|----------|---------:|:-------:|:----:|
| 1. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Удаление символа BOM (Byte Order Mark) | -1 | start | ✓ |
| 2. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Замена неразрывного пробела на обычный | 510 | utf | ✓ |
| 3. | [common/symbols/copy](../src/rules/common/symbols/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 110 |  | ✓ |
| 4. | [common/symbols/arrow](../src/rules/common/symbols/arrow.js) | -> → →, <- → ← | 110 |  | ✓ |
| 5. | [common/symbols/cf](../src/rules/common/symbols/cf.js) | Добавление ° к C и F | 110 |  | ✓ |
| 6. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Замена таба на 4 пробела | 205 |  | ✓ |
| 7. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Удаление пробелов и переносов строк в начале текста | 206 |  | ✓ |
| 8. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Удаление пробелов в конце строки | 207 |  | ✓ |
| 9. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Удаление пробелов и переносов строк в конце текста | 207 |  | ✓ |
| 10. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Удаление повторяющихся переносов строки (от трёх и более) | 209 |  | ✓ |
| 11. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Удаление повторяющихся пробелов между символами | 209 |  | ✓ |
| 12. | [ru/space/year](../src/rules/ru/space/year.js) | Пробел между числом и словом «год» | 210 |  | ✓ |
| 13. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | Пробел после знаков пунктуации | 210 |  | ✓ |
| 14. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Пробел перед открывающей скобкой | 210 |  | ✓ |
| 15. | [common/space/bracket](../src/rules/common/space/bracket.js) | Удаление лишних пробелов после открывающей и перед закрывающей скобки | 210 |  | ✓ |
| 16. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Удаление лишних пробелов после открывающей и перед закрывающей квадратной скобки | 210 |  | ✓ |
| 17. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Удаление пробела перед %, ‰ и ‱ | 210 |  | ✓ |
| 18. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Удаление пробелов перед знаками пунктуации | 210 |  | ✓ |
| 19. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.js) | Пробел после ..., !.. и ?.. | 210 |  | ✓ |
| 20. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Удаление пробелов в начале строки | 210 |  |  |
| 21. | [ru/dash/main](../src/rules/ru/dash/main.js) | Замена дефиса на тире | 305 |  | ✓ |
| 22. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Дефис между «верно-таки» и т. д. | 310 |  | ✓ |
| 23. | [ru/dash/surname](../src/rules/ru/dash/surname.js) | Сокращения с помощью тире | 310 |  | ✓ |
| 24. | [ru/dash/month](../src/rules/ru/dash/month.js) | Тире между месяцами | 310 |  | ✓ |
| 25. | [ru/dash/kade](../src/rules/ru/dash/kade.js) | Дефис перед «ка», «де», «кась» | 310 |  | ✓ |
| 26. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Дефис после «кое» и «кой» | 310 |  | ✓ |
| 27. | [ru/dash/years](../src/rules/ru/dash/years.js) | Замена дефиса на тире в годах | 310 |  | ✓ |
| 28. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Дефис между «из-за» | 310 |  | ✓ |
| 29. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Дефис между «из-под» | 310 |  | ✓ |
| 30. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.js) | Тире в прямой речи | 310 |  | ✓ |
| 31. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Тире между днями недели | 310 |  | ✓ |
| 32. | [ru/dash/decade](../src/rules/ru/dash/decade.js) | Тире в десятилетиях, 80—90-е гг. | 310 |  | ✓ |
| 33. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.js) | Тире между днями одного месяца | 310 |  | ✓ |
| 34. | [ru/dash/to](../src/rules/ru/dash/to.js) | Дефис перед «то», «либо», «нибудь» | 310 |  | ✓ |
| 35. | [ru/dash/time](../src/rules/ru/dash/time.js) | Тире в интервалах времени | 310 |  | ✓ |
| 36. | [ru/dash/centuries](../src/rules/ru/dash/centuries.js) | Замена дефиса на тире в веках | 310 |  | ✓ |
| 37. | [ru/punctuation/apostrophe](../src/rules/ru/punctuation/apostrophe.js) | Расстановка правильного апострофа | 405 |  | ✓ |
| 38. | [en/punctuation/quote](../src/rules/en/punctuation/quote.js) | Расстановка кавычек | 410 |  | ✓ |
| 39. | [ru/punctuation/quote](../src/rules/ru/punctuation/quote.js) | Расстановка кавычек | 410 |  | ✓ |
| 40. | [ru/punctuation/hellip](../src/rules/ru/punctuation/hellip.js) | Три точки на многоточие, ?... → ?.. и пр. | 410 |  | ✓ |
| 41. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.js) | !! → ! | 410 |  | ✓ |
| 42. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Расстановка запятых перед «а» и «но» | 410 |  | ✓ |
| 43. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Удаление двойной пунктуации | 410 |  | ✓ |
| 44. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.js) | !? → ?! | 415 |  | ✓ |
| 45. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Нераз. пробел перед lpi и dpi | 510 |  | ✓ |
| 46. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Нераз. пробел перед последним коротким словом в предложении | 510 |  | ✓ |
| 47. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Нераз. пробел после короткого слова | 510 |  | ✓ |
| 48. | [common/nbsp/afterParagraph](../src/rules/common/nbsp/afterParagraph.js) | Нераз. узкий пробел после § | 510 |  | ✓ |
| 49. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Нераз. пробел между числом и словом | 510 |  |  |
| 50. | [ru/nbsp/year](../src/rules/ru/nbsp/year.js) | Нераз. пробел после XXXX г. (2012 г.) | 510 |  | ✓ |
| 51. | [ru/nbsp/see](../src/rules/ru/nbsp/see.js) | Нераз. пробел после сокращений «см.» и «им.» | 510 |  | ✓ |
| 52. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.js) | Нераз. пробел перед «руб.» и «коп.» | 510 |  | ✓ |
| 53. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Нераз. пробел в P. S. и P. P. S. | 510 |  | ✓ |
| 54. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Нераз. пробел после «стр.», «гл.», «рис.», «илл.» | 510 |  | ✓ |
| 55. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Нераз. пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ | 510 |  | ✓ |
| 56. | [ru/nbsp/groupNumbers](../src/rules/ru/nbsp/groupNumbers.js) | Замена пробела на неразрывный узкий пробелв группах чисел | 510 |  | ✓ |
| 57. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Нераз. пробел в сокращениях, например, в “т. д.” | 510 |  | ✓ |
| 58. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Расстановка неразрывного пробела после «г.», «обл.», «ул.», «пр.», «кв.» и др. | 510 |  | ✓ |
| 59. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Нераз. узкий пробел после № | 510 |  | ✓ |
| 60. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Нераз. пробел между числом и месяцем | 510 |  | ✓ |
| 61. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.js) | Удаление пробелов и лишних точек в «вв.» | 510 |  | ✓ |
| 62. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Нераз. пробел перед «ли», «ль», «же», «бы», «б» | 515 |  | ✓ |
| 63. | [ru/nbsp/years](../src/rules/ru/nbsp/years.js) | г.г. → гг. и нераз. пробел | 515 |  | ✓ |
| 64. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | м2 → м², м3 → м³ и нераз. пробел | 515 |  | ✓ |
| 65. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/3 → ¾ | 610 |  | ✓ |
| 66. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 610 |  | ✓ |
| 67. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 610 |  | ✓ |
| 68. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 610 |  | ✓ |
| 69. | [ru/money/currency](../src/rules/ru/money/currency.js) | Символ валюты ($, €, ¥, Ұ, £ и ₤) после числа, $100 → 100 $ | 710 |  | ✓ |
| 70. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 710 |  |  |
| 71. | [ru/date/fromISO](../src/rules/ru/date/fromISO.js) | Преобразование дат YYYY-MM-DD к виду DD.MM.YYYY | 810 |  | ✓ |
| 72. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 810 |  | ✓ |
| 73. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Удаление повтора слова | 910 |  |  |
| 74. | [ru/other/accent](../src/rules/ru/other/accent.js) | Замена заглавной буквы на строчную с добавлением ударения | 910 |  |  |
| 75. | [ru/optalign/quote](../src/rules/ru/optalign/quote.js) | для открывающей кавычки | 1010 |  |  |
| 76. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | для открывающей скобки | 1010 |  |  |
| 77. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | для запятой | 1010 |  |  |
| 78. | [common/html/url](../src/rules/common/html/url.js) | Расстановка ссылок | 1110 |  |  |
| 79. | [common/html/e-mail](../src/rules/common/html/e-mail.js) | Расстановка ссылок для эл. почты | 1110 |  |  |
| 80. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr | 510 | end | ✓ |
| 81. | [common/html/pbr](../src/rules/common/html/pbr.js) | Расстановка тегов p и br | 1110 | end |  |
| 82. | [common/html/nbr](../src/rules/common/html/nbr.js) | Замена перевода строки на <br/> | 1115 | end |  |
| 83. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Удаление HTML-тегов | 1209 | end |  |
| 84. | [common/html/escape](../src/rules/common/html/escape.js) | Экранирование HTML | 1210 | end |  |
