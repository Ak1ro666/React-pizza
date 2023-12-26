import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	items: [],
	status: 'loading',
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkAPI) => {
	const { sortProperty, category, currentPage, search } = params;

	const { data } = await axios.get(
		`https://5e71a149654d03c9.mokky.dev/pizzas?page=${currentPage}&limit=4&sortBy=${sortProperty}${category}${search}`,
	);

	if (data.items.length === 0) {
		thunkAPI.rejectWithValue('Пиццы пустые');
	}

	return data.items;
});

const pizzasSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems: (state, { payload: newItems }) => {
			state.items = newItems;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.items = [];
			state.status = 'loading';
		}),
			builder.addCase(fetchPizzas.fulfilled, (state, { payload: newItems }) => {
				state.items = newItems;
				state.status = 'success';
			}),
			builder.addCase(fetchPizzas.rejected, (state) => {
				state.items = [];
				state.status = 'error';
			});
	},
});

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
