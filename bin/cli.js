#!/usr/bin/env node

var fs = require('fs'),
    isutf8 = require('isutf8'),
    program = require('commander'),
    Typograf = require('../dist/typograf'),
    typograf = new Typograf(),
    langs = Typograf._langs,
    modes = ['digit', 'name', 'default'];

program
    .version(require('../package.json').version)
    .usage('[options] <file>')
    .option('-d, --disable <rules>', 'disable rules (separated by commas)')
    .option('-e, --enable <rules>', 'enable rules (separated by commas)')
    .option('-l, --lang <lang>', 'set language rules: ' + '"' + langs.join('", "') + '"')
    .option('--mode <mode>', 'HTML entities as: "digit" - &#160;, "name" - &nbsp, "default" - UTF-8 symbols')
    .parse(process.argv);

function getRules(str) {
    return (str || '').split(/,|;/);
}

function printText(text) {
    process.stdout.write(typograf
        .disable(getRules(program.disable))
        .enable(getRules(program.enable))
        .execute(text, {lang: program.lang, mode: program.mode}));
}

if(process.stdin.isTTY && !program.args.length) {
    program.help();
}

if(!program.lang) {
    console.error('Error: required parameter lang.');
    process.exit(1);
}

if(langs.indexOf(program.lang) === -1) {
    console.error('Error: language "' + program.lang + '" is not supported.');
    process.exit(1);
}

if(modes.indexOf(program.mode || 'default') === -1) {
    console.error('Error: mode "' + program.mode + '" is not supported.');
    process.exit(1);
}

var file = program.args[0],
    buf = '';

if(process.stdin.isTTY) {
    if(fs.existsSync(file) && fs.statSync(file).isFile()) {
        buf = fs.readFileSync(file);
        if(isutf8(buf)) {
            printText(buf);
        } else {
            console.error(file + ': is not utf-8');
            process.exit(1);
        }
    } else {
        console.error(file + ': no such file');
        process.exit(1);
    }

    process.exit(0);
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
        process.exit(0);
    });
}
