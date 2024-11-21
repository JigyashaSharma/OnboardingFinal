/**
 * This is a custom hook file for creating records in entities.
 * Generally used by AddDataTemplate.jsx
 */

import { useDispatch } from 'react-redux';
import { ObjectTypes } from '../utils/GenericObjects';
import { toggleAddVisibilityProduct } from '../redux/slices/productSlice';
import { setSuccess, setError } from '../redux/slices/commonSlice';
import { toggleAddVisibilityCustomer } from '../redux/slices/customerSlice';
import { toggleAddVisibilitySale } from '../redux/slices/saleSlice';
import { toggleAddVisibilityStore } from '../redux/slices/storeSlice';
import productApiServices from '../services/productServices';
import customerApiServices from '../services/customerServices';
import saleApiServices from '../services/saleServices';
import storeApiServices from '../services/storeServices';


export const useSendAddRequest = (addObject, type) => {

    const dispatch = useDispatch();
    const sendAddRequest = async () => {
        try {
            if (type === ObjectTypes.Customer) {
                await customerApiServices.createCustomer(addObject);

            } else if (type === ObjectTypes.Product) {
                await productApiServices.createProduct(addObject);
            } else if (type === ObjectTypes.Store) {
                await storeApiServices.createStore(addObject);
            } else if (type === ObjectTypes.Sale) {
                await saleApiServices.createSale(addObject);
            }

            dispatch(setSuccess(`${type} added successfully`));
            setTimeout(() => {
                dispatch(setSuccess(""));
            }, 10000);
        } catch (error) {
            dispatch(setError(`Failed to add product ${error}`));
            setTimeout(() => {
                dispatch(setError(''));
            }, 10000);
        } finally {
            if (type === ObjectTypes.Customer) {
                dispatch(toggleAddVisibilityCustomer(false));
            } else if (type === ObjectTypes.Product) {
                dispatch(toggleAddVisibilityProduct(false));
            } else if (type === ObjectTypes.Store) {
                dispatch(toggleAddVisibilityStore(false));
            } else if (type === ObjectTypes.Sale) {
                dispatch(toggleAddVisibilitySale(false));
            }
        }
    };

    return sendAddRequest;
};

export const useAddCancel = (type) => {

    const dispatch = useDispatch();

    const addCancel = () => {
        if (type === ObjectTypes.Customer) {
            dispatch(toggleAddVisibilityCustomer(false));
        } else if (type === ObjectTypes.Product) {
            dispatch(toggleAddVisibilityProduct(false));
        } else if (type === ObjectTypes.Store) {
            dispatch(toggleAddVisibilityStore(false));
        } else if (type === ObjectTypes.Sale) {
            dispatch(toggleAddVisibilitySale(false));
        }
    };

    return addCancel;
};