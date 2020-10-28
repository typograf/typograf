## Rules of typograf in order of execution

| № | [Name](./RULES.en.md) | Title | Index ▼ | Queue | On |
|--:|-----------------------|-------|--------:|:-----:|:--:|
| 1. | [common/other/delBOM](../src/rules/common/other/delBOM.ts) | Delete character BOM (Byte Order Mark) | -1 | start | ✓ |
| 2. | [common/symbols/arrow](../src/rules/common/symbols/arrow.ts) | -> → →, <- → ← | 110 | default | ✓ |
| 3. | [common/symbols/cf](../src/rules/common/symbols/cf.ts) | Adding ° to C and F | 110 | default | ✓ |
| 4. | [common/symbols/copy](../src/rules/common/symbols/copy.ts) | (c) → ©, (tm) → ™, (r) → ® | 110 | default | ✓ |
| 5. | [ru/symbols/NN](../src/rules/ru/symbols/NN.ts) | №№ → № | 110 | default | ✓ |
| 6. | [common/space/replaceTab](../src/rules/common/space/replaceTab.ts) | Replacement of tab to 4 spaces | 205 | default | ✓ |
| 7. | [common/space/trimLeft](../src/rules/common/space/trimLeft.ts) | Remove spaces and line breaks in beginning of text | 206 | default | ✓ |
| 8. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.ts) | Remove spaces at end of line | 207 | default | ✓ |
| 9. | [common/space/trimRight](../src/rules/common/space/trimRight.ts) | Remove spaces and line breaks at end of text | 207 | default | ✓ |
| 10. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.ts) | Remove duplicate line breaks | 209 | default | ✓ |
| 11. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.ts) | Removing duplicate spaces between characters | 209 | default | ✓ |
| 12. | [common/space/afterPunctuation](../src/rules/common/space/afterPunctuation.ts) | space after punctuation | 210 | default | ✓ |
| 13. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.ts) | Space before opening bracket | 210 | default | ✓ |
| 14. | [common/space/bracket](../src/rules/common/space/bracket.ts) | Remove extra spaces after opening and before closing bracket | 210 | default | ✓ |
| 15. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.ts) | Remove space before %, ‰ and ‱ | 210 | default | ✓ |
| 16. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.ts) | Remove spaces before punctuation | 210 | default | ✓ |
| 17. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.ts) | Remove spaces at start of line | 210 | default |  |
| 18. | [common/space/insertFinalNewline](../src/rules/common/space/insertFinalNewline.ts) | Insert final newline | 210 | end |  |
| 19. | [common/space/squareBracket](../src/rules/common/space/squareBracket.ts) | Remove extra spaces after opening and before closing square bracket | 210 | default | ✓ |
| 20. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.ts) | Space after “...”, “!..” and “?..” | 210 | default | ✓ |
| 21. | [ru/space/year](../src/rules/ru/space/year.ts) | Space between number and word “год” | 210 | default | ✓ |
| 22. | [en-US/dash/main](../src/rules/en-US/dash/main.ts) | Replace hyphens surrounded by spaces with an em-dash | 305 | default | ✓ |
| 23. | [ru/dash/main](../src/rules/ru/dash/main.ts) | Replacement hyphen with dash | 305 | default | ✓ |
| 24. | [ru/dash/centuries](../src/rules/ru/dash/centuries.ts) | Hyphen to dash in centuries | 310 | default | ✓ |
| 25. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.ts) | Dash between days of one month | 310 | default | ✓ |
| 26. | [ru/dash/de](../src/rules/ru/dash/de.ts) | Hyphen before “де” | 310 | default |  |
| 27. | [ru/dash/decade](../src/rules/ru/dash/decade.ts) | Dash in decade | 310 | default | ✓ |
| 28. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.ts) | Dash in direct speech | 310 | default | ✓ |
| 29. | [ru/dash/izpod](../src/rules/ru/dash/izpod.ts) | Hyphen between “из-под” | 310 | default | ✓ |
| 30. | [ru/dash/izza](../src/rules/ru/dash/izza.ts) | Hyphen between “из-за” | 310 | default | ✓ |
| 31. | [ru/dash/ka](../src/rules/ru/dash/ka.ts) | Hyphen before “ка” and “кась” | 310 | default | ✓ |
| 32. | [ru/dash/koe](../src/rules/ru/dash/koe.ts) | Hyphen after “кое” and “кой” | 310 | default | ✓ |
| 33. | [ru/dash/month](../src/rules/ru/dash/month.ts) | Dash between months | 310 | default | ✓ |
| 34. | [ru/dash/surname](../src/rules/ru/dash/surname.ts) | Acronyms with a dash | 310 | default | ✓ |
| 35. | [ru/dash/taki](../src/rules/ru/dash/taki.ts) | Hyphen between “верно-таки” and etc. | 310 | default | ✓ |
| 36. | [ru/dash/time](../src/rules/ru/dash/time.ts) | Dash in time intervals | 310 | default | ✓ |
| 37. | [ru/dash/to](../src/rules/ru/dash/to.ts) | Hyphen before “то”, “либо”, “нибудь” | 310 | default | ✓ |
| 38. | [ru/dash/weekday](../src/rules/ru/dash/weekday.ts) | Dash between the days of the week | 310 | default | ✓ |
| 39. | [ru/dash/years](../src/rules/ru/dash/years.ts) | Hyphen to dash in years | 310 | default | ✓ |
| 40. | [common/punctuation/apostrophe](../src/rules/common/punctuation/apostrophe.ts) | Placement of correct apostrophe | 410 | default | ✓ |
| 41. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.ts) | Removing double punctuation | 410 | default | ✓ |
| 42. | [common/punctuation/hellip](../src/rules/common/punctuation/hellip.ts) | Replacement of three points by ellipsis | 410 | default | ✓ |
| 43. | [common/punctuation/quote](../src/rules/common/punctuation/quote.ts) | Placement of quotation marks in texts | 410 | default | ✓ |
| 44. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.ts) | Placement of commas before “а” and “но” | 410 | hide-safe-tags-html | ✓ |
| 45. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.ts) | !! → ! | 410 | default | ✓ |
| 46. | [ru/punctuation/hellipQuestion](../src/rules/ru/punctuation/hellipQuestion.ts) | «?…» → «?..», «!…» → «!..», «…,» → «…» | 410 | default | ✓ |
| 47. | [common/punctuation/quoteLink](../src/rules/common/punctuation/quoteLink.ts) | Removal quotes outside a link | 415 | show-safe-tags-html | ✓ |
| 48. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.ts) | !? → ?! | 415 | default | ✓ |
| 49. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.ts) | Non-breaking space between number and word | 510 | default |  |
| 50. | [common/nbsp/afterParagraphMark](../src/rules/common/nbsp/afterParagraphMark.ts) | Non-breaking space after ¶ | 510 | default | ✓ |
| 51. | [common/nbsp/afterSectionMark](../src/rules/common/nbsp/afterSectionMark.ts) | Non-breaking space after § | 510 | default | ✓ |
| 52. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.ts) | Non-breaking space after short word | 510 | default | ✓ |
| 53. | [common/nbsp/beforeShortLastNumber](../src/rules/common/nbsp/beforeShortLastNumber.ts) | Non-breaking space before number (maximum 2 digits) at end of sentence | 510 | default | ✓ |
| 54. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.ts) | Non-breaking space before last short word in sentence | 510 | default | ✓ |
| 55. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.ts) | Non-breaking space before lpi and dpi | 510 | default | ✓ |
| 56. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.ts) | Replace non-breaking space to normal space in tags nowrap and nobr | 510 | end | ✓ |
| 57. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.ts) | Replacing non-breaking space on normal before text correction | 510 | utf |  |
| 58. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.ts) | Non-breaking space in abbreviations, e.g. “т. д.” | 510 | default | ✓ |
| 59. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.ts) | Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al. | 510 | default | ✓ |
| 60. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.ts) | Non-breaking thin space after № | 510 | default | ✓ |
| 61. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.ts) | Remove spaces and extra points in “вв.” | 510 | default | ✓ |
| 62. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.ts) | Non-breaking space between number and month | 510 | default | ✓ |
| 63. | [ru/nbsp/initials](../src/rules/ru/nbsp/initials.ts) | Binding of initials to the name | 510 | default | ✓ |
| 64. | [ru/nbsp/mln](../src/rules/ru/nbsp/mln.ts) | Non-breaking space between number and “тыс.”, “млн”, “млрд” and “трлн” | 510 | default | ✓ |
| 65. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.ts) | Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ” | 510 | default | ✓ |
| 66. | [ru/nbsp/page](../src/rules/ru/nbsp/page.ts) | Non-breaking space after “стр.”, “гл.”, “рис.”, “илл.” | 510 | default | ✓ |
| 67. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.ts) | Non-breaking space in P. S. and P. P. S. | 510 | default | ✓ |
| 68. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.ts) | Not once. space before the “rub” and “cop.” | 510 | default | ✓ |
| 69. | [ru/nbsp/see](../src/rules/ru/nbsp/see.ts) | Non-breaking space after abbreviation «см.» and «им.» | 510 | default | ✓ |
| 70. | [ru/nbsp/year](../src/rules/ru/nbsp/year.ts) | Non-breaking space before XXXX г. (2012 г.) | 510 | default | ✓ |
| 71. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.ts) | Non-breaking space before “ли”, “ль”, “же”, “бы”, “б” | 515 | default | ✓ |
| 72. | [ru/nbsp/m](../src/rules/ru/nbsp/m.ts) | m2 → м², m3 → м³ and non-breaking space | 515 | default | ✓ |
| 73. | [ru/nbsp/years](../src/rules/ru/nbsp/years.ts) | г.г. → гг. and non-breaking space | 515 | default | ✓ |
| 74. | [common/number/fraction](../src/rules/common/number/fraction.ts) | 1/2 → ½, 1/4 → ¼, 3/4 → ¾ | 610 | default | ✓ |
| 75. | [common/number/mathSigns](../src/rules/common/number/mathSigns.ts) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | 610 | default | ✓ |
| 76. | [common/number/times](../src/rules/common/number/times.ts) | x → × (10 x 5 → 10×5) | 610 | default | ✓ |
| 77. | [ru/number/comma](../src/rules/ru/number/comma.ts) | Commas in numbers | 610 | default | ✓ |
| 78. | [ru/number/ordinals](../src/rules/ru/number/ordinals.ts) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | 610 | default | ✓ |
| 79. | [ru/money/currency](../src/rules/ru/money/currency.ts) | Currency symbol ($, €, ¥, Ұ, £ and ₤) after the number, $100 → 100 $ | 710 | default |  |
| 80. | [ru/money/ruble](../src/rules/ru/money/ruble.ts) | 1 руб. → 1 ₽ | 710 | default |  |
| 81. | [ru/date/fromISO](../src/rules/ru/date/fromISO.ts) | Converting dates YYYY-MM-DD type DD.MM.YYYY | 810 | default | ✓ |
| 82. | [ru/date/weekday](../src/rules/ru/date/weekday.ts) | 2 Мая, Понедельник → 2 мая, понедельник | 810 | default | ✓ |
| 83. | [common/other/repeatWord](../src/rules/common/other/repeatWord.ts) | Removing repeat words | 910 | default |  |
| 84. | [ru/other/accent](../src/rules/ru/other/accent.ts) | Replacement capital letters to lowercase with addition of accent | 910 | default |  |
| 85. | [ru/other/phoneNumber](../src/rules/ru/other/phoneNumber.ts) | Formatting phone numbers | 910 | default | ✓ |
| 86. | [common/number/digitGrouping](../src/rules/common/number/digitGrouping.ts) | Divide into groups numbers with many digits | 920 | default |  |
| 87. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.ts) | for opening bracket | 1010 | default |  |
| 88. | [ru/optalign/comma](../src/rules/ru/optalign/comma.ts) | for comma | 1010 | default |  |
| 89. | [ru/optalign/quote](../src/rules/ru/optalign/quote.ts) | for opening quotation marks | 1010 | default |  |
| 90. | [ru/typo/switchingKeyboardLayout](../src/rules/ru/typo/switchingKeyboardLayout.ts) | Replacement of Latin letters in Russian. Typos occur when you switch keyboard layouts | 1110 | default | ✓ |
| 91. | [common/html/e-mail](../src/rules/common/html/e-mail.ts) | Placement of links for e-mail | 1210 | end |  |
| 92. | [common/html/processingAttrs](../src/rules/common/html/processingAttrs.ts) | Processing HTML attributes | 1210 | hide-safe-tags-own |  |
| 93. | [common/html/quot](../src/rules/common/html/quot.ts) | &⁠quot; → " | 1210 | hide-safe-tags | ✓ |
| 94. | [common/html/url](../src/rules/common/html/url.ts) | Placement of links | 1210 | end |  |
| 95. | [common/html/p](../src/rules/common/html/p.ts) | Placement of paragraph | 1215 | end |  |
| 96. | [common/html/nbr](../src/rules/common/html/nbr.ts) | Replacement line break on <br/> | 1220 | end |  |
| 97. | [common/html/stripTags](../src/rules/common/html/stripTags.ts) | Removing HTML-tags | 1309 | end |  |
| 98. | [common/html/escape](../src/rules/common/html/escape.ts) | Escaping HTML | 1310 | end |  |
