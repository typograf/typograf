## Rules of typograf

| № | Name ▼ | Title | [Index](./RULES_SORTED.en.md) | Queue | On |
|--:|--------|-------|------------------------------:|:-----:|:--:|
| 1. | [common/html/e-mail](../src/rules/common/html/e-mail.js) | Placement of links for e-mail | 1210 | end |  |
| 2. | [common/html/escape](../src/rules/common/html/escape.js) | Escaping HTML | 1310 | end |  |
| 3. | [common/html/nbr](../src/rules/common/html/nbr.js) | Replacement line break on <br/> | 1215 | end |  |
| 4. | [common/html/p](../src/rules/common/html/p.js) | Placement of paragraph | 1210 | end |  |
| 5. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Removing HTML-tags | 1309 | end |  |
| 6. | [common/html/url](../src/rules/common/html/url.js) | Placement of links | 1210 | end |  |
| 7. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Non-breaking space between number and word | 510 |  |  |
| 8. | [common/nbsp/afterParagraph](../src/rules/common/nbsp/afterParagraph.js) | Non-breaking thin space after § | 510 |  | ✓ |
| 9. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Non-breaking space after short word | 510 |  | ✓ |
| 10. | [common/nbsp/beforeShortLastNumber](../src/rules/common/nbsp/beforeShortLastNumber.js) | Non-breaking space before number (maximum 2 digits) at end of sentence | 510 |  | ✓ |
| 11. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Non-breaking space before last short word in sentence | 510 |  | ✓ |
| 12. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Non-breaking space before lpi and dpi | 510 |  | ✓ |
| 13. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Replace non-breaking space to normal space in tags nowrap and nobr | 510 | end | ✓ |
| 14. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Replacing non-breaking space in the ordinary | 510 | utf |  |
| 15. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/3 → ¾ | 610 |  | ✓ |
| 16. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 610 |  | ✓ |
| 17. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 610 |  | ✓ |
| 18. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Delete character BOM (Byte Order Mark) | -1 | start | ✓ |
| 19. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Removing repeat words | 910 |  |  |
| 20. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Removing double punctuation | 410 |  | ✓ |
| 21. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | space after punctuation | 210 |  | ✓ |
| 22. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Space before opening bracket | 210 |  | ✓ |
| 23. | [common/space/bracket](../src/rules/common/space/bracket.js) | Remove extra spaces after opening and before closing bracket | 210 |  | ✓ |
| 24. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Remove space before %, ‰ and ‱ | 210 |  | ✓ |
| 25. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Remove spaces before punctuation | 210 |  | ✓ |
| 26. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Remove spaces at start of line | 210 |  |  |
| 27. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Remove duplicate line breaks (three or more) | 209 |  | ✓ |
| 28. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Removing duplicate spaces between characters | 209 |  | ✓ |
| 29. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Remove spaces at end of line | 207 |  | ✓ |
| 30. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Replacement of tab to 4 spaces | 205 |  | ✓ |
| 31. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Remove extra spaces after opening and before closing square bracket | 210 |  | ✓ |
| 32. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Remove spaces and line breaks in beginning of text | 206 |  | ✓ |
| 33. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Remove spaces and line breaks at end of text | 207 |  | ✓ |
| 34. | [common/symbols/arrow](../src/rules/common/symbols/arrow.js) | -> → →, <- → ← | 110 |  | ✓ |
| 35. | [common/symbols/cf](../src/rules/common/symbols/cf.js) | Adding ° to C and F | 110 |  | ✓ |
| 36. | [common/symbols/copy](../src/rules/common/symbols/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 110 |  | ✓ |
| 37. | [en/punctuation/quote](../src/rules/en/punctuation/quote.js) | Placement of quotation marks in texts in English | 410 |  | ✓ |
| 38. | [ru/dash/centuries](../src/rules/ru/dash/centuries.js) | Hyphen to dash in centuries | 310 |  | ✓ |
| 39. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.js) | Dash between days of one month | 310 |  | ✓ |
| 40. | [ru/dash/de](../src/rules/ru/dash/de.js) | Hyphen before “де” | 310 |  |  |
| 41. | [ru/dash/decade](../src/rules/ru/dash/decade.js) | Dash in decade | 310 |  | ✓ |
| 42. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.js) | Dash in direct speech | 310 |  | ✓ |
| 43. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Hyphen between “из-под” | 310 |  | ✓ |
| 44. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Hyphen between “из-за” | 310 |  | ✓ |
| 45. | [ru/dash/ka](../src/rules/ru/dash/ka.js) | Hyphen before “ка” and “кась” | 310 |  | ✓ |
| 46. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Hyphen after “кое” and “кой” | 310 |  | ✓ |
| 47. | [ru/dash/main](../src/rules/ru/dash/main.js) | Replacement hyphen with dash | 305 |  | ✓ |
| 48. | [ru/dash/month](../src/rules/ru/dash/month.js) | Dash between months | 310 |  | ✓ |
| 49. | [ru/dash/surname](../src/rules/ru/dash/surname.js) | Acronyms with a dash | 310 |  | ✓ |
| 50. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Hyphen between “верно-таки” and etc. | 310 |  | ✓ |
| 51. | [ru/dash/time](../src/rules/ru/dash/time.js) | Dash in time intervals | 310 |  | ✓ |
| 52. | [ru/dash/to](../src/rules/ru/dash/to.js) | Hyphen before “то”, “либо”, “нибудь” | 310 |  | ✓ |
| 53. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Dash between the days of the week | 310 |  | ✓ |
| 54. | [ru/dash/years](../src/rules/ru/dash/years.js) | Hyphen to dash in years | 310 |  | ✓ |
| 55. | [ru/date/fromISO](../src/rules/ru/date/fromISO.js) | Converting dates YYYY-MM-DD type DD.MM.YYYY | 810 |  | ✓ |
| 56. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 810 |  | ✓ |
| 57. | [ru/money/currency](../src/rules/ru/money/currency.js) | Currency symbol ($, €, ¥, Ұ, £ and ₤) after the number, $100 → 100 $ | 710 |  | ✓ |
| 58. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 710 |  |  |
| 59. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Non-breaking space in abbreviations, e.g. “т. д.” | 510 |  | ✓ |
| 60. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al. | 510 |  | ✓ |
| 61. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Non-breaking thin space after № | 510 |  | ✓ |
| 62. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Non-breaking space before “ли”, “ль”, “же”, “бы”, “б” | 515 |  | ✓ |
| 63. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.js) | Remove spaces and extra points in “вв.” | 510 |  | ✓ |
| 64. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Non-breaking space between number and month | 510 |  | ✓ |
| 65. | [ru/nbsp/groupNumbers](../src/rules/ru/nbsp/groupNumbers.js) | Replacement space on a narrow non-breaking space in groups of numbers | 510 |  | ✓ |
| 66. | [ru/nbsp/initials](../src/rules/ru/nbsp/initials.js) | Binding of initials to the name | 510 |  | ✓ |
| 67. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | m2 → м², m3 → м³ and non-breaking space | 515 |  | ✓ |
| 68. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ” | 510 |  | ✓ |
| 69. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Non-breaking space after “стр.”, “гл.”, “рис.”, “илл.” | 510 |  | ✓ |
| 70. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Non-breaking space in P. S. and P. P. S. | 510 |  | ✓ |
| 71. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.js) | Not once. space before the “rub” and “cop.” | 510 |  | ✓ |
| 72. | [ru/nbsp/see](../src/rules/ru/nbsp/see.js) | Non-breaking space after abbreviation «см.» and «им.» | 510 |  | ✓ |
| 73. | [ru/nbsp/year](../src/rules/ru/nbsp/year.js) | Non-breaking space before XXXX г. (2012 г.) | 510 |  | ✓ |
| 74. | [ru/nbsp/years](../src/rules/ru/nbsp/years.js) | г.г. → гг. and non-breaking space | 515 |  | ✓ |
| 75. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 610 |  | ✓ |
| 76. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | for opening bracket | 1010 |  |  |
| 77. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | for comma | 1010 |  |  |
| 78. | [ru/optalign/quote](../src/rules/ru/optalign/quote.js) | for opening quotation marks | 1010 |  |  |
| 79. | [ru/other/accent](../src/rules/ru/other/accent.js) | Replacement capital letters to lowercase with addition of accent | 910 |  |  |
| 80. | [ru/other/phone-number](../src/rules/ru/other/phone-number.js) | Formatting phone numbers | 910 |  | ✓ |
| 81. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Placement of commas before “а” and “но” | 410 |  | ✓ |
| 82. | [ru/punctuation/apostrophe](../src/rules/ru/punctuation/apostrophe.js) | Placement of correct apostrophe | 405 |  | ✓ |
| 83. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.js) | !! → ! | 410 |  | ✓ |
| 84. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.js) | !? → ?! | 415 |  | ✓ |
| 85. | [ru/punctuation/hellip](../src/rules/ru/punctuation/hellip.js) | Three points on ellipsis | 410 |  | ✓ |
| 86. | [ru/punctuation/quote](../src/rules/ru/punctuation/quote.js) | Placement of quotation marks in texts in Russian | 410 |  | ✓ |
| 87. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.js) | Space after ..., !.. and ?.. | 210 |  | ✓ |
| 88. | [ru/space/year](../src/rules/ru/space/year.js) | Space between number and word “год” | 210 |  | ✓ |
| 89. | [ru/typo/switchingKeyboardLayout](../src/rules/ru/typo/switchingKeyboardLayout.js) | Replacement of Latin letters in Russian. Typos occur when you switch keyboard layouts | 1110 |  | ✓ |
