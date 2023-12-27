import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/app.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './pages/Home';

export type SortItem = {
	name: string;
	sortProperty: 'price' | '-price' | 'rating' | '-rating' | 'categories' | '-categories';
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

const Cart = React.lazy(() => import('./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/card',
		element: (
			<React.Suspense fallback={<div>Идёи загрузка корзины...</div>}>
				<Cart />
			</React.Suspense>
		),
	},
	{
		path: '*',
		element: <NotFound />,
	},
	{
		path: '/pizzas/:id',
		element: (
			<React.Suspense fallback={<div>Идёт загрузка страницы...</div>}>
				<FullPizza />
			</React.Suspense>
		),
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
