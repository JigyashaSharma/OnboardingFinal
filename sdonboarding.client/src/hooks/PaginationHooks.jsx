import { useDispatch, useSelector } from 'react-redux';
import { setPageSizeCustomer, setCurrentPageCustomer } from '../redux/slices/customerSlice';
import { setPageSizeProduct, setCurrentPageProduct } from '../redux/slices/productSlice';
import { setPageSizeSale, setCurrentPageSale } from '../redux/slices/saleSlice';
import { setPageSizeStore, setCurrentPageStore } from '../redux/slices/storeSlice';
import { ObjectTypes } from '../utils/GenericObjects'; // Adjust paths as necessary

/**
 * This hook is used for setting the current page to display the required records.
 * Based on type passed it will dispatch the setCurrentPage request to store.
 */
export const useSetCurrentPage = () => {
    const dispatch = useDispatch();

    const setCurrentPage = ({ currentPage, type }) => {
        if (type === ObjectTypes.Customer) {
            dispatch(setCurrentPageCustomer(currentPage));
        } else if (type === ObjectTypes.Product) {
            dispatch(setCurrentPageProduct(currentPage));
        } else if (type === ObjectTypes.Store) {
            dispatch(setCurrentPageStore(currentPage));
        } else if (type === ObjectTypes.Sale) {
            dispatch(setCurrentPageSale(currentPage));
        }
    };

    return setCurrentPage ;
};

/**
 * This hook is used for setting the page size to display the number of records.
 * Based on type passed it will dispatch the setPageSize request to store.
 */
export const useSetPageSize = () => {
    const dispatch = useDispatch();

    const setPageSize = ({ pageSize, type }) => {
        if (type === ObjectTypes.Customer) {
            dispatch(setPageSizeCustomer(pageSize));
        } else if (type === ObjectTypes.Product) {
            dispatch(setPageSizeProduct(pageSize));
        } else if (type === ObjectTypes.Store) {
            dispatch(setPageSizeStore(pageSize));;
        } else if (type === ObjectTypes.Sale) {
            dispatch(setPageSizeSale(pageSize));
        }
    }

    return setPageSize;
};

// Custom hook to get object details based on the type (e.g., Customer, Product)
/**
 * This hook is used to get pagination related object details from store.
 * Based on type passed it will dispatch the setPageSize  and get: totalCount, pageSize, currentPage
 */
export const useGetObjectDetails = (type) => {
    // Accessing Redux state based on object type
    const totalCount = useSelector((state) => {
        if (type === ObjectTypes.Customer) {
            return state.customerDetails.totalCount;
        } else if (type === ObjectTypes.Product) {
            return state.productDetails.totalCount;
        } else if (type === ObjectTypes.Store) {
            return state.storeDetails.totalCount;
        } else if (type === ObjectTypes.Sale) {
            return state.saleDetails.totalCount;
        }
        return 0; // Default case
    });

    const pageSize = useSelector((state) => {
        if (type === ObjectTypes.Customer) {
            return state.customerDetails.pageSize;
        } else if (type === ObjectTypes.Product) {
            return state.productDetails.pageSize;
        } else if (type === ObjectTypes.Store) {
            return state.storeDetails.pageSize;
        } else if (type === ObjectTypes.Sale) {
            return state.saleDetails.pageSize;
        }
        return 0; // Default case
    });

    const currentPage = useSelector((state) => {
        if (type === ObjectTypes.Customer) {
            return state.customerDetails.currentPage;
        } else if (type === ObjectTypes.Product) {
            return state.productDetails.currentPage;
        } else if (type === ObjectTypes.Store) {
            return state.storeDetails.currentPage;
        } else if (type === ObjectTypes.Sale) {
            return state.saleDetails.currentPage;
        }
        return 0; // Default case
    });

    return { totalCount, pageSize, currentPage };
};