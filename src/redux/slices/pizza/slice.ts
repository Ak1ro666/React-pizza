import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPizzaSliceState, PizzaItem, Status } from './types';
import { fetchPizzas } from './asyncThunk'

const initialState: IPizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems: (state, { payload: newItems }: PayloadAction<PizzaItem[]>) => {
			state.items = newItems;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.items = [];
			state.status = Status.LOADING;
		}),
			builder.addCase(
				fetchPizzas.fulfilled,
				(state, { payload: newItems }: PayloadAction<PizzaItem[]>) => {
					state.items = newItems;
					state.status = Status.SUCCESS;
				},
			),
			builder.addCase(fetchPizzas.rejected, (state) => {
				state.items = [];
				state.status = Status.ERROR;
			});
	},
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
