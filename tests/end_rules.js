tests.forEach(function(elem) {
    test(elem[0], function() {
        elem[1].forEach(function (as) {
            equal(rule(elem[0], as[0]), as[1], as[0] + ' → ' + as[1]);
        });
    });
});
