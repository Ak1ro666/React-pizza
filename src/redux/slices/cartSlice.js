import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, { payload: newItem }) => {
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
		removeItem: (state, { payload: itemId }) => {
			state.items = state.items.filter((item) => item.id !== itemId);
			state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
		},
		incrementCount: (state, { payload: itemId }) => {
			const findItem = state.items.find((item) => item.id === itemId);
			findItem.count++;
			state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
		},
		decrementCount: (state, { payload: itemId }) => {
			const findItem = state.items.find((item) => item.id === itemId);
			findItem.count--;
			state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
		},
		clearItems: (state) => {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectCart = (state) => state.cart;
export const selectCountItem = (id) => (state) => state.cart.items.find((el) => el.id === id);

export const { addItem, removeItem, clearItems, incrementCount, decrementCount } =
	cartSlice.actions;

export default cartSlice.reducer;
