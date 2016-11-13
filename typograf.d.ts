declare namespace typograf {
	type Mode = 'default' | 'digit' | 'name';
	type LineEnding = 'LF' | 'CRLF' | 'CR';

	interface Typograf {
		execute(text: string, prefs?: {mode?: Mode, lang?: string}): string;
		enable(rule: string | string[]): Typograf;
		disable(rule: string | string[]): Typograf;
		enabled(rule: string): boolean;
		disabled(rule: string): boolean;
		setting(rule: string, setting: string, value: any);
		addSafeTag(startTag: string | RegExp, endTag?: string, middle?: string): Typograf;
	}

	interface Options {
		lang: string;
		mode?: Mode;
		lineEnding?: LineEnding;
		live?: boolean;
		enable?: string | string[];
		disable?: string | string[];
	}

	interface AddRuleOptions {
		name: string;
		handler: (text: string) => string;
		index?: number;
		disabled?: boolean;
		lineEnding?: LineEnding;
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
