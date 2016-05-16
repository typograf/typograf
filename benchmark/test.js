var fs = require('fs'),
    Typograf = require('../build/typograf.js'),
    tp = new Typograf({lang: 'ru'}),
    beforeTimes = {},
    afterTimes = {},
    text = fs.readFileSync('war_and_peace.html').toString();

tp._onBeforeRule = function(name, text) {
    beforeTimes[name] = Date.now();
};

tp._onAfterRule = function(name, text) {
    afterTimes[name] = Date.now();
};

function calcTimes() {
    var times = [],
        total = 0;

    Object.keys(afterTimes).forEach(function(name) {
        times.push({
            name: name,
            time: afterTimes[name] - beforeTimes[name]
        });
    });

    times.sort(function(a, b) {
        if(a.time < b.time) {
            return 1;
        } else if(a.time > b.time) {
            return -1;
        }

        return 0;
    });

    times.forEach(function(item) {
        total += item.time;
    });

    return {
        times: times,
        total: total
    };
}

console.log(`Text length: ${text.length} symbols`);

var startTime = Date.now();
var output = tp.execute(text);
var totalTime = Date.now() - startTime;
console.log(`Total time: ${totalTime} ms`);

var result = calcTimes();
console.log(`Total time in rules: ${result.total} ms`);
result.times.forEach(function(item, i) {
    if(item.time) {
        console.log(`${i + 1}. ${item.name}: ${item.time} ms`);
    }
});

fs.writeFileSync('output.html', output);
