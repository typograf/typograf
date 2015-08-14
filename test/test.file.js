var chai = require('chai'),
    assert = chai.assert,
    Typograf = require('../build/typograf'),
    t = new Typograf({lang: 'ru', mode: 'digit'}),
    fs = require('fs');
    
chai.config.showDiff = true;

describe('Test before-after files', function() {
    var dirBefore = './test/before/',
        dirAfter = './test/after/',
        files = fs.readdirSync(dirBefore);

    files.forEach(function(el) {
        if(el.search(/\.tmp$/) !== -1) {
            return;
        }
        var fileBefore = dirBefore + el,
            fileAfter = dirAfter + el;
        if(fs.statSync(fileBefore).isFile()) {
            var before = fs.readFileSync(fileBefore).toString(),
                after = fs.readFileSync(fileAfter).toString();
            var res = t.execute(before);
            fs.writeFileSync(fileBefore + '.tmp', res);
            it(fileBefore + ' == ' + fileAfter, function() {
                assert.equal(res, after);
            });
        }
    });
});
