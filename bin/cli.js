#!/usr/bin/env node

var fs = require('fs'),
    isutf8 = require('isutf8'),
    program = require('commander'),
    T = require('../dist/typograf'),
    typograf = new T();

program
    .version(require('../package.json').version)
    .usage('[options] <file>')
    .option('-d, --disable <rules>', 'disable rules (separated by commas)')
    .option('-e, --enable <rules>', 'enable rules (separated by commas)')
    .option('-l, --lang <lang>', 'set lang: "ru", "en" or "common"')
    .parse(process.argv);

function getRules(str) {
    return (str || '').split(/,|;/);
}

var file = program.args[0],
    buf,
    exitCode = 0;

if(!file) {
    program.help();
}

if(fs.existsSync(file) && fs.statSync(file).isFile()) {
    buf = fs.readFileSync(file);
    if(isutf8(buf)) {
        process.stdout.write(typograf
            .disable(getRules(program.disable))
            .enable(getRules(program.enable))
            .execute(buf, {lang: program.lang || 'ru'}));
    } else {
        console.error(file + ': is NOT UTF-8');
        exitCode = 1;
    }
} else {
    console.error(file + ': No such file');
    exitCode = 1;
}

process.exit(exitCode);
