#!/usr/bin/env node

var fs = require('fs'),
    isutf8 = require('isutf8'),
    program = require('commander'),
    typograf = new (require('../dist/typograf'))();

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

function printText(text) {
    process.stdout.write(typograf
        .disable(getRules(program.disable))
        .enable(getRules(program.enable))
        .execute(text, {lang: program.lang || 'ru'}));
}

var file = program.args[0],
    buf = '',
    exitCode = 0;

if(process.stdin.isTTY) {
    file || program.help();

    if(fs.existsSync(file) && fs.statSync(file).isFile()) {
        buf = fs.readFileSync(file);
        if(isutf8(buf)) {
            printText(buf);
        } else {
            console.error(file + ': is not utf-8');
            exitCode = 1;
        }
    } else {
        console.error(file + ': no such file');
        exitCode = 1;
    }

    process.exit(exitCode);
} else {
    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', function() {
        var chunk = process.stdin.read();
        if(chunk !== null) {
            buf += chunk;
        }
    });

    process.stdin.on('end', function() {
        printText(buf);
        process.exit(exitCode);
    });
}
