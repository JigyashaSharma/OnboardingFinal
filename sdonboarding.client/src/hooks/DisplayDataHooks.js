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
import genericMethods from '../utils/GenericMethods';

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

    switch (type) {
        case ObjectTypes.Customer:
            return customers;
            break;
        case ObjectTypes.Product:
            return products;
            break;
        case ObjectTypes.Store:
            return stores;
            break;
        case ObjectTypes.Sale:
            return sales;
            break;
        default:
            //nothing to clear
            if (process.env.NODE_ENV !== 'production') {
                console.error("Wrong type passed to useGetDisplayObject.");
            }
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
        switch (type) {
            case ObjectTypes.Customer:
                dispatch(setEditCustomer(object));
                dispatch(toggleEditVisibilityCustomer(true));
                break;
            case ObjectTypes.Product:
                dispatch(setEditProduct(object));
                dispatch(toggleEditVisibilityProduct(true));
                break;
            case ObjectTypes.Store:
                dispatch(setEditStore(object));
                dispatch(toggleEditVisibilityStore(true));
                break;
            case ObjectTypes.Sale:
                dispatch(setEditSale(object));
                dispatch(toggleEditVisibilitySale(true));
                break;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to setEditDisplay.");
                }
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
        switch (type) {
            case ObjectTypes.Customer:
                dispatch(setDeleteCustomer(object));
                dispatch(toggleDeleteVisibilityCustomer(true));
                break;
            case ObjectTypes.Product:
                dispatch(setDeleteProduct(object));
                dispatch(toggleDeleteVisibilityProduct(true));
                break;
            case ObjectTypes.Store:
                dispatch(setDeleteStore(object));
                dispatch(toggleDeleteVisibilityStore(true));
                break;
            case ObjectTypes.Sale:
                dispatch(setDeleteSale(object));
                dispatch(toggleDeleteVisibilitySale(true));
                break;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to setDeleteDisplay.");
                }
        }
    };

    return setDeleteDisplay;
};

const sortList = (array, key, orderAsc = true) => {
    const valid = genericMethods.handleMissingField({ array, key });
    if (!valid) {
        // no values to sort..
        return null;
    }
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

    // Function will return null if no values to sort. handle the null behavior in the calling code.
    const getSortListAsc = useCallback((key) => {
        switch (type) {
            case ObjectTypes.Customer:
                return sortList(customers, key, true);
                break;
            case ObjectTypes.Product:
                return sortList(products, key, true);
                break;
            case ObjectTypes.Store:
                return sortList(stores, key, true);
                break;
            case ObjectTypes.Sale:
                return sortList(sales, key, true);
                break;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed in getSortListAsc.");
                }
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
        switch (type) {
            case ObjectTypes.Customer:
                return sortList(customers, key, false);
                break;
            case ObjectTypes.Product:
                return sortList(products, key, false);
                break;
            case ObjectTypes.Store:
                return sortList(stores, key, false);
                break;
            case ObjectTypes.Sale:
                return sortList(sales, key, false);
                break;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed getSortListDesc.");
                }
        }
    }, [type, customers, products, stores, sales]);

    return getSortListDesc;
}