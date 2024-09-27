import fs from 'fs';

const input = 'build/typograf.groups.json';
const output = 'build/typograf.groups.js';
const json = fs.readFileSync(input);

try {
    JSON.parse(json);
} catch {
    console.error(`Error at ${input}`);
    process.exit(1);
}

fs.writeFileSync(output, `export default ${json};
`);
