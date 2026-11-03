import type {Base} from '../kit/actions';

/* Герой — жёлтый: цвет запоминается в первые секунды и помогает найти его в толпе. */
export type CastMember = Base & {sp?: string};

export const CAST: Record<string, CastMember> = {
	hero: {color: '#f2b21c', hair: 'short', rim: '#fff0cc', rimW: 2.4},
	maya: {color: '#8b5cf6', hair: 'ponytail', hairColor: '#ffd34a', rim: '#efe2ff', rimW: 2.4, shoe: '#efe2ff'},
	mom: {color: '#7a5cc4', hair: 'bob', rim: '#ffe6c8', rimW: 2.4, shoe: '#2c2540'},
	friend: {color: '#d94a3a', hair: 'cap', hairColor: '#2f6fd8', rim: '#ffe0c8', rimW: 2.4, shoe: '#f2f2f2'},
	teacher: {color: '#8e3a4f', outfit: 'suit', hair: 'bun', acc: ['glasses'], rim: '#ffe6d6', rimW: 2.4, shoe: '#2b1d24'},
	guard: {color: '#3a4256', outfit: 'suit', hair: 'cap', hairColor: '#28304a', acc: ['mustache'], rim: '#e6ecff', rimW: 2.4, shoe: '#111'},
	neighbor: {color: '#3aa37a', outfit: 'coat', hair: 'bun', hairColor: '#6b5340', rim: '#e8fff2', rimW: 2.4, shoe: '#1d2b24'},
	host: {color: '#2f6fd8', outfit: 'suit', hair: 'short', hairColor: '#241a14', rim: '#dfe8ff', rimW: 2.4, shoe: '#141820'},
};
