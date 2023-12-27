import React from 'react';
import styles from './Search.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../redux/slices/filter/slice';
import { selectSearchValue } from '../../redux/slices/filter/selector';

const Search: React.FC = () => {
	const dispatch = useDispatch();
	const searchValue = useSelector(selectSearchValue);
	const [value, setValue] = React.useState<string>('');
	const inputRef = React.useRef<HTMLInputElement>(null);

	const clearSearchValue = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	React.useEffect(() => {
		if (searchValue) {
			setValue(searchValue);
		} else {
			setValue('');
		}
	}, []);

	const updateSearchValue = React.useCallback(
		debounce((value) => {
			dispatch(setSearchValue(value));
		}, 500),
		[searchValue],
	);

	const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};

	return (
		<div className={styles['root']}>
			<svg
				className={styles['icon']}
				xmlns='http://www.w3.org/2000/svg'
				enableBackground='new 0 0 32 32'
				id='Glyph'
				version='1.1'
				viewBox='0 0 32 32'>
				<path
					d='M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z'
					id='XMLID_223_'
				/>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				className={styles['input']}
				type='text'
				placeholder='Поиск пиццы...'
			/>
			{value && <IoMdClose onClick={clearSearchValue} className={styles['clear']} />}
		</div>
	);
};

export default Search;
