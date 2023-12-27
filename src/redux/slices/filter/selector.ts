import { RootState } from '../../store'

export const selectSearchValue = (state: RootState) => state.filter.searchValue;
