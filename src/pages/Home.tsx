import React from 'react';
import Layout from '../Layout/Layout';
import Content from '../components/Content/Content';

const Home: React.FC = () => (
	<div className='wrapper'>
		<Layout>
			<Content />
		</Layout>
	</div>
);

export default Home;
