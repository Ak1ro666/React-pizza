import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/app.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';

export type SortItem = {
	name: string;
	sortProperty: string;
};

export const list: SortItem[] = [
	{
		name: 'Сначало недорогие',
		sortProperty: 'price',
	},
	{
		name: 'Сначало дорогие',
		sortProperty: '-price',
	},
	{
		name: 'Сначало популярные',
		sortProperty: '-rating',
	},
	{
		name: 'Сначало непопулярные',
		sortProperty: 'rating',
	},
	{
		name: 'Сначала алфавита',
		sortProperty: 'categories',
	},
	{
		name: 'Сконца алфавита',
		sortProperty: '-categories',
	},
];

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/card',
		element: <Cart />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
	{
		path: '/pizzas/:id',
		element: <FullPizza />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
