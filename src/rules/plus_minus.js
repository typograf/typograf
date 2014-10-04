// Замена +- около чисел
Typograf.rule('plus_minus', 1010, function(text) {
    var re = new RegExp('(^| |\\>|\00uA0)\\+-(\\d)', 'g');
    return text.replace(re, '$1±$2');
});
