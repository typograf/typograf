import type { TypografRule } from '../../../main';
export const oooRule: TypografRule = {
    name: 'ru/nbsp/ooo',
    handler(text) {
        return text.replace(/(^|[^a-яёA-ЯЁ])(ООО|ОАО|ЗАО|НИИ|ПБОЮЛ) /g, '$1$2\u00A0');
    },
};
