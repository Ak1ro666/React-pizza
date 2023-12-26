import React from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../redux/slices/filterSlice';

const Categories = () => {
	const dispatch = useDispatch();
	const activeCategory = useSelector((state: any) => state.filter.activeCategory);

	const onChangeCategory = (i: number) => {
		dispatch(setActiveCategory(i));
	};

	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	return (
		<div className='categories'>
			<ul>
				{categories.map((el, i) => (
					<li
						onClick={() => onChangeCategory(i)}
						key={i}
						className={cn({
							active: i === activeCategory,
						})}>
						{el}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
