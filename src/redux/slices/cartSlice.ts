import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
	id: number;
	imageUrl: string;
	title: string;
	price: number;
	size: number;
	type: string;
	count: number;
};

interface ICartSliceState {
	totalPrice: number;
	items: CartItem[];
}

const initialState: ICartSliceState = {
	totalPrice: 0,
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, { payload: newItem }: PayloadAction<CartItem>) => {
			const findItem = state.items.find((item) => item.id === newItem.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items = [
					...state.items,
					{
						...newItem,
						count: 1,
					},
				];
			}

			state.totalPrice = Number(state.totalPrice + newItem.price);
		},
		removeItem: (state, { payload: itemId }: PayloadAction<number>) => {
			state.items = state.items.filter((item) => item.id !== itemId);
			state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
		},
		incrementCount: (state, { payload: itemId }: PayloadAction<number>) => {
			const findItem = state.items.find((item) => item.id === itemId);
			findItem && findItem.count++;
			state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
		},
		decrementCount: (state, { payload: itemId }: PayloadAction<number>) => {
			const findItem = state.items.find((item) => item.id === itemId);
			findItem && findItem.count--;
			state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
		},
		clearItems: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = (state: RootState) => state.cart;
export const selectCountItem = (id: number) => (state: RootState) =>
	state.cart.items.find((el) => el.id === id);

export const { addItem, removeItem, clearItems, incrementCount, decrementCount } =
	cartSlice.actions;

export default cartSlice.reducer;
