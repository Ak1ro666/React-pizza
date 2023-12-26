import React from 'react';
import axios from 'axios';

import { Link, useParams, useNavigate } from 'react-router-dom';

interface IPizzaState {
	imageUrl?: string;
	title?: string;
	price?: number;
}

const FullPizza: React.FC = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = React.useState(true);
	const [pizza, setPizza] = React.useState<IPizzaState>({});
	const { id } = useParams();

	React.useEffect(() => {
		const fetchPizza = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get<IPizzaState>(
					`https://5e71a149654d03c9.mokky.dev/pizzas/${id}`,
				);
				setPizza(data);
				setIsLoading(false);
			} catch (error) {
				alert(`Error >>> ${error}`);
				console.log(`Error >>> ${error}`);
				navigate('/');
			}
		};

		fetchPizza();
	}, []);

	if (!pizza) {
		return <>Загрузка...</>;
	}

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}>
			{isLoading ? (
				<h1
					style={{
						fontSize: '100px',
						color: '#000',
						marginTop: '100px',
						marginBottom: '100px',
						padding: '50px',
						backgroundColor: 'white',
						borderRadius: '20px',
					}}>
					Идёи загрузка данных
				</h1>
			) : (
				<div
					style={{
						padding: '50px',
						backgroundColor: 'white',
						borderRadius: '20px',
					}}>
					<h1
						style={{
							marginBottom: '45px',
							textAlign: 'center',
						}}>
						{pizza.title}
					</h1>
					<img src={pizza.imageUrl} alt='pizza' />
					<div
						style={{
							textAlign: 'center',
							fontSize: '24px',
							fontWeight: 'bold',
						}}>
						Цена <span>${pizza.price}</span>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<Link to={'/'} className='button button--outline button--add go-back-btn button-hover'>
							Вернуться назад
						</Link>
						<Link to={'/'} className='button pay-btn'>
							Купить данный товар
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default FullPizza;
