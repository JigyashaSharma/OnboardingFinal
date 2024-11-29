/**
 * This is a template file for editing an entity.
 * Used by Customer, Product, Store, Sale Pages.
 * 'type' should be passed to this component for it to fetch the required information.
 */

import { useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { useGetEditObject, useSendEditRequest, useEditCancel } from '../../hooks/EditDataHooks';
import { genericEditDataMethods } from '../../utils/GenericEditDataMethods';
import { useGetOtherObjectsData } from '../../hooks/commonHooks';
import { useDispatch } from 'react-redux';
import { ObjectTypes } from '../../utils/GenericObjects';
import genericMethods from '../../utils/GenericMethods';
import { setError } from '../../redux/slices/commonSlice';
import { CheckIcon } from '@heroicons/react/24/solid';

const EditDataTemplate = ({ type }) => {

    const dispatch = useDispatch();
    const editObject = useGetEditObject(type);
    if (!editObject) {
        //displaying message that edit obejct not found
        //alert("edit object not found Please try again!");
        if (process.env.NODE_ENV !== 'production') {
            console.error("Object to be edited not found.");
        }
        return;
    }
    const { labels, formElementType } = genericEditDataMethods.getEditObjectLabels(type);
    if (!labels || !formElementType) {
        return;
    }

    /* custom hooks */
    const [localObject, setLocalObject] = useState(editObject);
    const sendEditRequest = useSendEditRequest(localObject, type);
    const getOtherObjectsData = useGetOtherObjectsData();
    const editCancel = useEditCancel(type);

    /* Only relevant for Sales functionality*/
    const [localCustomers, setLocalCustomers] = useState(null);
    const [localProducts, setLocalProducts] = useState(null);
    const [localStores, setLocalStores] = useState(null);

    /** Fetches all the objects that we will need for Sale's Add dropdowns
     * currently relevant for Sales only
     */
    const fetchOthersData = useCallback(async () => {
        try {
            if (type === ObjectTypes.Sale) {
                const { customers, products, stores } = await getOtherObjectsData();

                /*filtering these objects so that default value is at top*/
                /*this will help in displaying them at top*/
                if (!localObject) {
                    throw error("No object to edit");
                }

                //filterData handles all the validation and throw's error if failed
                const filteredCustomers = genericEditDataMethods.filterData(customers, localObject.customerId);
                setLocalCustomers(filteredCustomers);

                const filteredProducts = genericEditDataMethods.filterData(products, localObject.productId);
                setLocalProducts(filteredProducts);

                const filteredStores = genericEditDataMethods.filterData(stores, localObject.storeId);
                setLocalStores(filteredStores);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(setError('Error fetching data for Sales:', error));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchOthersData();
    }, [fetchOthersData]);

    const handleInputChange = (e) => {
        const valid = genericMethods.handleMissingField({ e });
        if (!valid) {
            alert("Missing value in form. Please try again.");
            return;
        }

        const { name, value } = e.target;
        
        e.target.setCustomValidity(''); //Needed to remove the custom message in edit form after changing input
        setLocalObject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /**List Change handler, it will update localObject with ID and name as we select it from the dropdown
     * currently relevant for Sales only
    */
    const handleListChange = (id, name, selectedType) => {
        const valid = genericMethods.handleMissingField({ id, name, selectedType });
        if (!valid) {
            alert("Missing value in form. Please try again.");
            return;
        }

        switch (selectedType) {
            case ObjectTypes.Customer:
                setLocalObject((prevState) => ({
                    ...prevState,
                    customerId: id,
                    customer: name,
                }));
                break;
            case ObjectTypes.Product:
                setLocalObject((prevState) => ({
                    ...prevState,
                    productId: id,
                    product: name,
                }));
                break;
            case ObjectTypes.Store:
                setLocalObject((prevState) => ({
                    ...prevState,
                    storeId: id,
                    store: name,
                }));
                break;
            default:
                // In production, do not log to the console
                if (process.env.NODE_ENV !== 'production') {
                    console.error("No option selected"); // Log in development or staging environments
                }
            //may be an alert in prod!!!
        }
    };

    //handle Cancel the form
    const handleCancel = () => {
        setLocalObject(null);
        editCancel();
    };

    //handle the form submit event
    const handleSubmit = async (e) => {
        e.preventDefault();

        const valid = genericMethods.validateInputValuesOnSubmit(type);

        //Call the parent function for edit request to server
        if (valid === true) {
            await sendEditRequest();
            setLocalObject(null);
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Something wrong with the form parameters.");
            }
            return;
        }
    };

    if (!localObject) {
        return <div>Loading...</div>; 
    }

    return (
        <div className='fixed inset-0 bg-gray-400 bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50'
            onClick={handleCancel} //closing the modal if we click outside
        >
            <div className="bg-white p-6 rounded shadow-md relative w-[600px] font-semibold"
                onClick={(e) => e.stopPropagation()} // stopping the component from getting closed when click inside
            >
                <h2 className='mb-2'>Edit {type} </h2>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        {labels && localObject && formElementType && Object.keys(labels).map((key, index) => {

                            return (
                                <div key={key}>
                                    <label htmlFor={key} className='mt-2'>{labels[key]}</label>
                                    {formElementType[index].toLowerCase() === ObjectTypes.Customer.toLowerCase() ? (
                                        //Render Customer List in options dropdown
                                        genericMethods.generateSelect(key, localObject, localCustomers, ObjectTypes.Customer, handleListChange)

                                    ) : formElementType[index].toLowerCase() === ObjectTypes.Product.toLowerCase() ? (
                                            //Render Product List in options dropdown
                                        genericMethods.generateSelect(key, localObject, localProducts, ObjectTypes.Product, handleListChange)

                                    ) : formElementType[index].toLowerCase() === ObjectTypes.Store.toLowerCase() ? (
                                            //Render Store List in options dropdown
                                        genericMethods.generateSelect(key, localObject, localStores, ObjectTypes.Store, handleListChange)

                                    ) : formElementType[index].toLowerCase() === ObjectTypes.Date.toLowerCase()  && !isNaN(Date.parse(localObject[key])) &&
                                         (localObject[key].includes('-') || localObject[key].includes('/')) ? (
                                         // Render date input and removing the T part
                                        genericMethods.getDateDisplay(key, localObject, handleInputChange)

                                    ) : formElementType[index].toLowerCase() === ObjectTypes.Number.toLowerCase() ? (
                                        // Render number input if the field is a number(Price)
                                        genericMethods.getNumberDisplay(key, localObject, labels, handleInputChange)

                                    ): (
                                          // Render text input for other fields (like 'name', 'address')
                                        genericMethods.getTextInputDisplay(key, localObject, labels, handleInputChange)

                                    )}
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            onClick={handleCancel}
                            className="px-3 py-1 rounded bg-gray-800 text-white mr-5 mt-4 text-center">cancel</button>
                        <button
                            type='submit'
                            className=" flex justify-between rounded bg-green-500 text-white space-x-2 w-24 mt-4">
                            <span className="flex-grow text-center mt-1">edit</span>
                            <CheckIcon className="w-7 h-full bg-green-600 ml-2 rounded-r-lg" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

EditDataTemplate.propTypes = {
    type: PropTypes.string.isRequired,
};
export default EditDataTemplate;