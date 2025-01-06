import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)}>&laquo; Previous</button>
            )}
            <span>Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)}>Next &raquo;</button>
            )}
        </div>
    );
};

export default Pagination;
