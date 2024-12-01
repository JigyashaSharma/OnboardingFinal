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
            switch (type) {
                case ObjectTypes.Customer:
                    await customerApiServices.createCustomer(addObject);
                    break;
                case ObjectTypes.Product:
                    await productApiServices.createProduct(addObject);
                    break;
                case ObjectTypes.Store:
                    await storeApiServices.createStore(addObject);
                    break;
                case ObjectTypes.Sale:
                    await saleApiServices.createSale(addObject);
                    break;
                default:
                    throw error("Type unknown to create the object.");
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
            switch (type) {
                case ObjectTypes.Customer:
                    dispatch(toggleAddVisibilityCustomer(false));
                    break;
                case ObjectTypes.Product:
                    dispatch(toggleAddVisibilityProduct(false));
                    break;
                case ObjectTypes.Store:
                    dispatch(toggleAddVisibilityStore(false));
                    break;
                case ObjectTypes.Sale:
                    dispatch(toggleAddVisibilitySale(false));
                    break;
                default:
                //nothing to clear
                    if (process.env.NODE_ENV !== 'production') {
                        console.error("Wrong type passed. Nothing to clear.");
                    }
            }
        }
    };

    return sendAddRequest;
};

export const useAddCancel = (type) => {

    const dispatch = useDispatch();

    const addCancel = () => {
        switch (type) {
            case ObjectTypes.Customer:
                dispatch(toggleAddVisibilityCustomer(false));
                break;
            case ObjectTypes.Product:
                dispatch(toggleAddVisibilityProduct(false));
                break;
            case ObjectTypes.Store:
                dispatch(toggleAddVisibilityStore(false));
                break;
            case ObjectTypes.Sale:
                dispatch(toggleAddVisibilitySale(false));
                break;
            default:
            //nothing to toggle. just log in dev
                if (process.env.NODE_ENV !== 'production') {
                    console.error("Wrong type passed. Nothing to cancel.");
                }
        }
    };

    return addCancel;
};