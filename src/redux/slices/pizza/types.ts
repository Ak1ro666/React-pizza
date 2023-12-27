export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type PizzaItem = {
	id: number;
	title: string;
	price: number;
	rating: number;
	sizes: number[];
	types: number[];
	category: number;
	imageUrl: string;
};

export interface IPizzaSliceState {
	items: PizzaItem[];
	status: Status;
}

export type FetchPizzasArgs = Record<string, string>;
