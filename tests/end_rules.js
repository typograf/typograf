
QUnit.module('rules');

var typo = new Typograf();

function rule(name, text) {
    var rules = Typograf.prototype._rules;
    
    rules.forEach(function(f) {
        if(f.name === name) {
            text = f.func.call(typo, text, typo._settings[f.name]);
        }
    });
    
    return text;
}

tests.forEach(function(elem) {
    test(elem[0], function() {
        elem[1].forEach(function (as) {
            equal(rule(elem[0], as[0]), as[1], as[0] + ' → ' + as[1]);
        });
    });
});

})();