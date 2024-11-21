/**This file contains methods that can be used by PaginationTemplate.
 */

import { useSelector, useDispatch } from 'react-redux';
import { setPageSizeCustomer, setCurrentPageCustomer } from '../../redux/slices/customerSlice';
import { setPageSizeProduct, setCurrentPageProduct } from '../../redux/slices/productSlice';
import { ObjectTypes } from '../../utils/GenericObjects';

export const GetObjectDetails = (type) => {

    const totalCount = useSelector((state) => {
        if (type === ObjectTypes.Customer) {
            return state.customerDetails.totalCount;
        } else if (type === ObjectTypes.Product) {
            return state.addProductModal.totalCount;
        }
        return 0; // Default case
    });

    const pageSize = useSelector((state) => {
        if (type === ObjectTypes.Customer) {
            return state.customerDetails.pageSize;
        } else if (type === ObjectTypes.Product) {
            return state.addProductModal.pageSize;
        }
        return 0; // Default case
    });

    const currentPage = useSelector((state) => {
        if (type === ObjectTypes.Customer) {
            return state.customerDetails.currentPage;
        } else if (type === ObjectTypes.Product) {
            return state.addProductModal.currentPage;
        }
        return 0; // Default case
    });

    return { totalCount, pageSize, currentPage };
};

export const SetCurrentPage = ({currentPage, type}) => {
    const dispatch = useDispatch();

    if (type === ObjectTypes.Customer) {
        dispatch(setCurrentPageCustomer(currentPage));
    } else if (type === ObjectTypes.Product) {
        dispatch(setCurrentPageProduct(currentPage));
    } else if (type === ObjectTypes.Store) {
        return;
    } else if (type === ObjectTypes.Sale) {
        return;
    }
};

export const SetPageSize = ({ pageSize, type }) => {
    const dispatch = useDispatch();

    if (type === ObjectTypes.Customer) {
        dispatch(setPageSizeCustomer(pageSize));
    } else if (type === ObjectTypes.Product) {
        dispatch(setPageSizeProduct(pageSize));
    } else if (type === ObjectTypes.Store) {
        return;
    } else if (type === ObjectTypes.Sale) {
        return;
    }
};