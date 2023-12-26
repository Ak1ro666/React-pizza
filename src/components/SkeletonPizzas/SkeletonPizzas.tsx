import React from 'react';
import ContentLoader from 'react-content-loader';

interface ISkeletonPizzasProps {
	[key: string]: any;
}

const SkeletonPizzas: React.FC<ISkeletonPizzasProps> = (props) => (
	<ContentLoader
		className='pizza-block skeleton'
		speed={2}
		width={280}
		height={446}
		viewBox='0 0 280 446'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}>
		<rect x='119' y='390' rx='25' ry='25' width='152' height='45' />
		<rect x='9' y='398' rx='10' ry='10' width='75' height='34' />
		<circle cx='309' rx='10' ry='10' cy='235' r='20' />
		<circle cx='135' rx='10' ry='10' cy='120' r='114' />
		<rect x='9' y='257' rx='10' ry='10' width='260' height='28' />
		<rect x='9' y='307' rx='10' ry='10' width='260' height='68' />
	</ContentLoader>
);

export default SkeletonPizzas;
