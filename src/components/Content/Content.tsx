import React from 'react';
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import PizzaBlock, { IPizzaBlock } from '../PizzaBlock/PizzaBlock';
import qs from 'qs';
import { list } from '../../main';

import { useNavigate } from 'react-router-dom';
import SkeletonPizzas from '../SkeletonPizzas/SkeletonPizzas';
import Pagination from '../Pagination/Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { setPageCount, setFilters, selectSearchValue } from '../../redux/slices/filterSlice';
import { fetchPizzas } from '../../redux/slices/pizzasSlice';

const Content: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	const searchValue = useSelector(selectSearchValue);
	const {
		activeCategory,
		sort: sortType,
		pageCount: currentPage,
	} = useSelector((state: any) => state.filter);
	const { items: pizzas, status } = useSelector((state: any) => state.pizza);

	const sortProperty = sortType.sortProperty;
	const category = activeCategory === 0 ? '' : `&category=${activeCategory}`;
	const search = searchValue ? `&title=*${searchValue.trim()}` : '';
	const onChangePage = (newPage: number) => {
		dispatch(setPageCount(newPage));
	};

	const getPizzas = () => {
		const fetchData = async () => {
			dispatch(
				// @ts-ignore
				fetchPizzas({
					sortProperty,
					category,
					search,
					currentPage,
				}),
			);
		};
		fetchData();
	};

	// Если изменены параметры и был первый рендер, то сохранить данные и отправить их в redux

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sortObj = list.find((el) => el.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort: sortObj,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	// Если не были изменены параметры и это первый рендер, то запрашиваем данные с сервера

	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [activeCategory, sortProperty, searchValue, currentPage]);

	// Если параметры были изменены и это не первый рендер, то вшиваем  url параметры в строку поиска

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType.sortProperty,
				currentPage,
				activeCategory,
			});

			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [activeCategory, sortProperty, searchValue, currentPage]);

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
					{status === 'loading'
						? [...new Array(6)].map((_, i) => <SkeletonPizzas key={i} />)
						: status === 'success'
						? pizzas.map((el: IPizzaBlock) => <PizzaBlock key={el.id} {...el} />)
						: ''}
				</div>
			</div>
			<Pagination currentPage={currentPage} onChange={(newPage: number) => onChangePage(newPage)} />
		</div>
	);
};

export default Content;
