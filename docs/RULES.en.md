## Rules of typograf

| № | Name ▼ | Title | [Index](./RULES_SORTED.en.md) | Queue | On |
|--:|--------|-------|------------------------------:|:-----:|:--:|
| 1. | [common/sym/copy](../src/rules/common/sym/copy.js) | (c) → ©, (tm) → ©, (r) → ™ | 10 |  | ✓ |
| 2. | [common/punctuation/hellip](../src/rules/common/punctuation/hellip.js) | Three points on ellipsis | 20 |  | ✓ |
| 3. | [ru/dash/to](../src/rules/ru/dash/to.js) | Hyphen before “то, либо, нибудь” | 30 |  | ✓ |
| 4. | [ru/dash/kade](../src/rules/ru/dash/kade.js) | Hyphen before “ка, де, кась” | 31 |  | ✓ |
| 5. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Hyphen between “из-за” | 33 |  | ✓ |
| 6. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Hyphen between “из-под” | 35 |  | ✓ |
| 7. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Hyphen after “кое” and “кой” | 38 |  | ✓ |
| 8. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Hyphen between “верно-таки” and etc. | 39 |  | ✓ |
| 9. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Remove spaces at start of line | 504 |  |  |
| 10. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Remove spaces at end of line | 505 |  | ✓ |
| 11. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Replacement of tab to 4 spaces | 510 |  | ✓ |
| 12. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Remove spaces and line breaks in beginning of text | 530 |  | ✓ |
| 13. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Remove spaces and line breaks at end of text | 535 |  | ✓ |
| 14. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Removing duplicate spaces between characters | 540 |  | ✓ |
| 15. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Remove duplicate line breaks (no more than two) | 545 |  | ✓ |
| 16. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Remove spaces before punctuation | 550 |  | ✓ |
| 17. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | space after punctuation | 560 |  | ✓ |
| 18. | [ru/other/accent](../src/rules/ru/other/accent.js) | Replacing capital letter and adding accents | 560 |  |  |
| 19. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Non-breaking space before “ли, ль, же, бы, б” | 570 |  | ✓ |
| 20. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Removing double punctuation | 580 |  | ✓ |
| 21. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Non-breaking space after short word | 590 |  | ✓ |
| 22. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Remove space before %, ‰ and ‱ | 600 |  | ✓ |
| 23. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Dash between the days of the week | 600 |  | ✓ |
| 24. | [ru/dash/month](../src/rules/ru/dash/month.js) | Dash between months | 610 |  | ✓ |
| 25. | [common/nbsp/afterPara](../src/rules/common/nbsp/afterPara.js) | Non-breaking space after § | 610 |  | ✓ |
| 26. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Non-breaking space after № | 610 |  | ✓ |
| 27. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Non-breaking space before “стр., гл., рис., илл.” | 610 |  | ✓ |
| 28. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Non-breaking space between number and word | 615 |  | ✓ |
| 29. | [ru/dash/main](../src/rules/ru/dash/main.js) | Replacement hyphen with dash | 620 |  | ✓ |
| 30. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Non-breaking space before last short word in sentence | 620 |  | ✓ |
| 31. | [ru/punctuation/quot](../src/rules/ru/punctuation/quot.js) | Placement of quotation marks | 700 |  | ✓ |
| 32. | [en/punctuation/quot](../src/rules/en/punctuation/quot.js) | Placement of quotation marks | 700 |  | ✓ |
| 33. | [ru/optalign/quot](../src/rules/ru/optalign/quot.js) | for opening quotation marks | 1000 |  |  |
| 34. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | for opening bracket | 1001 |  |  |
| 35. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | for comma | 1002 |  |  |
| 36. | [common/number/plusMinus](../src/rules/common/number/plusMinus.js) | +- → ± | 1010 |  | ✓ |
| 37. | [common/sym/cf](../src/rules/common/sym/cf.js) | Adding ° to C and F | 1020 |  | ✓ |
| 38. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | m2 → м², m3 → м³ and non-breaking space | 1030 |  | ✓ |
| 39. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 1050 |  | ✓ |
| 40. | [ru/nbsp/xxxx](../src/rules/ru/nbsp/xxxx.js) | Non-breaking space before XXXX г. (2012 г.) | 1060 |  | ✓ |
| 41. | [ru/nbsp/yy](../src/rules/ru/nbsp/yy.js) | г.г. → гг. and non-breaking space | 1080 |  | ✓ |
| 42. | [ru/nbsp/cc](../src/rules/ru/nbsp/cc.js) | Remove spaces and extra points in centuries | 1090 |  | ✓ |
| 43. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ” | 1100 |  | ✓ |
| 44. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Non-breaking space between number and month | 1105 |  | ✓ |
| 45. | [ru/nbsp/but](../src/rules/ru/nbsp/but.js) | Placement of commas and non-breaking space before “а” and “но” | 1110 |  | ✓ |
| 46. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al. | 1115 |  | ✓ |
| 47. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/3 → ¾ | 1120 |  | ✓ |
| 48. | [common/sym/arrow](../src/rules/common/sym/arrow.js) | -> → →, <- → ← | 1130 |  | ✓ |
| 49. | [common/punctuation/exclamationQuestion](../src/rules/common/punctuation/exclamationQuestion.js) | !? → ?! | 1140 |  | ✓ |
| 50. | [ru/money/euro](../src/rules/ru/money/euro.js) | €100 → 100 € | 1140 |  | ✓ |
| 51. | [ru/money/dollar](../src/rules/ru/money/dollar.js) | $100 → 100 $ | 1140 |  | ✓ |
| 52. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 1145 |  |  |
| 53. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Non-breaking space before lpi, dpi | 1150 |  | ✓ |
| 54. | [common/punctuation/exclamation](../src/rules/common/punctuation/exclamation.js) | !! → ! | 1150 |  | ✓ |
| 55. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Removing repeat words | 1200 |  |  |
| 56. | [ru/date/main](../src/rules/ru/date/main.js) | Converting dates YYYY-MM-DD type DD.MM.YYYY | 1300 |  | ✓ |
| 57. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 1300 |  | ✓ |
| 58. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 1310 |  | ✓ |
| 59. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Replace non-breaking space to normal space in tags nowrap and nobr | 1400 |  | ✓ |
| 60. | [common/html/mail](../src/rules/common/html/mail.js) | Placement of links for e-mail | 2000 |  |  |
| 61. | [common/html/url](../src/rules/common/html/url.js) | Placement of links | 2010 |  |  |
| 62. | [common/html/nbr](../src/rules/common/html/nbr.js) | Replacement line break on br tag | 2020 |  |  |
| 63. | [common/html/pbr](../src/rules/common/html/pbr.js) | Placement of p and br tags | 2030 |  |  |
| 64. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Removing HTML-tags | 100 | end |  |
| 65. | [common/html/escape](../src/rules/common/html/escape.js) | Escaping HTML | 110 | end |  |
