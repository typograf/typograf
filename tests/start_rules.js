var tests = [];
var typo = new Typograf();

function rule(name, text) {
    var rules = Typograf.prototype._rules;
    
    rules.forEach(function(f) {
        if(f.name === name) {
            text = f.func(text);
        }
    });
    
    return text;
}

function texec(text) {
    return typo.execute(text);
}

QUnit.module('rules');
