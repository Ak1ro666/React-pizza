import React from 'react';

import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { list, SortItem } from '../../main';
import { setSort } from '../../redux/slices/filter/slice'

const Sort: React.FC = () => {
	const sortType = useSelector((state: any) => state.filter.sort);
	const dispatch = useDispatch();
	const sortRef = React.useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = React.useState(false);

	const handleClickActive = (obj: SortItem) => {
		dispatch(setSort(obj));
		setIsOpen(false);
	};

	const handleDocumentClick = ({ target }: MouseEvent) => {
		if (sortRef.current && !sortRef.current.contains(target as Node)) setIsOpen(false);
	};

	React.useEffect(() => {
		document.body.addEventListener('click', handleDocumentClick);

		() => document.body.removeEventListener('click', handleDocumentClick);
	}, []);

	return (
		<div ref={sortRef} className='sort'>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setIsOpen(!isOpen)}>{sortType.name}</span>
			</div>
			{isOpen && (
				<div className='sort__popup'>
					<ul>
						{list.map((el, i) => (
							<li
								key={i}
								className={cn({
									active: el.sortProperty === sortType.sortProperty,
								})}
								onClick={() => handleClickActive(el)}>
								{el.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Sort;
