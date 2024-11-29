/**
 * This is a template file for creating an entity.
 * Used by Customer, Product, Store, Sale Pages.
 * 'type' should be passed to this component for it to fetch the required information.
 */

import { PropTypes } from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import genericAddDataMethods from '../../utils/GenericAddDataMethods';
import { useSendAddRequest, useAddCancel } from '../../hooks/AddDataHooks';
import { useGetOtherObjectsData } from '../../hooks/commonHooks';
import { useDispatch } from 'react-redux';
import { setError } from '../../redux/slices/commonSlice';
import { ObjectTypes } from '../../utils/GenericObjects';
import { CheckIcon } from '@heroicons/react/24/solid';
import genericMethods from '../../utils/GenericMethods';

const AddDataTemplate = ({ type }) => {

    const dispatch = useDispatch();
    const { labels = {}, initObject = {}, formElementType = [] } = genericAddDataMethods.getInitLocalObject(type) || {};

    const [localObject, setLocalObject] = useState(initObject);
    /* custom hooks */
    const handleAddSubmit = useSendAddRequest(localObject, type);
    const getOtherObjectsData = useGetOtherObjectsData();
    const handleAddCancel = useAddCancel(type);

    /* Only relevant for Sales functionality*/
    const [localCustomers, setLocalCustomers] = useState(null);
    const [localProducts, setLocalProducts] = useState(null);
    const [localStores, setLocalStores] = useState(null);

    /* Fetches all the objects that we will need for Sales Add dropdowns*/
    const fetchOthersData = useCallback(async () => {
        try {
            if (type === ObjectTypes.Sale) {
                const { customers, products, stores } = await getOtherObjectsData();
                if (!customers || !products || !stores) {
                    throw error("Sale cannot be created. Check if customer/product/store are there.");
                }
                setLocalCustomers(customers);
                setLocalProducts(products);
                setLocalStores(stores);
            }
            
        } catch (error) {
            //console.error('Error fetching data:', error);
            dispatch(setError('Error fetching data for Sales:', error));
        }
    }, [dispatch]);

    useEffect(() => {
       

        fetchOthersData();
    }, [fetchOthersData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const valid = genericMethods.handleMissingField({ name, value });
        if (!valid) {
            alert("Missing value in form. Please try again.");
            return;
        }
        e.target.setCustomValidity('');
        setLocalObject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /*handle the product active dropdown value*/
    const handleActiveChange = (e) => {
        const valid = genericMethods.handleMissingField({ active: e.target.value });
        if (!valid) {
            alert("Missing value in form. Please try again.");
            return;
        }
        
        setLocalObject((prevState) => ({
            ...prevState,
            active: e.target.value === 'true'
        }));
    };

    /*List Change handler, it will update localObject with ID and name as we select it from the dropdown*/
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

    const handleCancel = () => {
        setLocalObject(null);
        handleAddCancel();
    };

    
    //handle the form submit event
    const handleSubmit = async (e) => {
        e.preventDefault();

        const valid = genericMethods.validateInputValuesOnSubmit(type);

        //Call the parent function for edit request to server
        if (valid) {
            //function will do error handling and set the success and error message.
            //Safe to just reset localObject and return in any case
            await handleAddSubmit();
            setLocalObject(null);
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Something wrong with the form parameters.");
            }
        }
    };

     return (
         <div className='fixed inset-0 bg-gray-400 bg-opacity-70 backdrop-blur-sm  flex justify-center items-center z-50'
            onClick={handleCancel} //closing the modal if we click outside
        >
            <div className="bg-white p-6 rounded shadow-md relative w-[600px] font-semibold"
                onClick={(e) => e.stopPropagation()} // stopping the component from getting closed when click inside
            >
                <h2 className='mb-2'>Create {type} </h2>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                     <div className='mb-4'>
                         {/*keys of labels are object keys also that we need for creating object*/}
                         {labels && localObject && formElementType  && Object.keys(labels).map((key, index) => {
                            return (
                                <div key={key} className="flex flex-col">
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

                                    ) : formElementType[index].toLowerCase() === ObjectTypes.Date.toLowerCase() ? (
                                        // Render date input if the field is a date
                                        genericMethods.getDateDisplay(key, localObject, handleInputChange)
                                    ) : formElementType[index].toLowerCase === ObjectTypes.Number.toLowerCase() ? (
                                        // Render number input if the field is a number(Price)
                                        genericMethods.getNumberDisplay(key, localObject, labels, handleInputChange)
                                    ) : (
                                        // Render text input for other fields (like 'name', Address)
                                        genericMethods.getTextInputDisplay(key, localObject,labels, handleInputChange)
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <hr/ >
                    <div className='flex justify-end'>
                        <button
                            type='button'
                            onClick={handleCancel}
                             className="px-3 py-1 rounded bg-gray-800 text-white mr-5 mt-4 text-center">cancel</button>
                        <button
                            type='submit'
                             className="flex justify-between rounded bg-green-500 text-white space-x-2 w-25 mt-4"
                         >
                             <span className="flex-grow text-center mt-1">create</span>
                             <CheckIcon className="w-7 h-full bg-green-600 ml-2 rounded-r-lg" />
                         </button>
                    </div>
                </form>
            </div>
        </div>
    );

};

AddDataTemplate.propTypes = {
    type: PropTypes.string.isRequired,
};

export default AddDataTemplate;