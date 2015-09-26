## Rules of typograf in order of execution

| № | [Name](./RULES.en.md) | Title | Index ▼ | Queue | On |
|--:|-----------------------|-------|--------:|:-----:|:--:|
| 1. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Delete character BOM (Byte Order Mark) | -1 | start | ✓ |
| 2. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Replacing non-breaking space in the ordinary | 510 | utf | ✓ |
| 3. | [common/symbols/copy](../src/rules/common/symbols/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 110 |  | ✓ |
| 4. | [common/symbols/arrow](../src/rules/common/symbols/arrow.js) | -> → →, <- → ← | 110 |  | ✓ |
| 5. | [common/symbols/cf](../src/rules/common/symbols/cf.js) | Adding ° to C and F | 110 |  | ✓ |
| 6. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Replacement of tab to 4 spaces | 205 |  | ✓ |
| 7. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Remove spaces and line breaks in beginning of text | 206 |  | ✓ |
| 8. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Remove spaces at end of line | 207 |  | ✓ |
| 9. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Remove spaces and line breaks at end of text | 207 |  | ✓ |
| 10. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Remove duplicate line breaks (three or more) | 209 |  | ✓ |
| 11. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Removing duplicate spaces between characters | 209 |  | ✓ |
| 12. | [ru/space/year](../src/rules/ru/space/year.js) | Space between number and word “год” | 210 |  | ✓ |
| 13. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | space after punctuation | 210 |  | ✓ |
| 14. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Space before opening bracket | 210 |  | ✓ |
| 15. | [common/space/bracket](../src/rules/common/space/bracket.js) | Remove extra spaces after opening and before closing bracket | 210 |  | ✓ |
| 16. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Remove extra spaces after opening and before closing square bracket | 210 |  | ✓ |
| 17. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Remove space before %, ‰ and ‱ | 210 |  | ✓ |
| 18. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Remove spaces before punctuation | 210 |  | ✓ |
| 19. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.js) | Space after ..., !.. and ?.. | 210 |  | ✓ |
| 20. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Remove spaces at start of line | 210 |  |  |
| 21. | [ru/dash/main](../src/rules/ru/dash/main.js) | Replacement hyphen with dash | 305 |  | ✓ |
| 22. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Hyphen between “верно-таки” and etc. | 310 |  | ✓ |
| 23. | [ru/dash/surname](../src/rules/ru/dash/surname.js) | Acronyms with a dash | 310 |  | ✓ |
| 24. | [ru/dash/month](../src/rules/ru/dash/month.js) | Dash between months | 310 |  | ✓ |
| 25. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Hyphen between “из-за” | 310 |  | ✓ |
| 26. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Hyphen after “кое” and “кой” | 310 |  | ✓ |
| 27. | [ru/dash/years](../src/rules/ru/dash/years.js) | Hyphen to dash in years | 310 |  | ✓ |
| 28. | [ru/dash/kade](../src/rules/ru/dash/kade.js) | Hyphen before “ка, де, кась” | 310 |  | ✓ |
| 29. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Hyphen between “из-под” | 310 |  | ✓ |
| 30. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.js) | Dash in direct speech | 310 |  | ✓ |
| 31. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Dash between the days of the week | 310 |  | ✓ |
| 32. | [ru/dash/decade](../src/rules/ru/dash/decade.js) | Dash in decade | 310 |  | ✓ |
| 33. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.js) | Dash between days of one month | 310 |  | ✓ |
| 34. | [ru/dash/to](../src/rules/ru/dash/to.js) | Hyphen before “то”, “либо”, “нибудь” | 310 |  | ✓ |
| 35. | [ru/dash/time](../src/rules/ru/dash/time.js) | Dash in time intervals | 310 |  | ✓ |
| 36. | [ru/dash/centuries](../src/rules/ru/dash/centuries.js) | Hyphen to dash in centuries | 310 |  | ✓ |
| 37. | [ru/punctuation/apostrophe](../src/rules/ru/punctuation/apostrophe.js) | Placement of correct apostrophe | 405 |  | ✓ |
| 38. | [en/punctuation/quote](../src/rules/en/punctuation/quote.js) | Placement of quotation marks | 410 |  | ✓ |
| 39. | [ru/punctuation/quote](../src/rules/ru/punctuation/quote.js) | Placement of quotation marks | 410 |  | ✓ |
| 40. | [ru/punctuation/hellip](../src/rules/ru/punctuation/hellip.js) | Three points on ellipsis | 410 |  | ✓ |
| 41. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.js) | !! → ! | 410 |  | ✓ |
| 42. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Placement of commas before “а” and “но” | 410 |  | ✓ |
| 43. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Removing double punctuation | 410 |  | ✓ |
| 44. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.js) | !? → ?! | 415 |  | ✓ |
| 45. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Non-breaking space before lpi and dpi | 510 |  | ✓ |
| 46. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Non-breaking space before last short word in sentence | 510 |  | ✓ |
| 47. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Non-breaking space after short word | 510 |  | ✓ |
| 48. | [common/nbsp/afterParagraph](../src/rules/common/nbsp/afterParagraph.js) | Non-breaking space after § | 510 |  | ✓ |
| 49. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Non-breaking space between number and word | 510 |  |  |
| 50. | [ru/nbsp/year](../src/rules/ru/nbsp/year.js) | Non-breaking space before XXXX г. (2012 г.) | 510 |  | ✓ |
| 51. | [ru/nbsp/see](../src/rules/ru/nbsp/see.js) | Non-breaking space after abbreviation «см.» and «им.» | 510 |  | ✓ |
| 52. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Non-breaking space in P. S. and P. P. S. | 510 |  | ✓ |
| 53. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Non-breaking space after “стр.”, “гл.”, “рис.”, “илл.” | 510 |  | ✓ |
| 54. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ” | 510 |  | ✓ |
| 55. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Non-breaking space between number and month | 510 |  | ✓ |
| 56. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.js) | Remove spaces and extra points in “вв.” | 510 |  | ✓ |
| 57. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Non-breaking space after № | 510 |  | ✓ |
| 58. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Non-breaking space in abbreviations, e.g. “т. д.” | 510 |  | ✓ |
| 59. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al. | 510 |  | ✓ |
| 60. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Non-breaking space before “ли”, “ль”, “же”, “бы”, “б” | 515 |  | ✓ |
| 61. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | m2 → м², m3 → м³ and non-breaking space | 515 |  | ✓ |
| 62. | [ru/nbsp/years](../src/rules/ru/nbsp/years.js) | г.г. → гг. and non-breaking space | 515 |  | ✓ |
| 63. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 610 |  | ✓ |
| 64. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 610 |  | ✓ |
| 65. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/3 → ¾ | 610 |  | ✓ |
| 66. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 610 |  | ✓ |
| 67. | [ru/money/euro](../src/rules/ru/money/euro.js) | €100 → 100 € | 710 |  | ✓ |
| 68. | [ru/money/dollar](../src/rules/ru/money/dollar.js) | $100 → 100 $ | 710 |  | ✓ |
| 69. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 710 |  |  |
| 70. | [ru/date/fromISO](../src/rules/ru/date/fromISO.js) | Converting dates YYYY-MM-DD type DD.MM.YYYY | 810 |  | ✓ |
| 71. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 810 |  | ✓ |
| 72. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Removing repeat words | 910 |  |  |
| 73. | [ru/other/accent](../src/rules/ru/other/accent.js) | Replacement capital letters to lowercase with addition of accent | 910 |  |  |
| 74. | [ru/optalign/quote](../src/rules/ru/optalign/quote.js) | for opening quotation marks | 1010 |  |  |
| 75. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | for opening bracket | 1010 |  |  |
| 76. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | for comma | 1010 |  |  |
| 77. | [common/html/url](../src/rules/common/html/url.js) | Placement of links | 1110 |  |  |
| 78. | [common/html/e-mail](../src/rules/common/html/e-mail.js) | Placement of links for e-mail | 1110 |  |  |
| 79. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Replace non-breaking space to normal space in tags nowrap and nobr | 510 | end | ✓ |
| 80. | [common/html/pbr](../src/rules/common/html/pbr.js) | Placement of p and br tags | 1110 | end |  |
| 81. | [common/html/nbr](../src/rules/common/html/nbr.js) | Replacement line break on <br/> | 1115 | end |  |
| 82. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Removing HTML-tags | 1209 | end |  |
| 83. | [common/html/escape](../src/rules/common/html/escape.js) | Escaping HTML | 1210 | end |  |
