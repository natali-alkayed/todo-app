import React from 'react';
import { Pagination } from '@mantine/core';

const PaginationComponent = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  return (
    <Pagination
      itemsPerPage={itemsPerPage}
      total={totalItems}
      page={currentPage}
      onChange={onPageChange}
      withPagesCount
    />
  );
};

export default PaginationComponent;
