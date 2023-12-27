import React from 'react';
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import PizzaBlock, { IPizzaBlock } from '../PizzaBlock/PizzaBlock';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import SkeletonPizzas from '../SkeletonPizzas/SkeletonPizzas';
import Pagination from '../Pagination/Pagination';

import { useSelector } from 'react-redux';
import { setPageCount, setFilters } from '../../redux/slices/filter/slice';
import { useAppDispatch } from '../../redux/store';
import { selectSearchValue } from '../../redux/slices/filter/selector';
import { SortProperty } from '../../redux/slices/filter/types';
import { fetchPizzas } from '../../redux/slices/pizza/asyncThunk';

const Content: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isMounted = React.useRef(false);
	const searchValue = useSelector(selectSearchValue);
	const {
		activeCategory,
		sort: sortType,
		pageCount: currentPage,
	} = useSelector((state: any) => state.filter);
	const { items: pizzas, status } = useSelector((state: any) => state.pizza);

	const sortProperty = sortType.sortProperty;

	const onChangePage = (newPage: number) => {
		dispatch(setPageCount(newPage));
	};

	type ParamsType = {
		activeCategory: number;
		currentPage: number;
		sortProperty: string;
	};

	const getPizzas = async () => {
		const sortProperty = sortType.sortProperty;
		const category = activeCategory === 0 ? '' : `&category=${activeCategory}`;
		const search = searchValue ? `&title=*${searchValue.trim()}` : '';

		dispatch(
			fetchPizzas({
				sortProperty,
				category,
				search,
				currentPage,
			}),
		);
		window.scrollTo(0, 0);
	};

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify(
				{
					sortProperty: sortType.sortProperty,
					currentPage,
					activeCategory,
				},
				{ skipNulls: true },
			);
			navigate(`?${queryString}`);
		}

		getPizzas();
		isMounted.current = true;
	}, [activeCategory, sortProperty, searchValue, currentPage]);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as ParamsType;

			dispatch(
				setFilters({
					activeCategory: Number(params.activeCategory),
					currentPage: Number(params.currentPage),
					sortProperty: params.sortProperty as SortProperty,
				}),
			);
		}
	}, [activeCategory, sortProperty, searchValue, currentPage]);

	const skeletons = [...new Array(6)].map((_, i) => <SkeletonPizzas key={i} />);
	const pizzasRender = pizzas.map((el: IPizzaBlock) => <PizzaBlock key={el.id} {...el} />);

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories />
					<Sort />
				</div>
				<h2 className='content__title'>
					{status === 'loading'
						? 'Поиск пицц...'
						: status === 'success' && searchValue && pizzas.length > 0
						? 'Найденные пиццы'
						: pizzas.length === 0
						? 'Таких пицц нет'
						: 'Все пиццы'}
				</h2>
				{status === 'error' && (
					<div className='cart cart--empty cart--error'>
						<h2>
							Ошибка! <span>😕</span>
						</h2>
						<p>
							Вероятней всего, произошла ошибка при получении пицц с сервера.
							<br />
							<br />
							Для того, исправить попробуйте перезайти на страницу.
						</p>
					</div>
				)}
				<div className='content__items'>
					{status === 'loading' ? skeletons : status === 'success' ? pizzasRender : ''}
				</div>
			</div>
			<Pagination currentPage={currentPage} onChange={(newPage: number) => onChangePage(newPage)} />
		</div>
	);
};

export default Content;
