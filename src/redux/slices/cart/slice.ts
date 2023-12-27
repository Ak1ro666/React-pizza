import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartItem, ICartSliceState } from './types';
import { getCartFromLS } from '../../../utils/getCartFromLS';

const initialState: ICartSliceState = {
	totalPrice: getCartFromLS().totalPrice,
	items: getCartFromLS().items,
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

export const { addItem, removeItem, clearItems, incrementCount, decrementCount } =
	cartSlice.actions;

export default cartSlice.reducer;
