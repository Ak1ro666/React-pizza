import axios from 'axios';
import { FetchPizzasArgs, PizzaItem } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';

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
