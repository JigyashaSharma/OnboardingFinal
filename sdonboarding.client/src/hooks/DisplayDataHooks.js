/**This file contains custom hooks used to display the entities
 * Generally used y DisplayDataTemplate.jsx
 */

import { useSelector, useDispatch } from 'react-redux';
import { ObjectTypes } from '../utils/GenericObjects';
import { setEditProduct, toggleEditVisibilityProduct, setDeleteProduct, toggleDeleteVisibilityProduct } from '../redux/slices/productSlice';
import { setEditCustomer, toggleEditVisibilityCustomer, setDeleteCustomer, toggleDeleteVisibilityCustomer } from '../redux/slices/customerSlice';
import { setEditStore, toggleEditVisibilityStore, setDeleteStore, toggleDeleteVisibilityStore } from '../redux/slices/storeSlice';
import { setEditSale, toggleEditVisibilitySale, setDeleteSale, toggleDeleteVisibilitySale } from '../redux/slices/saleSlice';
import { useCallback } from 'react';

/**
 * This hook is used for getting the records fetch by pages from respective stores.
 * Based on type passed it will query the store for the entity data.
 * @returns: return the data of entites.
 */

export const useGetDisplayObject = (type) => {

    const customers = useSelector((state) => state.customerDetails.customers);
    const products = useSelector((state) => state.productDetails.products);
    const stores = useSelector((state) => state.storeDetails.stores);
    const sales = useSelector((state) => state.saleDetails.sales);

    if (type === ObjectTypes.Customer) {
        return customers;
    } else if (type === ObjectTypes.Product) {
        return products;
    } else if (type === ObjectTypes.Store) {
        return stores;
    } else if (type === ObjectTypes.Sale) {
        return sales;
    }
};

/**
 * This hook is used for setting the object that we want to edit and display edit component.
 * Based on type passed it will send the dispatch request to appropriate store slice.
 * @returns: hook returns setEditDisplay. setEditDisplay nothing.
 */

export const useSetEditObject = (type) => {
    const dispatch = useDispatch();

    const setEditDisplay = (object) => {
        if (type === 'Product') {
            dispatch(setEditProduct(object)); 
            dispatch(toggleEditVisibilityProduct(true));
        } else if (type === 'Customer') {
            dispatch(setEditCustomer(object)); 
            dispatch(toggleEditVisibilityCustomer(true));

        } else if (type === ObjectTypes.Store) {
            dispatch(setEditStore(object)); 
            dispatch(toggleEditVisibilityStore(true));

        } else if (type === ObjectTypes.Sale) {
            dispatch(setEditSale(object));
            dispatch(toggleEditVisibilitySale(true));
        }
    };

    return setEditDisplay;
};

/**
 * This hook is used for setting the object that we want to delete and display edit component in store.
 * Based on type passed it will send the dispatch request to appropriate store slice.
 * @returns: hook returns setDeleteDisplay. setDeleteDisplay nothing.
 */
export const useSetDeleteObject = (type) => {
    const dispatch = useDispatch();

    const setDeleteDisplay = (object) => {
        if (type === 'Product') {
            dispatch(setDeleteProduct(object));
            dispatch(toggleDeleteVisibilityProduct(true));
        } else if (type === 'Customer') {
            dispatch(setDeleteCustomer(object)); 
            dispatch(toggleDeleteVisibilityCustomer(true));
        } else if (type === ObjectTypes.Store) {
            dispatch(setDeleteStore(object));
            dispatch(toggleDeleteVisibilityStore(true));
        } else if (type === ObjectTypes.Sale) {
            dispatch(setDeleteSale(object));
            dispatch(toggleDeleteVisibilitySale(true));
        }
    };

    return setDeleteDisplay;
};

const sortList = (array, key, orderAsc = true) => {
    return (
        [...array].sort((a, b) => typeof a[key] === 'number' ? orderAsc ? a[key] - b[key] : b[key] - a[key] :
            typeof a[key] === 'string' ? orderAsc ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]) :
                a[key] instanceof Date ? orderAsc ? a[key] - b[key] : b[key] - a[key] : 0)
    );
};

export const useGetSortListAsc = (type) => {
    const customers = useSelector((state) => state.customerDetails.customers);
    const products = useSelector((state) => state.productDetails.products);
    const stores = useSelector((state) => state.storeDetails.stores);
    const sales = useSelector((state) => state.saleDetails.sales);

    const getSortListAsc = useCallback((key) => {
        if (type === ObjectTypes.Customer) {

            return sortList(customers, key, true);
        } else if (type === ObjectTypes.Product) {
            return sortList(products, key, true);
        } else if (type === ObjectTypes.Store) {
            return sortList(stores, key, true);
        } else if (type === ObjectTypes.Sale) {
            return sortList(sales, key, true);
        }
    }, [type, customers, products, stores, sales]);

    return getSortListAsc;
};

export const useGetSortListDesc = (type) => {
    const customers = useSelector((state) => state.customerDetails.customers);
    const products = useSelector((state) => state.productDetails.products);
    const stores = useSelector((state) => state.storeDetails.stores);
    const sales = useSelector((state) => state.saleDetails.sales);

    const getSortListDesc = useCallback((key) => {
        if (type === ObjectTypes.Customer) {
            return sortList(customers, key, false);
        } else if (type === ObjectTypes.Product) {
            return sortList(products, key, false);
        } else if (type === ObjectTypes.Store) {
            return sortList(stores, key, false);
        } else if (type === ObjectTypes.Sale) {
            return sortList(sales, key, false);
        }
    }, [type, customers, products, stores, sales]);

    return getSortListDesc;
}