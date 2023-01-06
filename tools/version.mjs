import fs from 'fs';
import process from 'process';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

function fixVersion(file) {
    const content = fs.readFileSync(file, 'utf-8').replace(/\{\{version\}\}/, packageJson.version);

    fs.writeFileSync(file, content, 'utf-8');
}

for (let i = 2; i < process.argv.length; i++) {
    fixVersion(process.argv[i]);
}
