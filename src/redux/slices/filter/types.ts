export type SortProperty = 'price' | '-price' | 'rating' | '-rating' | 'categories' | '-categories';

export type Sort = {
	name: string;
	sortProperty: SortProperty;
};

export type NewParamsObjType = {
	activeCategory: number;
	currentPage: number;
	sortProperty: SortProperty;
};

export interface IFilterSliceState {
	searchValue: string;
	activeCategory: number;
	pageCount: number;
	sort: Sort;
}