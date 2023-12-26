import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface IPaginationProps {
	currentPage: number;
	onChange: (newPage: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ currentPage, onChange }) => (
	<ReactPaginate
		className={styles['root']}
		breakLabel='...'
		nextLabel='>'
		onPageChange={(event) => onChange(event.selected + 1)}
		pageRangeDisplayed={4}
		pageCount={3}
		forcePage={currentPage - 1}
		previousLabel='<'
	/>
);

export default Pagination;
