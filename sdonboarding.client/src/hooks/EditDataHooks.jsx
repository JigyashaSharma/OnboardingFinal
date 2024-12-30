/**This file contains custom hooks used for editing records
 * Used by EditDataTemplate.jsx
 */
import { useSelector, useDispatch } from 'react-redux';
import { ObjectTypes } from '../utils/GenericObjects';
import { setEditProduct, toggleEditVisibilityProduct } from '../redux/slices/productSlice';
import { setSuccess, setError } from '../redux/slices/commonSlice';
import { setEditCustomer, toggleEditVisibilityCustomer } from '../redux/slices/customerSlice';
import { setEditStore, toggleEditVisibilityStore } from '../redux/slices/storeSlice';
import { setEditSale, toggleEditVisibilitySale } from '../redux/slices/saleSlice';
import productApiServices from '../services/productServices';
import customerApiServices from '../services/customerServices';
import storeApiServices from '../services/storeServices';
import saleApiServices from '../services/saleServices';

/**
 * This hook is used for getting the object that we want to edit from store.
 * Based on type passed it will fetch the appropriate object frm store to edit.
 * @returns: editObject.
 */

export const useGetEditObject = (type) => {

    const editObject = useSelector((state) => {
        switch (type) {
            case ObjectTypes.Customer:
                return state.customerDetails.customerToEdit;
            case ObjectTypes.Product:
                return state.productDetails.productToEdit;
            case ObjectTypes.Store:
                return state.storeDetails.storeToEdit;
            case ObjectTypes.Sale:
                return state.saleDetails.saleToEdit;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed. to fetch the object");
                }
                return null;
        }
    });

    return (editObject);
};

/**
 * This hook is used for calling the api to editing the records to server.
 * Based on type passed it will call the edit function from services to send request to server.
 * Sets the error and success message accordingly.
 */

export const useSendEditRequest = (editObject, type) => {

    const dispatch = useDispatch();
     const sendEditRequest = async () => {
         try {
             switch (type) {
                 case ObjectTypes.Customer:
                     await customerApiServices.editCustomer(editObject);
                     break;
                 case ObjectTypes.Product:
                     await productApiServices.editProduct(editObject);
                     break;
                 case ObjectTypes.Store:
                     await storeApiServices.editStore(editObject);
                     break;
                 case ObjectTypes.Sale:
                     await saleApiServices.editSale(editObject);
                     break;
                 default:
                     throw error("Wrong type passed to sendEditRequest");
             }
             dispatch(setSuccess(`${type} edited successfully`));
             setTimeout(() => {
                 dispatch(setSuccess(""));
             }, 10000);
         } catch (error) {
             dispatch(setError(`Failed to edit product ${error}`));
             setTimeout(() => {
                 dispatch(setError(''));
             }, 10000);
         } finally {
             switch (type) {
                 case ObjectTypes.Customer:
                     dispatch(setEditCustomer(null));
                     dispatch(toggleEditVisibilityCustomer(false));
                     break;
                 case ObjectTypes.Product:
                     dispatch(setEditProduct(null));
                     dispatch(toggleEditVisibilityProduct(false));
                     break;
                 case ObjectTypes.Store:
                     dispatch(setEditStore(null));
                     dispatch(toggleEditVisibilityStore(false));
                     break;
                 case ObjectTypes.Sale:
                     dispatch(setEditSale(null));
                     dispatch(toggleEditVisibilitySale(false));
                     break;
                 default:
                     //nothing to clear
                     if (process.env.NODE_ENV !== 'production') {
                         console.error("Wrong type passed to useSendEditRequest. nothing to clear in finally");
                     }
             }
         }
    };

    return sendEditRequest;  
};

export const useEditCancel = (type) => {

    const dispatch = useDispatch();

    const editCancel = () => {
        switch (type) {
            case ObjectTypes.Customer:
                dispatch(setEditCustomer(null));
                dispatch(toggleEditVisibilityCustomer(false));
                break;
            case ObjectTypes.Product:
                dispatch(setEditProduct(null));
                dispatch(toggleEditVisibilityProduct(false));
                break;
            case ObjectTypes.Store:
                dispatch(setEditStore(null));
                dispatch(toggleEditVisibilityStore(false))
                break;
            case ObjectTypes.Sale:
                dispatch(setEditSale(null));
                dispatch(toggleEditVisibilitySale(false))
                break;
            default:
                //nothing to clear
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed to editCancel.");
                }
        }
    };

    return editCancel;
};