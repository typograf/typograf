var fs = require('fs'),
    Typograf = require('../build/typograf.js'),
    tp = new Typograf({lang: 'ru'}),
    beforeTimes = {},
    afterTimes = {},
    text = fs.readFileSync('war_and_peace.html').toString();

tp._onBeforeRule = function(name, text) {
    beforeTimes[name] = now();
};

tp._onAfterRule = function(name, text) {
    afterTimes[name] = now();
};

function now() {
    var hrtime = process.hrtime();
    return ( hrtime[0] * 1000000 + hrtime[1] / 1000 ) / 1000;
}

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

var startTime = now();
var output = tp.execute(text);
var totalTime = now() - startTime;
console.log(`Total time: ${totalTime} ms`);

var result = calcTimes();
console.log(`Total time in rules: ${result.total} ms`);
result.times.forEach(function(item, i) {
    var time = Math.floor(item.time * 1000) / 1000;
    if(item.time) {
        console.log(`${i + 1}. ${item.name}: ${time} ms`);
    }
});

fs.writeFileSync('output.html', output);
