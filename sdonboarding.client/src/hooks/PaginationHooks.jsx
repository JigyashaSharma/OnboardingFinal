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
        switch (type) {
            case ObjectTypes.Customer:
                dispatch(setCurrentPageCustomer(currentPage));
            case ObjectTypes.Product:
                dispatch(setCurrentPageProduct(currentPage));
            case ObjectTypes.Store:
                dispatch(setCurrentPageStore(currentPage));
            case ObjectTypes.Sale:
                dispatch(setCurrentPageSale(currentPage));
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to setCurrentPage.");
                }
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
        switch (type) {
            case ObjectTypes.Customer:
                dispatch(setPageSizeCustomer(pageSize));
            case ObjectTypes.Product:
                dispatch(setPageSizeProduct(pageSize));
            case ObjectTypes.Store:
                dispatch(setPageSizeStore(pageSize));
            case ObjectTypes.Sale:
                dispatch(setPageSizeSale(pageSize));
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to setPageSize.");
                }
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
        switch (type) {
            case ObjectTypes.Customer:
                return state.customerDetails.totalCount;
            case ObjectTypes.Product:
                return state.productDetails.totalCount;
            case ObjectTypes.Store:
                return state.storeDetails.totalCount;
            case ObjectTypes.Sale:
                return state.saleDetails.totalCount;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to useGetObjectDetails.");
                }
                return null;
        }
    });

    const pageSize = useSelector((state) => {
        switch (type) {
            case ObjectTypes.Customer:
                return state.customerDetails.pageSize;
            case ObjectTypes.Product:
                return state.productDetails.pageSize;
            case ObjectTypes.Store:
                return state.storeDetails.pageSize;
            case ObjectTypes.Sale:
                return state.saleDetails.pageSize;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to useGetObjectDetails.");
                }
                return null;
        }
    });

    const currentPage = useSelector((state) => {
        switch (type) {
            case ObjectTypes.Customer:
                return state.customerDetails.currentPage;
            case ObjectTypes.Product:
                return state.productDetails.currentPage;
            case ObjectTypes.Store:
                return state.storeDetails.currentPage;
            case ObjectTypes.Sale:
                return state.saleDetails.currentPage;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to useGetObjectDetails.");
                }
                return null;
        }
    });

    return { totalCount, pageSize, currentPage };
};