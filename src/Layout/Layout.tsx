import React from 'react';
import Header from '../components/Header/Header';

interface ILayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => (
	<>
		<Header />
		{children}
	</>
);

export default Layout;
