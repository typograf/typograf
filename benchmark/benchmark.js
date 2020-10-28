const fs = require('fs');
const Typograf = require('../build/typograf.js');

const tp = new Typograf({locale: 'ru'});
const beforeTimes = {};
const afterTimes = {};
const text = fs.readFileSync('./war_and_peace.html').toString();

tp.onBeforeRule = rule => { beforeTimes[rule.name] = now(); };
tp.onAfterRule = rule => { afterTimes[rule.name] = now(); };

function now() {
    const hrtime = process.hrtime();

    return ( hrtime[0] * 1000000 + hrtime[1] / 1000 ) / 1000;
}

function calcTimes() {
    const times = [];
    let total = 0;

    Object.keys(afterTimes).forEach(name => {
        times.push({
            name: name,
            time: afterTimes[name] - beforeTimes[name]
        });
    });

    times.sort((a, b) => {
        if (a.time < b.time) {
            return 1;
        } else if (a.time > b.time) {
            return -1;
        }

        return 0;
    });

    times.forEach(item => {
        total += item.time;
    });

    return {
        times: times,
        total: total
    };
}

console.log(`Text length: ${text.length} symbols`);

const startTime = now();
const output = tp.execute(text);
const totalTime = now() - startTime;

console.log(`Total time: ${totalTime.toFixed(2)} ms`);

const result = calcTimes();

console.log(`Total time in rules: ${result.total.toFixed(2)} ms`);
result.times.forEach((item, i) => {
    const time = Math.floor(item.time * 1000) / 1000;

    if (item.time) {
        console.log(`${i + 1}. ${item.name}: ${time.toFixed(2)} ms`);
    }
});

fs.writeFileSync('./output.html', output);
