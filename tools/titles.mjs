import fs from 'fs';
import sortKeys from 'sort-keys';
import glob from 'glob';

const buffer = {};

const files = glob.sync('./src/rules/**/*.json');

function getRulePath(file) {
    const str = file.replace(/\.json$/, '').split(/\/|\\/);
    return [str[str.length - 3], str[str.length - 2], str[str.length - 1]].join('/');
}

files.forEach(file => {
    let content = '';

    const txt = fs.readFileSync(file, 'utf-8');

    try {
        content = JSON.parse(txt.trim());
    } catch (e) {
        console.error(`JSON parsing error, file: ${file}`, e, txt);
    }

    const key = getRulePath(file);
    buffer[key] = content;
});

const json = sortKeys(buffer, { deep: true });

const result = JSON.stringify(json);

fs.writeFileSync('./build/typograf.titles.json', result);
fs.writeFileSync('./build/typograf.titles.js', `export default ${result};
`);
