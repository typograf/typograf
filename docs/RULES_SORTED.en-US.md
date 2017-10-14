## Rules of typograf in order of execution

| № | [Name](./RULES.en.md) | Title | Index ▼ | Queue | On |
|--:|-----------------------|-------|--------:|:-----:|:--:|
| 1. | [common/symbols/copy](../src/rules/common/symbols/copy.js) | (c) → ©, (tm) → ™, (r) → ® | 110 |  | ✓ |
| 2. | [common/html/quot](../src/rules/common/html/quot.js) | &⁠quot; → " | 1210 | hide-safe-tags | ✓ |
| 3. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Delete character BOM (Byte Order Mark) | -1 | start | ✓ |
| 4. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Replacing non-breaking space on normal before text correction | 510 | utf |  |
| 5. | [common/html/processingAttrs](../src/rules/common/html/processingAttrs.js) | Processing HTML attributes | 1210 | hide-safe-tags-own |  |
| 6. | [common/symbols/cf](../src/rules/common/symbols/cf.js) | Adding ° to C and F | 110 |  | ✓ |
| 7. | [ru/symbols/NN](../src/rules/ru/symbols/NN.js) | №№ → № | 110 |  | ✓ |
| 8. | [common/symbols/arrow](../src/rules/common/symbols/arrow.js) | -> → →, <- → ← | 110 |  | ✓ |
| 9. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Replacement of tab to 4 spaces | 205 |  | ✓ |
| 10. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Remove spaces and line breaks in beginning of text | 206 |  | ✓ |
| 11. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Remove spaces at end of line | 207 |  | ✓ |
| 12. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Remove spaces and line breaks at end of text | 207 |  | ✓ |
| 13. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Remove duplicate line breaks (three or more) | 209 |  | ✓ |
| 14. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Removing duplicate spaces between characters | 209 |  | ✓ |
| 15. | [common/punctuation/quoteLink](../src/rules/common/punctuation/quoteLink.js) | Removal quotes outside a link | 415 | show-safe-tags-html | ✓ |
| 16. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Remove spaces at start of line | 210 |  |  |
| 17. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.js) | Space after “...”, “!..” and “?..” | 210 |  | ✓ |
| 18. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Remove space before %, ‰ and ‱ | 210 |  | ✓ |
| 19. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.js) | space after punctuation | 210 |  | ✓ |
| 20. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Space before opening bracket | 210 |  | ✓ |
| 21. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Remove extra spaces after opening and before closing square bracket | 210 |  | ✓ |
| 22. | [common/space/bracket](../src/rules/common/space/bracket.js) | Remove extra spaces after opening and before closing bracket | 210 |  | ✓ |
| 23. | [ru/space/year](../src/rules/ru/space/year.js) | Space between number and word “год” | 210 |  | ✓ |
| 24. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Remove spaces before punctuation | 210 |  | ✓ |
| 25. | [ru/dash/main](../src/rules/ru/dash/main.js) | Replacement hyphen with dash | 305 |  | ✓ |
| 26. | [ru/dash/de](../src/rules/ru/dash/de.js) | Hyphen before “де” | 310 |  |  |
| 27. | [ru/dash/surname](../src/rules/ru/dash/surname.js) | Acronyms with a dash | 310 |  | ✓ |
| 28. | [ru/dash/month](../src/rules/ru/dash/month.js) | Dash between months | 310 |  | ✓ |
| 29. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Hyphen between “из-под” | 310 |  | ✓ |
| 30. | [ru/dash/years](../src/rules/ru/dash/years.js) | Hyphen to dash in years | 310 |  | ✓ |
| 31. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Hyphen after “кое” and “кой” | 310 |  | ✓ |
| 32. | [ru/dash/ka](../src/rules/ru/dash/ka.js) | Hyphen before “ка” and “кась” | 310 |  | ✓ |
| 33. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Hyphen between “из-за” | 310 |  | ✓ |
| 34. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Dash between the days of the week | 310 |  | ✓ |
| 35. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.js) | Dash in direct speech | 310 |  | ✓ |
| 36. | [ru/dash/decade](../src/rules/ru/dash/decade.js) | Dash in decade | 310 |  | ✓ |
| 37. | [ru/dash/to](../src/rules/ru/dash/to.js) | Hyphen before “то”, “либо”, “нибудь” | 310 |  | ✓ |
| 38. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.js) | Dash between days of one month | 310 |  | ✓ |
| 39. | [ru/dash/centuries](../src/rules/ru/dash/centuries.js) | Hyphen to dash in centuries | 310 |  | ✓ |
| 40. | [ru/dash/time](../src/rules/ru/dash/time.js) | Dash in time intervals | 310 |  | ✓ |
| 41. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Hyphen between “верно-таки” and etc. | 310 |  | ✓ |
| 42. | [common/punctuation/quote](../src/rules/common/punctuation/quote.js) | Placement of quotation marks in texts | 410 |  | ✓ |
| 43. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Placement of commas before “а” and “но” | 410 |  | ✓ |
| 44. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Removing double punctuation | 410 |  | ✓ |
| 45. | [common/punctuation/apostrophe](../src/rules/common/punctuation/apostrophe.js) | Placement of correct apostrophe | 410 |  | ✓ |
| 46. | [common/punctuation/hellip](../src/rules/common/punctuation/hellip.js) | Replacement of three points by ellipsis | 410 |  | ✓ |
| 47. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.js) | !! → ! | 410 |  | ✓ |
| 48. | [ru/punctuation/hellipQuestion](../src/rules/ru/punctuation/hellipQuestion.js) | «?…» → «?..», «!…» → «!..», «…,» → «…» | 410 |  | ✓ |
| 49. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.js) | !? → ?! | 415 |  | ✓ |
| 50. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Non-breaking space between number and month | 510 |  | ✓ |
| 51. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Non-breaking thin space after № | 510 |  | ✓ |
| 52. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Non-breaking space before lpi and dpi | 510 |  | ✓ |
| 53. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Non-breaking space before last short word in sentence | 510 |  | ✓ |
| 54. | [common/nbsp/beforeShortLastNumber](../src/rules/common/nbsp/beforeShortLastNumber.js) | Non-breaking space before number (maximum 2 digits) at end of sentence | 510 |  | ✓ |
| 55. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Non-breaking space after short word | 510 |  | ✓ |
| 56. | [common/nbsp/afterParagraph](../src/rules/common/nbsp/afterParagraph.js) | Non-breaking thin space after § | 510 |  | ✓ |
| 57. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Non-breaking space between number and word | 510 |  |  |
| 58. | [ru/nbsp/year](../src/rules/ru/nbsp/year.js) | Non-breaking space before XXXX г. (2012 г.) | 510 |  | ✓ |
| 59. | [ru/nbsp/see](../src/rules/ru/nbsp/see.js) | Non-breaking space after abbreviation «см.» and «им.» | 510 |  | ✓ |
| 60. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.js) | Not once. space before the “rub” and “cop.” | 510 |  | ✓ |
| 61. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Non-breaking space in P. S. and P. P. S. | 510 |  | ✓ |
| 62. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Non-breaking space after “стр.”, “гл.”, “рис.”, “илл.” | 510 |  | ✓ |
| 63. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Non-breaking space in abbreviations, e.g. “т. д.” | 510 |  | ✓ |
| 64. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al. | 510 |  | ✓ |
| 65. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ” | 510 |  | ✓ |
| 66. | [ru/nbsp/mln](../src/rules/ru/nbsp/mln.js) | Non-breaking space between number and “тыс.”, “млн”, “млрд” and “трлн” | 510 |  | ✓ |
| 67. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.js) | Remove spaces and extra points in “вв.” | 510 |  | ✓ |
| 68. | [ru/nbsp/initials](../src/rules/ru/nbsp/initials.js) | Binding of initials to the name | 510 |  | ✓ |
| 69. | [ru/nbsp/groupNumbers](../src/rules/ru/nbsp/groupNumbers.js) | Replacement space on a narrow non-breaking space in groups of numbers | 510 |  | ✓ |
| 70. | [ru/nbsp/years](../src/rules/ru/nbsp/years.js) | г.г. → гг. and non-breaking space | 515 |  | ✓ |
| 71. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Non-breaking space before “ли”, “ль”, “же”, “бы”, “б” | 515 |  | ✓ |
| 72. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | m2 → м², m3 → м³ and non-breaking space | 515 |  | ✓ |
| 73. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 610 |  | ✓ |
| 74. | [ru/number/comma](../src/rules/ru/number/comma.js) | Commas in numbers | 610 |  | ✓ |
| 75. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/4 → ¾ | 610 |  | ✓ |
| 76. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | 610 |  | ✓ |
| 77. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 610 |  | ✓ |
| 78. | [ru/money/currency](../src/rules/ru/money/currency.js) | Currency symbol ($, €, ¥, Ұ, £ and ₤) after the number, $100 → 100 $ | 710 |  | ✓ |
| 79. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | 710 |  |  |
| 80. | [ru/date/fromISO](../src/rules/ru/date/fromISO.js) | Converting dates YYYY-MM-DD type DD.MM.YYYY | 810 |  | ✓ |
| 81. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | 810 |  | ✓ |
| 82. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Removing repeat words | 910 |  |  |
| 83. | [ru/other/accent](../src/rules/ru/other/accent.js) | Replacement capital letters to lowercase with addition of accent | 910 |  |  |
| 84. | [ru/other/phone-number](../src/rules/ru/other/phone-number.js) | Formatting phone numbers | 910 |  | ✓ |
| 85. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | for comma | 1010 |  |  |
| 86. | [ru/optalign/quote](../src/rules/ru/optalign/quote.js) | for opening quotation marks | 1010 |  |  |
| 87. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | for opening bracket | 1010 |  |  |
| 88. | [ru/typo/switchingKeyboardLayout](../src/rules/ru/typo/switchingKeyboardLayout.js) | Replacement of Latin letters in Russian. Typos occur when you switch keyboard layouts | 1110 |  | ✓ |
| 89. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Replace non-breaking space to normal space in tags nowrap and nobr | 510 | end | ✓ |
| 90. | [common/html/url](../src/rules/common/html/url.js) | Placement of links | 1210 | end |  |
| 91. | [common/html/e-mail](../src/rules/common/html/e-mail.js) | Placement of links for e-mail | 1210 | end |  |
| 92. | [common/html/p](../src/rules/common/html/p.js) | Placement of paragraph | 1215 | end |  |
| 93. | [common/html/nbr](../src/rules/common/html/nbr.js) | Replacement line break on <br/> | 1220 | end |  |
| 94. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Removing HTML-tags | 1309 | end |  |
| 95. | [common/html/escape](../src/rules/common/html/escape.js) | Escaping HTML | 1310 | end |  |
