import fs from 'fs';
import Typograf from '../build/typograf.es.mjs';

const typograf = new Typograf({ locale: 'ru' });
const beforeTimes = {};
const resultTimes = {};
const text = fs.readFileSync('./benchmark/books/war_and_peace.html').toString();

typograf.onBeforeRule = function(name) {
    beforeTimes[name] = now();
};
typograf.onAfterRule = function(name) {
    resultTimes[name] = (resultTimes[name] || 0) + now() - beforeTimes[name];
};

function now() {
    const hrtime = process.hrtime();
    return (hrtime[0] * 1000000 + hrtime[1] / 1000) / 1000;
}

function formatNumber(num) {
    return num.toFixed(3);
}

function calcTimes() {
    const times = [];
    let total = 0;

    Object.keys(resultTimes).forEach(name => {
        times.push({
            name,
            time: resultTimes[name],
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

    times.forEach(function(item) {
        total += item.time;
    });

    return {
        times,
        total,
    };
}

console.log(`Text length: ${text.length} symbols`);

const startTime = now();

const output = typograf.execute(text);

const totalTime = now() - startTime;
console.log(`Total time: ${formatNumber(totalTime)} ms`);

const result = calcTimes();
console.log(`\nTime in rules: ${formatNumber(result.total)} ms`);
result.times.forEach((item, i) => {
    console.log(`${i + 1}. ${item.name}: ${formatNumber(item.time)} ms`);
});

fs.writeFileSync('./benchmark/output.html', output);
