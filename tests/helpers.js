var typo = new Typograf();

function rule(name, text) {
    var rules = Typograf.prototype._rules;
    
    rules.forEach(function(f) {
        if(f.name === name) {
            text = f.callback(text);
        }
    });
    
    return text;
}

texec = function(text) {
    return typo.execute(text);
};
