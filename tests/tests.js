test('rule copy', function () {
    equal(rule('copy', '(c)'), '©');
    equal(rule('copy', '(с)'), '©');
    equal(rule('copy', '(r)'), '®');
    equal(rule('copy', '+/-'), '±');
    equal(rule('copy', '(tm)'), '™');
});

test('rule izza', function () {
    equal(rule('izza', 'Из за лесу'), 'Из-за лесу');
    equal(rule('izza', '  Из за лесу'), '  Из-за лесу');
    equal(rule('izza', 'из за гор'), 'из-за гор');
    equal(rule('izza', '  из за гор'), '  из-за гор');
});

test('rule c', function () {
    equal(rule('c', ' 200 C'), ' 200 °C');
    equal(rule('c', ' 200 C.'), ' 200 °C.');
    equal(rule('c', ' 20d C'), ' 20d C');
    equal(rule('c', ' 20 C1'), ' 20 C1');
    
    equal(rule('c', ' 200 F'), ' 200 °F');
});

test('smoke', function() {
    equal(texec('    Мир - мой мир!    '), 'Мир — мой мир!');
});
