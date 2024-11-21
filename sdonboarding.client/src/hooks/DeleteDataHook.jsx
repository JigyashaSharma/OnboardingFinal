/**
 * This is a custom hook file for deleting records in entities.
 * Generally used by DeleteDataTemplate.jsx
 */

import { useDispatch, useSelector } from 'react-redux';
import { ObjectTypes } from '../utils/GenericObjects';
import { setDeleteProduct, toggleDeleteVisibilityProduct } from '../redux/slices/productSlice';
import { setDeleteCustomer, toggleDeleteVisibilityCustomer } from '../redux/slices/customerSlice';
import { setDeleteStore, toggleDeleteVisibilityStore } from '../redux/slices/storeSlice';
import { setDeleteSale, toggleDeleteVisibilitySale } from '../redux/slices/saleSlice';
import { setError, setSuccess } from '../redux/slices/commonSlice';
import customerApiServices from '../services/customerServices';
import productApiServices from '../services/productServices';
import storeApiServices from '../services/storeServices';
import saleApiServices from '../services/saleServices';

/**
 * This hook is used for getting the object of and entity that we want to delete from store.
 * Based on type passed it will fetch the object details that need to be deleted.
 * @returns: deleteObject
 */

export const useGetDeleteObject = (type ) => {
    
    const deleteObject = useSelector((state) => {
        if (type === ObjectTypes.Customer) {
            return state.customerDetails.customerToDelete;
        } else if (type === ObjectTypes.Product) {
            return state.productDetails.productToDelete;
        } else if (type === ObjectTypes.Store) {
            return state.storeDetails.storeToDelete;
        } else if (type === ObjectTypes.Sale) {
            return state.saleDetails.saleToDelete;
        }
        return {}; // Default case
    });

    return (deleteObject);
};


/**
 * This hook is used for cancelling delete operation based on the type passed.
 * @returns: Nothing
 */
export const useDeleteCancel = (type) => {
    const dispatch = useDispatch();

    const deleteCancel = () => {
        if (type === ObjectTypes.Customer) {
            dispatch(setDeleteCustomer(null));
            dispatch(toggleDeleteVisibilityCustomer(false));
        } else if (type === ObjectTypes.Product) {
            dispatch(setDeleteProduct(null));
            dispatch(toggleDeleteVisibilityProduct(false));
        } else if (type === ObjectTypes.Store) {
            dispatch(setDeleteStore(null));
            dispatch(toggleDeleteVisibilityStore(false));
        } else if (type === ObjectTypes.Sale) {
            dispatch(setDeleteSale(null));
            dispatch(toggleDeleteVisibilitySale(false));
        } 
    };

    return deleteCancel;
};

/**
 * This hook is used for sending the delete api request.
 * Based on type passed it will call the api function from Services.
 * sets the success or error message.
 * @returns: return the function sendDeleteRequest that will do above things.
 */

export const useSendDeleteRequest = (deleteObject, type) => {
    const dispatch = useDispatch();

    const sendDeleteRequest = async () => {
        try {
            if (type === ObjectTypes.Customer) {
                await customerApiServices.deleteCustomer(deleteObject.id);

            } else if (type === ObjectTypes.Product) {
                await productApiServices.deleteProduct(deleteObject.id);
            } else if (type === ObjectTypes.Store) {
                await storeApiServices.deleteStore(deleteObject.id);
            } else if (type === ObjectTypes.Sale) {
                await saleApiServices.deleteSale(deleteObject.id);
            }

            dispatch(setSuccess(`${type} deleted successfully`));
            setTimeout(() => {
                dispatch(setSuccess(""));
            }, 10000);

        } catch (error) {
            dispatch(setError(`Failed to delete ${type}: ${error}`));
            setTimeout(() => {
                dispatch(setError(''));
            }, 10000);

        } finally {
            if (type === ObjectTypes.Customer) {
                dispatch(setDeleteCustomer(null));
                dispatch(toggleDeleteVisibilityCustomer(false));
            } else if (type === ObjectTypes.Product) {
                dispatch(setDeleteProduct(null));
                dispatch(toggleDeleteVisibilityProduct(false));
            } else if (type === ObjectTypes.Store) {
                dispatch(setDeleteStore(null));
                dispatch(toggleDeleteVisibilityStore(false));
            } else if (type === ObjectTypes.Sale) {
                dispatch(setDeleteSale(null));
                dispatch(toggleDeleteVisibilitySale(false));
            }
        }
    };

    return sendDeleteRequest;

};