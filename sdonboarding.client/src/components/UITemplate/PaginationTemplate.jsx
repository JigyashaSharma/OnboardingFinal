/**
 * This is a template file to provide pagination for entities.
 * Used by Customer, Product, Store, Sale Pages.
 * 'type' should be passed to this component for it to fetch the required information.
 */

import { PropTypes } from 'prop-types';
import { useSetCurrentPage, useSetPageSize, useGetObjectDetails } from '../../hooks/PaginationHooks';

const PaginationTemplate = ({ type }) => {

    /*custom hooks */
    const setCurrentPage = useSetCurrentPage();
    const setPageSize = useSetPageSize();

    const { totalCount, pageSize, currentPage } = useGetObjectDetails(type);

    /**handle pagechange from dropdown. This will change the number of records in the page
     * and will reset the current page to 1.
     * */
    const handlePageSizeChange = (e) => {
        setPageSize({ pageSize: Number(e.target.value), type }); // Set the page size based on the dropdown selection
        setCurrentPage({ currentPage: 1, type }); // Reset to first page when page size is changed
    };

    // Handle page number click
    const handlePageClick = (page) => {
        setCurrentPage({ currentPage: page, type }); // Change to the selected page number
    };

    // Calculate total pages based on total product count and page size
     const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className='w-full'>
            {/* Page size selector */}
            <div className="my-4 flex flex-row">
                <label htmlFor="pageSize" className="mr-2" />
                <select
                    id="pageSize"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="px-4 py-2 border rounded"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>

                {/* Pagination links */}
                <p className="px-4 py-2  ml-5 bg-white rounded-lg text-sm ">Total Count: {totalCount}</p>
            </div>
            <div className=" flex justify-end">
                    {/* Show Previous Page Link */}
                    <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 text-sm  bg-gray-200"
                    >
                        Prev
                    </button>

                    {/* Page Number Links */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageClick(index + 1)}
                            className={`px-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Show Next Page Link */}
                    <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 text-sm bg-gray-200"
                    >
                        Next
                    </button>
            </div>
        </div>
    );
};

PaginationTemplate.propTypes =  {
    type: PropTypes.string.isRequired,
};
export default PaginationTemplate;