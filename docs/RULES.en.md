## Rules of typograf

| № | Name ▼ | Title | [Index](./RULES_SORTED.en.md) | Queue | On |
|--:|--------|-------|------------------------------:|:-----:|:--:|
| 1. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Delete character BOM (Byte Order Mark) | 0 | start | ✓ |
| 2. | [common/html/nbr](../src/rules/common/html/nbr.js) | Replacement line break on <br/> | 110 | start |  |
| 3. | [common/sym/copy](../src/rules/common/sym/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 10 |  | ✓ |
| 4. | [ru/punctuation/hellip](../src/rules/ru/punctuation/hellip.js) | Three points on ellipsis | 20 |  | ✓ |
| 5. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Replacing non-breaking space in the ordinary | 0 | utf | ✓ |
| 6. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Replace non-breaking space to normal space in tags nowrap and nobr | 100 | start | ✓ |
| 7. | [ru/dash/to](../src/rules/ru/dash/to.js) | Hyphen before “то, либо, нибудь” | 30 |  | ✓ |
| 8. | [ru/dash/kade](../src/rules/ru/dash/kade.js) | Hyphen before “ка, де, кась” | 31 |  | ✓ |
| 9. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Hyphen between “из-за” | 33 |  | ✓ |
| 10. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Hyphen between “из-под” | 35 |  | ✓ |
| 11. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Hyphen after “кое” and “кой” | 38 |  | ✓ |
| 12. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Hyphen between “верно-таки” and etc. | 39 |  | ✓ |
| 13. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Remove spaces at start of line | 504 |  |  |
| 14. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Remove spaces at end of line | 505 |  | ✓ |
| 15. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Replacement of tab to 4 spaces | 510 |  | ✓ |
| 16. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Remove spaces and line breaks in beginning of text | 530 |  | ✓ |
| 17. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Remove spaces and line breaks at end of text | 535 |  | ✓ |
| 18. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Removing duplicate spaces between characters | 540 |  | ✓ |
| 19. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Remove duplicate line breaks (no more than two) | 545 |  | ✓ |
| 20. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Remove spaces before punctuation | 550 |  | ✓ |
| 21. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Remove spaces inside square brackets | 560 |  | ✓ |
| 22. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | space after punctuation | 560 |  | ✓ |
| 23. | [ru/other/accent](../src/rules/ru/other/accent.js) | Replacing capital letter and adding accents | 560 |  |  |
| 24. | [common/space/bracket](../src/rules/common/space/bracket.js) | Remove spaces inside brackets | 560 |  | ✓ |
| 25. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Space before opening bracket | 560 |  | ✓ |
| 26. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Non-breaking space in abbreviations, e.g. “т. д.” | 565 |  | ✓ |
| 27. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Non-breaking space in P. S. and P. P. S. | 565 |  | ✓ |
| 28. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Removing double punctuation | 580 |  | ✓ |
| 29. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Non-breaking space after short word | 590 |  | ✓ |
| 30. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Dash between the days of the week | 600 |  | ✓ |
| 31. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Remove space before %, ‰ and ‱ | 600 |  | ✓ |
| 32. | [ru/space/year](../src/rules/ru/space/year.js) | Space between number and word “год” | 600 |  | ✓ |
| 33. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Non-breaking space before “ли, ль, же, бы, б” | 600 |  | ✓ |
| 34. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Non-breaking space after № | 610 |  | ✓ |
| 35. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Non-breaking space before “стр., гл., рис., илл.” | 610 |  | ✓ |
| 36. | [ru/dash/month](../src/rules/ru/dash/month.js) | Dash between months | 610 |  | ✓ |
| 37. | [common/nbsp/afterPara](../src/rules/common/nbsp/afterPara.js) | Non-breaking space after § | 610 |  | ✓ |
| 38. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Non-breaking space between number and word | 615 |  | ✓ |
| 39. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Non-breaking space before last short word in sentence | 620 |  | ✓ |
| 40. | [ru/dash/main](../src/rules/ru/dash/main.js) | Replacement hyphen with dash | 620 |  | ✓ |
| 41. | [ru/punctuation/apostrophe](../src/rules/ru/punctuation/apostrophe.js) | Placement of correct apostrophe | 695 |  | ✓ |
| 42. | [ru/punctuation/quot](../src/rules/ru/punctuation/quot.js) | Placement of quotation marks | 700 |  | ✓ |
| 43. | [en/punctuation/quot](../src/rules/en/punctuation/quot.js) | Placement of quotation marks | 700 |  | ✓ |
| 44. | [ru/optalign/quot](../src/rules/ru/optalign/quot.js) | for opening quotation marks | 1000 |  |  |
| 45. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | for opening bracket | 1001 |  |  |
| 46. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | for comma | 1002 |  |  |
| 47. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 1010 |  | ✓ |
| 48. | [common/sym/cf](../src/rules/common/sym/cf.js) | Adding ° to C and F | 1020 |  | ✓ |
| 49. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | m2 → м², m3 → м³ and non-breaking space | 1030 |  | ✓ |
| 50. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 1050 |  | ✓ |
| 51. | [ru/nbsp/xxxx](../src/rules/ru/nbsp/xxxx.js) | Non-breaking space before XXXX г. (2012 г.) | 1060 |  | ✓ |
| 52. | [ru/nbsp/yy](../src/rules/ru/nbsp/yy.js) | г.г. → гг. and non-breaking space | 1080 |  | ✓ |
| 53. | [ru/nbsp/cc](../src/rules/ru/nbsp/cc.js) | Remove spaces and extra points in centuries | 1090 |  | ✓ |
| 54. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ” | 1100 |  | ✓ |
| 55. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Non-breaking space between number and month | 1105 |  | ✓ |
| 56. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Placement of commas before “а” and “но” | 1110 |  | ✓ |
| 57. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al. | 1115 |  | ✓ |
| 58. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/3 → ¾ | 1120 |  | ✓ |
| 59. | [common/sym/arrow](../src/rules/common/sym/arrow.js) | -> → →, <- → ← | 1130 |  | ✓ |
| 60. | [ru/money/dollar](../src/rules/ru/money/dollar.js) | $100 → 100 $ | 1140 |  | ✓ |
| 61. | [common/punctuation/exclamation](../src/rules/common/punctuation/exclamation.js) | !! → ! | 1140 |  | ✓ |
| 62. | [ru/money/euro](../src/rules/ru/money/euro.js) | €100 → 100 € | 1140 |  | ✓ |
| 63. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 1145 |  |  |
| 64. | [common/punctuation/exclamationQuestion](../src/rules/common/punctuation/exclamationQuestion.js) | !? → ?! | 1150 |  | ✓ |
| 65. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Non-breaking space before lpi, dpi | 1150 |  | ✓ |
| 66. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Removing repeat words | 1200 |  |  |
| 67. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 1300 |  | ✓ |
| 68. | [ru/date/main](../src/rules/ru/date/main.js) | Converting dates YYYY-MM-DD type DD.MM.YYYY | 1300 |  | ✓ |
| 69. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 1310 |  | ✓ |
| 70. | [common/html/mail](../src/rules/common/html/mail.js) | Placement of links for e-mail | 2000 |  |  |
| 71. | [common/html/url](../src/rules/common/html/url.js) | Placement of links | 2010 |  |  |
| 72. | [common/html/pbr](../src/rules/common/html/pbr.js) | Placement of p and br tags | 90 | end |  |
| 73. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Removing HTML-tags | 100 | end |  |
| 74. | [common/html/escape](../src/rules/common/html/escape.js) | Escaping HTML | 110 | end |  |
