import fs from 'fs';
import Typograf from '../build/typograf';

const t = new Typograf({locale: 'ru', htmlEntity: {type: 'digit'}});

describe('Test before-after files', () => {
    const dir = './test/fixtures';
    const dirBefore = `${dir}/before/`;
    const dirAfter = `${dir}/after/`;

    const files = fs.readdirSync(dirBefore);

    files.forEach(el => {
        if (el.search(/\.tmp$/) !== -1) {
            return;
        }
        const fileBefore = dirBefore + el;
        const fileAfter = dirAfter + el;

        if (fs.statSync(fileBefore).isFile()) {
            const before = fs.readFileSync(fileBefore).toString();
            const after = fs.readFileSync(fileAfter).toString();
            const res = t.execute(before);

            fs.writeFileSync(fileBefore + '.tmp', res);

            it(fileBefore + ' == ' + fileAfter, () => {
                expect(res).toEqual(after);
            });
        }
    });
});
