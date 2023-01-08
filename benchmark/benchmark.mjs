import fs from 'fs';
import Typograf from '../build/typograf.es';

const tp = new Typograf({ locale: 'ru' });
const beforeTimes = {};
const afterTimes = {};
const text = fs.readFileSync('./benchmark/war_and_peace.html').toString();

tp.onBeforeRule = function(name) { beforeTimes[name] = now(); };
tp.onAfterRule = function(name) { afterTimes[name] = now(); };

function now() {
    const hrtime = process.hrtime();
    return ( hrtime[0] * 1000000 + hrtime[1] / 1000 ) / 1000;
}

function calcTimes() {
    const times = [];
    let total = 0;

    Object.keys(afterTimes).forEach(function(name) {
        times.push({
            name: name,
            time: afterTimes[name] - beforeTimes[name]
        });
    });

    times.sort(function(a, b) {
        if (a.time < b.time) {
            return 1;
        } else if (a.time > b.time) {
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

const startTime = now();
const output = tp.execute(text);
const totalTime = now() - startTime;
console.log(`Total time: ${totalTime} ms`);

const result = calcTimes();
console.log(`Total time in rules: ${result.total} ms`);
result.times.forEach(function(item, i) {
    const time = Math.floor(item.time * 1000) / 1000;
    if (item.time) {
        console.log(`${i + 1}. ${item.name}: ${time} ms`);
    }
});

fs.writeFileSync('./benchmark/output.html', output);
