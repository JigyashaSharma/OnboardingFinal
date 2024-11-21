/**
 * This file contains common custom hook used across different templates.
 */

import { useDispatch } from 'react-redux';
import genericMethods from '../utils/GenericMethods';
import { setError } from '../redux/slices/commonSlice';

/**
 * This hook is used for getting the data of Customer, Product and Store.
 * Used by Sale entity.
 * Reference in AddDataTemplate.jsx and EditDataTemplate.jsx
 * @returns: function to call when we need the data.
 */

export const useGetOtherObjectsData = () => {
    const dispatch = useDispatch();

    const getOtherObjectsData = async () => {
        try {
            const [customers, products, stores] = await Promise.all([genericMethods.fetchCustomerDetails(),
                genericMethods.fetchProductDetails(), genericMethods.fetchStoreDetails()]);

            return { customers, products, stores }

        } catch (error) {
            dispatch(setError("Error in Sales creation: Error Fetching data: ", error));
            setTimeout(() => {
                dispatch(setError(''));
            }, 10000);
        }
    }
    return getOtherObjectsData;
};