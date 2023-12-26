import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchValue: '',
	activeCategory: 0,
	pageCount: 1,
	sort: {
		name: 'Сначало недорогие',
		sortProperty: 'price',
	},
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setActiveCategory: (state, { payload: newActiveCategory }) => {
			state.activeCategory = newActiveCategory;
		},
		setSort: (state, { payload: newSortElement }) => {
			state.sort = newSortElement;
		},
		setPageCount: (state, { payload: newPageCount }) => {
			state.pageCount = newPageCount;
		},
		setFilters: (state, { payload: newParamsObj }) => {
			state.activeCategory = Number(newParamsObj.activeCategory);
			state.pageCount = Number(newParamsObj.currentPage);
			state.sort = newParamsObj.sort;
		},
		setSearchValue: (state, { payload: newSearchValue }) => {
			state.searchValue = newSearchValue;
		},
	},
});

export const selectSearchValue = (state) => state.filter.searchValue;

export const { setActiveCategory, setSort, setPageCount, setFilters, setSearchValue } =
	filterSlice.actions;
export default filterSlice.reducer;
