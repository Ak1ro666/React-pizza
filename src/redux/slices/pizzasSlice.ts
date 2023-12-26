import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

type PizzaItem = {
	id: number;
	title: string;
	price: number;
	rating: number;
	sizes: number[];
	types: number[];
	category: number;
	imageUrl: string;
};

interface IPizzaSliceState {
	items: PizzaItem[];
	status: Status;
}

const initialState: IPizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

type FetchPizzasArgs = Record<string, string>;
export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
	'pizza/fetchPizzasStatus',
	async (params, thunkAPI) => {
		const { sortProperty, category, currentPage, search } = params;

		const {
			data: { items },
		} = await axios.get(
			`https://5e71a149654d03c9.mokky.dev/pizzas?page=${currentPage}&limit=4&sortBy=${sortProperty}${category}${search}`,
		);

		if (items.length === 0) {
			thunkAPI.rejectWithValue('Пиццы пустые');
		}

		return items;
	},
);

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
