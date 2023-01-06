import fs from 'fs';
import process from 'process';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const currentYear = new Date().getFullYear();

function addCopyright(file) {
    const comment = [
        '/*! ',
        [
            packageJson.name,
            `© ${currentYear} ${packageJson.author.name}`,
            `${packageJson.license}  License`,
            packageJson.author.url
        ].join(' | '),
        ' */\n'
    ].join('');

    fs.writeFileSync(file, comment + fs.readFileSync(file, 'utf-8'), 'utf-8');
}

for (let i = 2; i < process.argv.length; i++) {
    addCopyright(process.argv[i]);
}
