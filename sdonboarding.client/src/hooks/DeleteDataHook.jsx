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
        switch (type) {
            case ObjectTypes.Customer:
                return state.customerDetails.customerToDelete;
            case ObjectTypes.Product:
                return state.productDetails.productToDelete;
            case ObjectTypes.Store:
                return state.storeDetails.storeToDelete;
            case ObjectTypes.Sale:
                return state.saleDetails.saleToDelete;
            default:
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to fetch the object to delete.");
                }
                return null;
        }
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
        switch (type) {
            case ObjectTypes.Customer:
                dispatch(setDeleteCustomer(null));
                dispatch(toggleDeleteVisibilityCustomer(false));
                break;
            case ObjectTypes.Product:
                dispatch(setDeleteProduct(null));
                dispatch(toggleDeleteVisibilityProduct(false));
                break;
            case ObjectTypes.Store:
                dispatch(setDeleteStore(null));
                dispatch(toggleDeleteVisibilityStore(false));
                break;
            case ObjectTypes.Sale:
                dispatch(setDeleteSale(null));
                dispatch(toggleDeleteVisibilitySale(false));
                break;
            default:
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed. Nothing to cancel.");
                }
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
            switch (type) {
                case ObjectTypes.Customer:
                    await customerApiServices.deleteCustomer(deleteObject.id);
                    break;
                case ObjectTypes.Product:
                    await productApiServices.deleteProduct(deleteObject.id);
                    break;
                case ObjectTypes.Store:
                    await storeApiServices.deleteStore(deleteObject.id);
                    break;
                case ObjectTypes.Sale:
                    await saleApiServices.deleteSale(deleteObject.id);
                    break;
                default:
                    throw error("Type unknown to delete the object.");
            }

            dispatch(setSuccess(`${type} deleted successfully`));
            setTimeout(() => {
                dispatch(setSuccess(""));
            }, 10000);

        } catch (error) {
            if (error.message) {
                dispatch(setError(`${error.message}`));
            } else {
                dispatch(setError(`Failed to delete ${type}`));
            }
            
            setTimeout(() => {
                dispatch(setError(''));
            }, 10000);

        } finally {
            switch (type) {
                case ObjectTypes.Customer:
                    dispatch(setDeleteCustomer(null));
                    dispatch(toggleDeleteVisibilityCustomer(false));
                    break;
                case ObjectTypes.Product:
                    dispatch(setDeleteProduct(null));
                    dispatch(toggleDeleteVisibilityProduct(false));
                    break;
                case ObjectTypes.Store:
                    dispatch(setDeleteStore(null));
                    dispatch(toggleDeleteVisibilityStore(false));
                    break;
                case ObjectTypes.Sale:
                    dispatch(setDeleteSale(null));
                    dispatch(toggleDeleteVisibilitySale(false));
                    break;
                default:
                    //nothing to clear
                    if (process.env.NODE_ENV !== 'production') {
                        console.error("Wrong type passed. Nothing to clear for delete.");
                    }
            }
        }
    };

    return sendDeleteRequest;

};