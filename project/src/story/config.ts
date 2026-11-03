export type CounterKeyDef = {line: string; off?: number; v: number; roll?: number};

export const STORY: {
	title: string;
	hero: string;
	counter?: {label: string; color?: string; keys: CounterKeyDef[]};
	heroAge?: (counter: number) => number;
	heroGrow?: number;
	bed: string;
	musicVolume?: number;
	endCaption?: string[];
} = {
	title: 'Ты самый популярный человек на земле',
	hero: 'hero',
	counter: {
		label: 'подписчики, млн',
		keys: [
			{line: '001', v: 4.8},
			{line: '024', v: 84, roll: 46},
			{line: '074', v: 79, roll: 40},
			{line: '076', v: 12, roll: 34},
		],
	},
	bed: 'sfx/bed.wav',
	endCaption: ['СКОЛЬКО ЧЕЛОВЕК ДОЛЖНЫ ЗНАТЬ ТВОЁ ИМЯ,', 'ЧТОБЫ ТЫ ПОЧУВСТВОВАЛ СЕБЯ НУЖНЫМ?'],
};
