// Замена икса в числах на знак умножения
Typograf.rule('times', 1050, function(text) {
    return text.replace(/(\d) ?(x|х) ?(\d)/g, "$1×$3");
});
