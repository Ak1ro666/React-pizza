import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Sort = {
	name: string;
	sortProperty: 'price' | '-price' | 'rating' | '-rating' | 'categories' | '-categories';
};

type NewParamsObjType = {
	activeCategory: number;
	currentPage: number;
	sort: Sort;
};

interface IFilterSliceState {
	searchValue: string;
	activeCategory: number;
	pageCount: number;
	sort: Sort;
}

const initialState: IFilterSliceState = {
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
		setActiveCategory: (state, { payload: newActiveCategory }: PayloadAction<number>) => {
			state.activeCategory = newActiveCategory;
		},
		setSort: (state, { payload: newSortElement }: PayloadAction<Sort>) => {
			state.sort = newSortElement;
		},
		setPageCount: (state, { payload: newPageCount }: PayloadAction<number>) => {
			state.pageCount = newPageCount;
		},
		setFilters: (state, { payload: newParamsObj }: PayloadAction<NewParamsObjType>) => {
			if (Object.keys(newParamsObj)) {
				state.activeCategory = Number(newParamsObj.activeCategory);
				state.pageCount = Number(newParamsObj.currentPage);
				state.sort.sortProperty = newParamsObj.sort.sortProperty;
			} else {
				state.activeCategory = 0;
				state.pageCount = 1;
				state.sort = {
					name: 'Сначало недорогие',
					sortProperty: 'price',
				};
			}
		},
		setSearchValue: (state, { payload: newSearchValue }: PayloadAction<string>) => {
			state.searchValue = newSearchValue;
		},
	},
});

export const selectSearchValue = (state: RootState) => state.filter.searchValue;

export const { setActiveCategory, setSort, setPageCount, setFilters, setSearchValue } =
	filterSlice.actions;

export default filterSlice.reducer;
