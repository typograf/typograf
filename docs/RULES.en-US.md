## Rules of typograf

| № | Name ▼ | Title | [Index](./RULES_SORTED.en.md) | Queue | On |
|--:|--------|-------|------------------------------:|:-----:|:--:|
| 1. | [common/html/e-mail](../src/rules/common/html/e-mail.js) | Placement of links for e-mail | undefined | end |  |
| 2. | [common/html/escape](../src/rules/common/html/escape.js) | Escaping HTML | undefined | end |  |
| 3. | [common/html/nbr](../src/rules/common/html/nbr.js) | Replacement line break on <br/> | undefined | end |  |
| 4. | [common/html/p](../src/rules/common/html/p.js) | Placement of paragraph | undefined | end |  |
| 5. | [common/html/processingAttrs](../src/rules/common/html/processingAttrs.js) | Processing HTML attributes | undefined | hide-safe-tags-own |  |
| 6. | [common/html/quot](../src/rules/common/html/quot.js) | &⁠quot; → " | undefined | hide-safe-tags | ✓ |
| 7. | [common/html/stripTags](../src/rules/common/html/stripTags.js) | Removing HTML-tags | undefined | end |  |
| 8. | [common/html/url](../src/rules/common/html/url.js) | Placement of links | undefined | end |  |
| 9. | [common/nbsp/afterNumber](../src/rules/common/nbsp/afterNumber.js) | Non-breaking space between number and word | undefined |  |  |
| 10. | [common/nbsp/afterParagraphMark](../src/rules/common/nbsp/afterParagraphMark.js) | Non-breaking space after ¶ | undefined |  | ✓ |
| 11. | [common/nbsp/afterSectionMark](../src/rules/common/nbsp/afterSectionMark.js) | Non-breaking space after § | undefined |  | ✓ |
| 12. | [common/nbsp/afterShortWord](../src/rules/common/nbsp/afterShortWord.js) | Non-breaking space after short word | undefined |  | ✓ |
| 13. | [common/nbsp/beforeShortLastNumber](../src/rules/common/nbsp/beforeShortLastNumber.js) | Non-breaking space before number (maximum 2 digits) at end of sentence | undefined |  | ✓ |
| 14. | [common/nbsp/beforeShortLastWord](../src/rules/common/nbsp/beforeShortLastWord.js) | Non-breaking space before last short word in sentence | undefined |  | ✓ |
| 15. | [common/nbsp/dpi](../src/rules/common/nbsp/dpi.js) | Non-breaking space before lpi and dpi | undefined |  | ✓ |
| 16. | [common/nbsp/nowrap](../src/rules/common/nbsp/nowrap.js) | Replace non-breaking space to normal space in tags nowrap and nobr | undefined | end | ✓ |
| 17. | [common/nbsp/replaceNbsp](../src/rules/common/nbsp/replaceNbsp.js) | Replacing non-breaking space on normal before text correction | undefined | utf |  |
| 18. | [common/number/digitGrouping](../src/rules/common/number/digitGrouping.js) | Divide into groups numbers with many digits | undefined |  |  |
| 19. | [common/number/fraction](../src/rules/common/number/fraction.js) | 1/2 → ½, 1/4 → ¼, 3/4 → ¾ | undefined |  | ✓ |
| 20. | [common/number/mathSigns](../src/rules/common/number/mathSigns.js) | != → ≠, <= → ≤, >= → ≥, ~= → ≅, +- → ± | undefined |  | ✓ |
| 21. | [common/number/times](../src/rules/common/number/times.js) | x → × (10 x 5 → 10×5) | undefined |  | ✓ |
| 22. | [common/other/delBOM](../src/rules/common/other/delBOM.js) | Delete character BOM (Byte Order Mark) | undefined | start | ✓ |
| 23. | [common/other/repeatWord](../src/rules/common/other/repeatWord.js) | Removing repeat words | undefined |  |  |
| 24. | [common/punctuation/apostrophe](../src/rules/common/punctuation/apostrophe.js) | Placement of correct apostrophe | undefined |  | ✓ |
| 25. | [common/punctuation/delDoublePunctuation](../src/rules/common/punctuation/delDoublePunctuation.js) | Removing double punctuation | undefined |  | ✓ |
| 26. | [common/punctuation/hellip](../src/rules/common/punctuation/hellip.js) | Replacement of three points by ellipsis | undefined |  | ✓ |
| 27. | [common/punctuation/quote](../src/rules/common/punctuation/quote.js) | Placement of quotation marks in texts | undefined |  | ✓ |
| 28. | [common/punctuation/quoteLink](../src/rules/common/punctuation/quoteLink.js) | Removal quotes outside a link | undefined | show-safe-tags-html | ✓ |
| 29. | [common/space/afterColon](../src/rules/common/space/afterColon.js) | space after colon | undefined |  | ✓ |
| 30. | [common/space/afterComma](../src/rules/common/space/afterComma.js) | space after comma | undefined |  | ✓ |
| 31. | [common/space/afterExclamationMark](../src/rules/common/space/afterExclamationMark.js) | space after exclamation mark | undefined |  | ✓ |
| 32. | [common/space/afterQuestionMark](../src/rules/common/space/afterQuestionMark.js) | space after question mark | undefined |  | ✓ |
| 33. | [common/space/afterSemicolon](../src/rules/common/space/afterSemicolon.js) | space after semicolon | undefined |  | ✓ |
| 34. | [common/space/beforeBracket](../src/rules/common/space/beforeBracket.js) | Space before opening bracket | undefined |  | ✓ |
| 35. | [common/space/bracket](../src/rules/common/space/bracket.js) | Remove extra spaces after opening and before closing bracket | undefined |  | ✓ |
| 36. | [common/space/delBeforeDot](../src/rules/common/space/delBeforeDot.js) | Remove space before dot | undefined |  | ✓ |
| 37. | [common/space/delBeforePercent](../src/rules/common/space/delBeforePercent.js) | Remove space before %, ‰ and ‱ | undefined |  | ✓ |
| 38. | [common/space/delBeforePunctuation](../src/rules/common/space/delBeforePunctuation.js) | Remove spaces before punctuation | undefined |  | ✓ |
| 39. | [common/space/delBetweenExclamationMarks](../src/rules/common/space/delBetweenExclamationMarks.js) | Remove spaces before exclamation marks | undefined |  | ✓ |
| 40. | [common/space/delLeadingBlanks](../src/rules/common/space/delLeadingBlanks.js) | Remove spaces at start of line | undefined |  |  |
| 41. | [common/space/delRepeatN](../src/rules/common/space/delRepeatN.js) | Remove duplicate line breaks | undefined |  | ✓ |
| 42. | [common/space/delRepeatSpace](../src/rules/common/space/delRepeatSpace.js) | Removing duplicate spaces between characters | undefined |  | ✓ |
| 43. | [common/space/delTrailingBlanks](../src/rules/common/space/delTrailingBlanks.js) | Remove spaces at end of line | undefined |  | ✓ |
| 44. | [common/space/insertFinalNewline](../src/rules/common/space/insertFinalNewline.js) | Insert final newline | undefined | end |  |
| 45. | [common/space/replaceTab](../src/rules/common/space/replaceTab.js) | Replacement of tab to 4 spaces | undefined |  | ✓ |
| 46. | [common/space/squareBracket](../src/rules/common/space/squareBracket.js) | Remove extra spaces after opening and before closing square bracket | undefined |  | ✓ |
| 47. | [common/space/trimLeft](../src/rules/common/space/trimLeft.js) | Remove spaces and line breaks in beginning of text | undefined |  | ✓ |
| 48. | [common/space/trimRight](../src/rules/common/space/trimRight.js) | Remove spaces and line breaks at end of text | undefined |  | ✓ |
| 49. | [common/symbols/arrow](../src/rules/common/symbols/arrow.js) | -> → →, <- → ← | undefined |  | ✓ |
| 50. | [common/symbols/cf](../src/rules/common/symbols/cf.js) | Adding ° to C and F | undefined |  | ✓ |
| 51. | [common/symbols/copy](../src/rules/common/symbols/copy.js) | (c) → ©, (tm) → ™, (r) → ® | undefined |  | ✓ |
| 52. | [en-US/dash/main](../src/rules/en-US/dash/main.js) | Replace hyphens surrounded by spaces with an em-dash | undefined |  | ✓ |
| 53. | [ru/dash/centuries](../src/rules/ru/dash/centuries.js) | Hyphen to dash in centuries | undefined |  | ✓ |
| 54. | [ru/dash/daysMonth](../src/rules/ru/dash/daysMonth.js) | Dash between days of one month | undefined |  | ✓ |
| 55. | [ru/dash/de](../src/rules/ru/dash/de.js) | Hyphen before “де” | undefined |  |  |
| 56. | [ru/dash/decade](../src/rules/ru/dash/decade.js) | Dash in decade | undefined |  | ✓ |
| 57. | [ru/dash/directSpeech](../src/rules/ru/dash/directSpeech.js) | Dash in direct speech | undefined |  | ✓ |
| 58. | [ru/dash/izpod](../src/rules/ru/dash/izpod.js) | Hyphen between “из-под” | undefined |  | ✓ |
| 59. | [ru/dash/izza](../src/rules/ru/dash/izza.js) | Hyphen between “из-за” | undefined |  | ✓ |
| 60. | [ru/dash/ka](../src/rules/ru/dash/ka.js) | Hyphen before “ка” and “кась” | undefined |  | ✓ |
| 61. | [ru/dash/kakto](../src/rules/ru/dash/kakto.js) | Hyphen for “как то” | undefined |  | ✓ |
| 62. | [ru/dash/koe](../src/rules/ru/dash/koe.js) | Hyphen after “кое” and “кой” | undefined |  | ✓ |
| 63. | [ru/dash/main](../src/rules/ru/dash/main.js) | Replacement hyphen with dash | undefined |  | ✓ |
| 64. | [ru/dash/month](../src/rules/ru/dash/month.js) | Dash between months | undefined |  | ✓ |
| 65. | [ru/dash/surname](../src/rules/ru/dash/surname.js) | Acronyms with a dash | undefined |  | ✓ |
| 66. | [ru/dash/taki](../src/rules/ru/dash/taki.js) | Hyphen between “верно-таки” and etc. | undefined |  | ✓ |
| 67. | [ru/dash/time](../src/rules/ru/dash/time.js) | Dash in time intervals | undefined |  | ✓ |
| 68. | [ru/dash/to](../src/rules/ru/dash/to.js) | Hyphen before “то”, “либо”, “нибудь” | undefined |  | ✓ |
| 69. | [ru/dash/weekday](../src/rules/ru/dash/weekday.js) | Dash between the days of the week | undefined |  | ✓ |
| 70. | [ru/dash/years](../src/rules/ru/dash/years.js) | Hyphen to dash in years | undefined |  | ✓ |
| 71. | [ru/date/fromISO](../src/rules/ru/date/fromISO.js) | Converting dates YYYY-MM-DD type DD.MM.YYYY | undefined |  | ✓ |
| 72. | [ru/date/weekday](../src/rules/ru/date/weekday.js) | 2 Мая, Понедельник → 2 мая, понедельник | undefined |  | ✓ |
| 73. | [ru/money/currency](../src/rules/ru/money/currency.js) | Currency symbol ($, €, ¥, Ұ, £ and ₤) after the number, $100 → 100 $ | undefined |  |  |
| 74. | [ru/money/ruble](../src/rules/ru/money/ruble.js) | 1 руб. → 1 ₽ | undefined |  |  |
| 75. | [ru/nbsp/abbr](../src/rules/ru/nbsp/abbr.js) | Non-breaking space in abbreviations, e.g. “т. д.” | undefined |  | ✓ |
| 76. | [ru/nbsp/addr](../src/rules/ru/nbsp/addr.js) | Placement of non-breaking space after “г.”, “обл.”, “ул.”, “пр.”, “кв.” et al. | undefined |  | ✓ |
| 77. | [ru/nbsp/afterNumberSign](../src/rules/ru/nbsp/afterNumberSign.js) | Non-breaking thin space after № | undefined |  | ✓ |
| 78. | [ru/nbsp/beforeParticle](../src/rules/ru/nbsp/beforeParticle.js) | Non-breaking space before “ли”, “ль”, “же”, “бы”, “б” | undefined |  | ✓ |
| 79. | [ru/nbsp/centuries](../src/rules/ru/nbsp/centuries.js) | Remove spaces and extra points in “вв.” | undefined |  | ✓ |
| 80. | [ru/nbsp/dayMonth](../src/rules/ru/nbsp/dayMonth.js) | Non-breaking space between number and month | undefined |  | ✓ |
| 81. | [ru/nbsp/initials](../src/rules/ru/nbsp/initials.js) | Binding of initials to the name | undefined |  | ✓ |
| 82. | [ru/nbsp/m](../src/rules/ru/nbsp/m.js) | m2 → м², m3 → м³ and non-breaking space | undefined |  | ✓ |
| 83. | [ru/nbsp/mln](../src/rules/ru/nbsp/mln.js) | Non-breaking space between number and “тыс.”, “млн”, “млрд” and “трлн” | undefined |  | ✓ |
| 84. | [ru/nbsp/ooo](../src/rules/ru/nbsp/ooo.js) | Non-breaking space after “OOO, ОАО, ЗАО, НИИ, ПБОЮЛ” | undefined |  | ✓ |
| 85. | [ru/nbsp/page](../src/rules/ru/nbsp/page.js) | Non-breaking space after “стр.”, “гл.”, “рис.”, “илл.” | undefined |  | ✓ |
| 86. | [ru/nbsp/ps](../src/rules/ru/nbsp/ps.js) | Non-breaking space in P. S. and P. P. S. | undefined |  | ✓ |
| 87. | [ru/nbsp/rubleKopek](../src/rules/ru/nbsp/rubleKopek.js) | Not once. space before the “rub” and “cop.” | undefined |  | ✓ |
| 88. | [ru/nbsp/see](../src/rules/ru/nbsp/see.js) | Non-breaking space after abbreviation «см.» and «им.» | undefined |  | ✓ |
| 89. | [ru/nbsp/year](../src/rules/ru/nbsp/year.js) | Non-breaking space before XXXX г. (2012 г.) | undefined |  | ✓ |
| 90. | [ru/nbsp/years](../src/rules/ru/nbsp/years.js) | г.г. → гг. and non-breaking space | undefined |  | ✓ |
| 91. | [ru/number/comma](../src/rules/ru/number/comma.js) | Commas in numbers | undefined |  | ✓ |
| 92. | [ru/number/ordinals](../src/rules/ru/number/ordinals.js) | N-ый, -ой, -ая, -ое, -ые, -ым, -ом, -ых → N-й, -я, -е, -м, -х (25-й) | undefined |  | ✓ |
| 93. | [ru/optalign/bracket](../src/rules/ru/optalign/bracket.js) | for opening bracket | undefined |  |  |
| 94. | [ru/optalign/comma](../src/rules/ru/optalign/comma.js) | for comma | undefined |  |  |
| 95. | [ru/optalign/quote](../src/rules/ru/optalign/quote.js) | for opening quotation marks | undefined |  |  |
| 96. | [ru/other/accent](../src/rules/ru/other/accent.js) | Replacement capital letters to lowercase with addition of accent | undefined |  |  |
| 97. | [ru/other/phone-number](../src/rules/ru/other/phone-number.js) | Formatting phone numbers | undefined |  | ✓ |
| 98. | [ru/punctuation/ano](../src/rules/ru/punctuation/ano.js) | Placement of commas before “а” and “но” | undefined |  | ✓ |
| 99. | [ru/punctuation/exclamation](../src/rules/ru/punctuation/exclamation.js) | !! → ! | undefined |  | ✓ |
| 100. | [ru/punctuation/exclamationQuestion](../src/rules/ru/punctuation/exclamationQuestion.js) | !? → ?! | undefined |  | ✓ |
| 101. | [ru/punctuation/hellipQuestion](../src/rules/ru/punctuation/hellipQuestion.js) | «?…» → «?..», «!…» → «!..», «…,» → «…» | undefined |  | ✓ |
| 102. | [ru/space/afterHellip](../src/rules/ru/space/afterHellip.js) | Space after “...”, “!..” and “?..” | undefined |  | ✓ |
| 103. | [ru/space/year](../src/rules/ru/space/year.js) | Space between number and word “год” | undefined |  | ✓ |
| 104. | [ru/symbols/NN](../src/rules/ru/symbols/NN.js) | №№ → № | undefined |  | ✓ |
| 105. | [ru/typo/switchingKeyboardLayout](../src/rules/ru/typo/switchingKeyboardLayout.js) | Replacement of Latin letters in Russian. Typos occur when you switch keyboard layouts | undefined |  | ✓ |
