import React from 'react';

import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, selectCountItem } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export interface IPizzaBlock {
	id: number;
	imageUrl: string;
	title: string;
	price: number;
	sizes: number[];
	types: number[];
}

const PizzaBlock: React.FC<IPizzaBlock> = ({ id, imageUrl, title, price, sizes, types }) => {
	const [sizeActive, setSizeActive] = React.useState<number>(0);
	const [typeActive, setTypeActive] = React.useState<number>(0);
	const dispatch = useDispatch();
	const countItem = useSelector(selectCountItem(id));
	const typeNames: string[] = ['тонкое', 'традиционное'];

	const count = countItem?.count || 0;

	const onAddToCart = () => {
		const item = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[typeActive],
			size: sizes[sizeActive],
		};

		dispatch(addItem(item));
	};

	return (
		<div className='pizza-block__wrapper'>
			<div className='pizza-block'>
				<Link to={`/pizzas/${id}`}>
					<img className='pizza-block__image' src={imageUrl} alt='Pizza' />
				</Link>
				<h4 className='pizza-block__title'>{title}</h4>
				<div className='pizza-block__selector'>
					<ul>
						{types.map((el, i) => (
							<li
								key={el}
								onClick={() => setTypeActive(i)}
								className={cn({
									active: typeActive === i,
								})}>
								{typeNames[el]}
							</li>
						))}
					</ul>
					<ul>
						{sizes.map((size, i) => (
							<li
								onClick={() => setSizeActive(i)}
								key={i}
								className={cn({
									active: sizeActive === i,
								})}>
								{size}
							</li>
						))}
					</ul>
				</div>
				<div className='pizza-block__bottom'>
					<div className='pizza-block__price'>от {price} ₽</div>
					<span className='button button--outline button--add' onClick={onAddToCart}>
						<svg
							width='12'
							height='12'
							viewBox='0 0 12 12'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
								fill='white'
							/>
						</svg>
						<span
							style={{
								pointerEvents: 'none',
								zIndex: '999',
							}}>
							Добавить
						</span>
						{count > 0 ? <i>{count}</i> : ''}
					</span>
				</div>
			</div>
		</div>
	);
};

export default PizzaBlock;