declare namespace typograf {
	type LineEnding = 'LF' | 'CRLF' | 'CR';
	type Mode = 'default' | 'digit' | 'name';

	interface HtmlEntity {
		type: Mode;
		onlyInvisible?: boolean;
		list?: string[];
	}

	interface Typograf {
		execute(text: string, prefs?: {htmlEntity?: HtmlEntity, locale?: string | string[], lineEnding: LineEnding}): string;
		enableRule(rule: string | string[]): Typograf;
		disableRule(rule: string | string[]): Typograf;
		isEnabledRule(rule: string): boolean;
		isDisabledRule(rule: string): boolean;
		getSetting(rule: string, setting: string) : any;
		setSetting(rule: string, setting: string, value: any) : Typograf;
		addSafeTag(startTag: string | RegExp, endTag?: string, middle?: string): Typograf;
	}

	interface Options {
		locale: string | string[];
		htmlEntity?: HtmlEntity;
		lineEnding?: LineEnding;
		live?: boolean;
		enableRule?: string | string[];
		disableRule?: string | string[];
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
		addRule: (options: AddRuleOptions) => TypografStatic;
		addInnerRule: (options: AddRuleOptions) => TypografStatic;
	}
}

declare module 'typograf' {
	const Typograf: typograf.TypografStatic;

	export = Typograf;
}
