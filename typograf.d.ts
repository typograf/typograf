declare namespace typograf {
	type LineEnding = 'LF' | 'CRLF' | 'CR';
	type Mode = 'default' | 'digit' | 'name';

	interface HtmlEntity {
		type: Mode;
		onlyInvisible?: string;
		list?: string[];
	}

	interface Typograf {
		execute(text: string, prefs?: {htmlEntity?: HtmlEntity, lang?: string, lineEnding: LineEnding, mode?: Mode}): string;
		enable(rule: string | string[]): Typograf;
		disable(rule: string | string[]): Typograf;
		enabled(rule: string): boolean;
		disabled(rule: string): boolean;
		setting(rule: string, setting: string, value: any);
		addSafeTag(startTag: string | RegExp, endTag?: string, middle?: string): Typograf;
	}

	interface Options {
		lang: string;
		htmlEntity?: HtmlEntity;
		lineEnding?: LineEnding;
		mode?: Mode;
		live?: boolean;
		enable?: string | string[];
		disable?: string | string[];
	}

	interface AddRuleOptions {
		name: string;
		handler: (text: string) => string;
		index?: number;
		disabled?: boolean;
		live?: boolean;
		settings?: any;
	}

	interface TypografStatic {
		new (options: Options): Typograf;
		rule: (options: AddRuleOptions) => TypografStatic;
	}
}

declare module 'typograf' {
	const Typograf: typograf.TypografStatic;

	export = Typograf;
}
