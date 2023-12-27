export type CartItem = {
	id: number;
	imageUrl: string;
	title: string;
	price: number;
	size: number;
	type: string;
	count: number;
};

export interface ICartSliceState {
	totalPrice: number;
	items: CartItem[];
}
