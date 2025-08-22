import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="font-body flex justify-center items-center my-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-2 px-4 py-2 border rounded-md text-gray-700 bg-gray-200 disabled:opacity-50"
            >
                &larr; Previous
            </button>
            <span className="mx-4 text-gray-700">
                Page {currentPage} out of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-2 px-4 py-2 border rounded-md text-gray-700 bg-gray-200 disabled:opacity-50"
            >
                Next &rarr;
            </button>
        </div>
    );
};

export default Pagination;