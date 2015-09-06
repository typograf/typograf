## Правила типографа

| № | Имя ▼ | Название | [Индекс](./RULES_SORTED.ru.md) | Очередь | Вкл. |
|--:|-------|----------|----------------------------:|:-------:|:----:|
| 1. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Удаление символа BOM (Byte Order Mark) | 0 | start | ✓ |
| 2. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Заменять нераз. пробел на обычный пробел в тегах nowrap и nobr | 100 | start | ✓ |
| 3. | [common/html/nbr](../src/rules/common/html/nbr.js) | Замена перевода строки на <br/> | 110 | start |  |
| 4. | [common/sym/copy](../src/rules/common/sym/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 10 |  | ✓ |
| 5. | [ru/punctuation/hellip](../src/rules/ru/punctuation/hellip.js) | Три точки на многоточие, ?... → ?.. и пр. | 20 |  | ✓ |
| 6. | [ru/dash/to](../src/rules/ru/dash/to.js) | Дефис перед то, либо, нибудь | 30 |  | ✓ |
| 7. | [ru/dash/kade](../src/rules/ru/dash/kade.js) | Дефис перед ка, де, кась | 31 |  | ✓ |
| 8. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Дефис между из-за | 33 |  | ✓ |
| 9. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Дефис между из-под | 35 |  | ✓ |
| 10. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Дефис после кое и кой | 38 |  | ✓ |
| 11. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Дефис между верно-таки и т.д. | 39 |  | ✓ |
| 12. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Удаление пробелов в начале строки | 504 |  |  |
| 13. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Удаление пробелов в конце строки | 505 |  | ✓ |
| 14. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Замена таба на 4 пробела | 510 |  | ✓ |
| 15. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Удаление пробелов и переносов строк в начале текста | 530 |  | ✓ |
| 16. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Удаление пробелов и переносов строк в конце текста | 535 |  | ✓ |
| 17. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Удаление повторяющихся пробелов между символами | 540 |  | ✓ |
| 18. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Удаление повторяющихся переносов строки (не более двух) | 545 |  | ✓ |
| 19. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Удаление пробелов перед знаками пунктуации | 550 |  | ✓ |
| 20. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | Пробел после знаков пунктуации | 560 |  | ✓ |
| 21. | [ru/other/accent](../src/rules/ru/other/accent.js) | Замена заглавной буквы и добавление знака ударения | 560 |  |  |
| 22. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Нераз. пробел в сокращениях, например, в т. д. | 565 |  | ✓ |
| 23. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Нераз. пробел перед ли, ль, же, бы, б | 570 |  | ✓ |
| 24. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Удаление двойной пунктуации | 580 |  | ✓ |
| 25. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Нераз. пробел после короткого слова | 590 |  | ✓ |
| 26. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Удаление пробела перед %, ‰ и ‱ | 600 |  | ✓ |
| 27. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Тире между днями недели | 600 |  | ✓ |
| 28. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Нераз. пробел после № | 610 |  | ✓ |
| 29. | [ru/dash/month](../src/rules/ru/dash/month.js) | Тире между месяцами | 610 |  | ✓ |
| 30. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Нераз. пробел перед стр., гл., рис., илл. | 610 |  | ✓ |
| 31. | [common/nbsp/afterPara](../src/rules/common/nbsp/afterPara.js) | Нераз. пробел после § | 610 |  | ✓ |
| 32. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Нераз. пробел между числом и словом | 615 |  | ✓ |
| 33. | [ru/dash/main](../src/rules/ru/dash/main.js) | Дефис на тире | 620 |  | ✓ |
| 34. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Нераз. пробел перед последним коротким словом в предложении | 620 |  | ✓ |
| 35. | [en/punctuation/quot](../src/rules/en/punctuation/quot.js) | Расстановка кавычек | 700 |  | ✓ |
| 36. | [ru/punctuation/quot](../src/rules/ru/punctuation/quot.js) | Расстановка кавычек | 700 |  | ✓ |
| 37. | [ru/optalign/quot](../src/rules/ru/optalign/quot.js) | для открывающей кавычки | 1000 |  |  |
| 38. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | для открывающей скобки | 1001 |  |  |
| 39. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | для запятой | 1002 |  |  |
| 40. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 1010 |  | ✓ |
| 41. | [common/sym/cf](../src/rules/common/sym/cf.js) | Добавление ° к C и F | 1020 |  | ✓ |
| 42. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | m2 → м², m3 → м³ и нераз. пробел | 1030 |  | ✓ |
| 43. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 1050 |  | ✓ |
| 44. | [ru/nbsp/xxxx](../src/rules/ru/nbsp/xxxx.js) | Нераз. пробел после XXXX г. (2012 г.) | 1060 |  | ✓ |
| 45. | [ru/nbsp/yy](../src/rules/ru/nbsp/yy.js) | г.г. → гг. и нераз. пробел | 1080 |  | ✓ |
| 46. | [ru/nbsp/cc](../src/rules/ru/nbsp/cc.js) | Удаление пробелов и лишних точек в вв. | 1090 |  | ✓ |
| 47. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Нераз. пробел после OOO, ОАО, ЗАО, НИИ и ПБОЮЛ | 1100 |  | ✓ |
| 48. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Нераз. пробел между числом и месяцем | 1105 |  | ✓ |
| 49. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Расстановка запятых перед а и но | 1110 |  | ✓ |
| 50. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Расстановка неразрывного пробела после «г.», «обл.», «ул.», «пр.», «кв.» и др. | 1115 |  | ✓ |
| 51. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/3 → ¾ | 1120 |  | ✓ |
| 52. | [common/sym/arrow](../src/rules/common/sym/arrow.js) | -> → →, <- → ← | 1130 |  | ✓ |
| 53. | [ru/money/euro](../src/rules/ru/money/euro.js) | €100 → 100 € | 1140 |  | ✓ |
| 54. | [ru/money/dollar](../src/rules/ru/money/dollar.js) | $100 → 100 $ | 1140 |  | ✓ |
| 55. | [common/punctuation/exclamationQuestion](../src/rules/common/punctuation/exclamationQuestion.js) | !? → ?! | 1140 |  | ✓ |
| 56. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 1145 |  |  |
| 57. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Нераз. пробел перед lpi, dpi | 1150 |  | ✓ |
| 58. | [common/punctuation/exclamation](../src/rules/common/punctuation/exclamation.js) | !! → ! | 1150 |  | ✓ |
| 59. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Удаление повтора слова | 1200 |  |  |
| 60. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 1300 |  | ✓ |
| 61. | [ru/date/main](../src/rules/ru/date/main.js) | Преобразование дат YYYY-MM-DD к виду DD.MM.YYYY | 1300 |  | ✓ |
| 62. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 1310 |  | ✓ |
| 63. | [common/html/mail](../src/rules/common/html/mail.js) | Расстановка ссылок для эл. почты | 2000 |  |  |
| 64. | [common/html/url](../src/rules/common/html/url.js) | Расстановка ссылок | 2010 |  |  |
| 65. | [common/html/pbr](../src/rules/common/html/pbr.js) | Расстановка тегов p и br | 90 | end |  |
| 66. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Удаление HTML-тегов | 100 | end |  |
| 67. | [common/html/escape](../src/rules/common/html/escape.js) | Экранирование HTML | 110 | end |  |
