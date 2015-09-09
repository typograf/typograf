## Rules of typograf

| № | Name ▼ | Title | [Index](./RULES_SORTED.en.md) | Queue | On |
|--:|--------|-------|------------------------------:|:-----:|:--:|
| 1. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Delete character BOM (Byte Order Mark) | 0 | start | ✓ |
| 2. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Replace non-breaking space to normal space in tags nowrap and nobr | 100 | start | ✓ |
| 3. | [common/html/nbr](../src/rules/common/html/nbr.js) | Replacement line break on <br/> | 110 | start |  |
| 4. | [common/sym/copy](../src/rules/common/sym/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 10 |  | ✓ |
| 5. | [ru/punctuation/hellip](../src/rules/ru/punctuation/hellip.js) | Three points on ellipsis | 20 |  | ✓ |
| 6. | [ru/dash/to](../src/rules/ru/dash/to.js) | Hyphen before “то, либо, нибудь” | 30 |  | ✓ |
| 7. | [ru/dash/kade](../src/rules/ru/dash/kade.js) | Hyphen before “ка, де, кась” | 31 |  | ✓ |
| 8. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Hyphen between “из-за” | 33 |  | ✓ |
| 9. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Hyphen between “из-под” | 35 |  | ✓ |
| 10. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Hyphen after “кое” and “кой” | 38 |  | ✓ |
| 11. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Hyphen between “верно-таки” and etc. | 39 |  | ✓ |
| 12. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Remove spaces at start of line | 504 |  |  |
| 13. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Remove spaces at end of line | 505 |  | ✓ |
| 14. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Replacement of tab to 4 spaces | 510 |  | ✓ |
| 15. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Remove spaces and line breaks in beginning of text | 530 |  | ✓ |
| 16. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Remove spaces and line breaks at end of text | 535 |  | ✓ |
| 17. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Removing duplicate spaces between characters | 540 |  | ✓ |
| 18. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Remove duplicate line breaks (no more than two) | 545 |  | ✓ |
| 19. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Remove spaces before punctuation | 550 |  | ✓ |
| 20. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | space after punctuation | 560 |  | ✓ |
| 21. | [ru/other/accent](../src/rules/ru/other/accent.js) | Replacing capital letter and adding accents | 560 |  |  |
| 22. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Non-breaking space in abbreviations, e.g. “т. д.” | 565 |  | ✓ |
| 23. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Removing double punctuation | 580 |  | ✓ |
| 24. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Non-breaking space after short word | 590 |  | ✓ |
| 25. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Remove space before %, ‰ and ‱ | 600 |  | ✓ |
| 26. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Dash between the days of the week | 600 |  | ✓ |
| 27. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Non-breaking space before “ли, ль, же, бы, б” | 600 |  | ✓ |
| 28. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Non-breaking space after № | 610 |  | ✓ |
| 29. | [ru/dash/month](../src/rules/ru/dash/month.js) | Dash between months | 610 |  | ✓ |
| 30. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Non-breaking space before “стр., гл., рис., илл.” | 610 |  | ✓ |
| 31. | [common/nbsp/afterPara](../src/rules/common/nbsp/afterPara.js) | Non-breaking space after § | 610 |  | ✓ |
| 32. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Non-breaking space between number and word | 615 |  | ✓ |
| 33. | [ru/dash/main](../src/rules/ru/dash/main.js) | Replacement hyphen with dash | 620 |  | ✓ |
| 34. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Non-breaking space before last short word in sentence | 620 |  | ✓ |
| 35. | [en/punctuation/quot](../src/rules/en/punctuation/quot.js) | Placement of quotation marks | 700 |  | ✓ |
| 36. | [ru/punctuation/quot](../src/rules/ru/punctuation/quot.js) | Placement of quotation marks | 700 |  | ✓ |
| 37. | [ru/optalign/quot](../src/rules/ru/optalign/quot.js) | for opening quotation marks | 1000 |  |  |
| 38. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | for opening bracket | 1001 |  |  |
| 39. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | for comma | 1002 |  |  |
| 40. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 1010 |  | ✓ |
| 41. | [common/sym/cf](../src/rules/common/sym/cf.js) | Adding ° to C and F | 1020 |  | ✓ |
| 42. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | m2 → м², m3 → м³ and non-breaking space | 1030 |  | ✓ |
| 43. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 1050 |  | ✓ |
| 44. | [ru/nbsp/xxxx](../src/rules/ru/nbsp/xxxx.js) | Non-breaking space before XXXX г. (2012 г.) | 1060 |  | ✓ |
| 45. | [ru/nbsp/yy](../src/rules/ru/nbsp/yy.js) | г.г. → гг. and non-breaking space | 1080 |  | ✓ |
| 46. | [ru/nbsp/cc](../src/rules/ru/nbsp/cc.js) | Remove spaces and extra points in centuries | 1090 |  | ✓ |
| 47. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ” | 1100 |  | ✓ |
| 48. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Non-breaking space between number and month | 1105 |  | ✓ |
| 49. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Placement of commas before “а” and “но” | 1110 |  | ✓ |
| 50. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al. | 1115 |  | ✓ |
| 51. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/3 → ¾ | 1120 |  | ✓ |
| 52. | [common/sym/arrow](../src/rules/common/sym/arrow.js) | -> → →, <- → ← | 1130 |  | ✓ |
| 53. | [ru/money/euro](../src/rules/ru/money/euro.js) | €100 → 100 € | 1140 |  | ✓ |
| 54. | [ru/money/dollar](../src/rules/ru/money/dollar.js) | $100 → 100 $ | 1140 |  | ✓ |
| 55. | [common/punctuation/exclamationQuestion](../src/rules/common/punctuation/exclamationQuestion.js) | !? → ?! | 1140 |  | ✓ |
| 56. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 1145 |  |  |
| 57. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Non-breaking space before lpi, dpi | 1150 |  | ✓ |
| 58. | [common/punctuation/exclamation](../src/rules/common/punctuation/exclamation.js) | !! → ! | 1150 |  | ✓ |
| 59. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Removing repeat words | 1200 |  |  |
| 60. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 1300 |  | ✓ |
| 61. | [ru/date/main](../src/rules/ru/date/main.js) | Converting dates YYYY-MM-DD type DD.MM.YYYY | 1300 |  | ✓ |
| 62. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 1310 |  | ✓ |
| 63. | [common/html/mail](../src/rules/common/html/mail.js) | Placement of links for e-mail | 2000 |  |  |
| 64. | [common/html/url](../src/rules/common/html/url.js) | Placement of links | 2010 |  |  |
| 65. | [common/html/pbr](../src/rules/common/html/pbr.js) | Placement of p and br tags | 90 | end |  |
| 66. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Removing HTML-tags | 100 | end |  |
| 67. | [common/html/escape](../src/rules/common/html/escape.js) | Escaping HTML | 110 | end |  |
