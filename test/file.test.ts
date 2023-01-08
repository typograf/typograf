import fs from 'fs';
import Typograf from '../src/typograf';

const mainTypograf = new Typograf({
    locale: 'ru',
    htmlEntity: {
        type: 'digit',
    }
});

describe('Test before-after files', () => {
    const dir = './test/fixtures';
    const dirBefore = `${dir}/before/`;
    const dirAfter = `${dir}/after/`;

    const files = fs.readdirSync(dirBefore);

    files.forEach(file => {
        if (file.search(/\.tmp$/) !== -1) {
            return;
        }

        const fileBefore = dirBefore + file;
        const fileAfter = dirAfter + file;

        if (fs.statSync(fileBefore).isFile()) {
            const before = fs.readFileSync(fileBefore).toString();
            const after = fs.readFileSync(fileAfter).toString();
            const result = mainTypograf.execute(before);

            fs.writeFileSync(fileBefore + '.tmp', result);

            it(fileBefore + ' == ' + fileAfter, () => {
                expect(result).toEqual(after);
            });
        }
    });
});
