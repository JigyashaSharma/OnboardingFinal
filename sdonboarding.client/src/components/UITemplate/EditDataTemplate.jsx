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
    const { labels, formElementType } = genericEditDataMethods.getEditObjectLabels(type);

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

                /*sorting these objects so that default value is at top*/
                /*this will help in displaying them at top*/

                let defaultObject = customers.find((customer) => customer.id === localObject.customerId);
                let restObject = customers.filter((customer) => customer.id !== localObject.customerId);
                setLocalCustomers([defaultObject, ...restObject]);

                defaultObject = products.find((product) => product.id === localObject.productId);
                restObject = products.filter((product) => product.id !== localObject.productId);
                setLocalProducts([defaultObject, ...restObject]);

                defaultObject = stores.find((store) => store.id === localObject.storeId);
                restObject = stores.filter((store) => store.id !== localObject.storeId);
                setLocalStores([defaultObject, ...restObject]);
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
        const { name, value } = e.target;

        e.target.setCustomValidity(''); //Needed to remove the custom message in edit form after changing input
        setLocalObject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //handle the active dropdown value
    const handleActiveChange = (e) => {
        setLocalObject((prevState) => ({
            ...prevState,
            active: e.target.value === 'true'
        }));
    };

    /**List Change handler, it will update localObject with ID and name as we select it from the dropdown
     * currently relevant for Sales only
    */
    const handleListChange = (id, name, type) => {
        const selectedType = type;
        if (selectedType === 'Customer') {
            setLocalObject((prevState) => ({
                ...prevState,
                customerId: id,
                customer: name,
            }))
        } else if (selectedType === 'Product') {
            setLocalObject((prevState) => ({
                ...prevState,
                productId: id,
                product: name,
            }))
        } else if (selectedType === 'Store') {
            setLocalObject((prevState) => ({
                ...prevState,
                storeId: id,
                store: name,
            }))
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
            console.log("Form is invalid");
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
                        {Object.keys(labels).map((key, index) => {

                            return (
                                <div key={key}>
                                    <label htmlFor={key} className='mt-2'>{labels[key]}</label>
                                    {formElementType[key] === 'boolean' ? (
                                        // Render dropdown for boolean fields (like 'active')
                                        <select
                                            name={key}
                                            id={key}
                                            value={localObject[key].toString()}
                                            onChange={handleActiveChange}
                                            className="w-full px-4 py-2 border rounded text-gray-500"
                                        >
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                    ) : formElementType[index] === 'customer' ? (
                                        // Render dropdown for array
                                        <select
                                            name={key}
                                            id={key}
                                            value={localObject[key]}
                                            onChange={(e) => {
                                                const selectedOption = e.target.selectedOptions[0];             //This will help fetch custom data from options
                                                handleListChange(selectedOption.dataset.id, selectedOption.value, selectedOption.dataset.type);
                                            }}
                                            className="w-full px-4 py-2 border rounded text-gray-500"
                                        >

                                            {localCustomers && localCustomers.map((customer) => (
                                                    <option key={customer.id}
                                                        value={customer.name}
                                                        data-id={customer.id}           // Custom data attribute for customer ID, these will get passed to handleListChange
                                                        data-type='Customer'
                                                    >
                                                        {customer.name}
                                                </option>
                                            ))}

                                        </select>
                                    ) : formElementType[index] === 'product' ? (
                                        // Render dropdown for array
                                        <select
                                            name={key}
                                            id={key}
                                            value={localObject[key]} 
                                            onChange={(e) => {
                                                const selectedOption = e.target.selectedOptions[0];
                                                handleListChange(selectedOption.dataset.id, selectedOption.value, selectedOption.dataset.type);
                                            }}
                                            className="w-full px-4 py-2 border rounded text-gray-500"
                                        >
                                            {localProducts && localProducts.map((product) => (
                                                <option key={product.id}
                                                    value={product.name}
                                                    data-id={product.id}           // Custom data attribute for product ID, these will get passed to handleListChange
                                                    data-type='Product'
                                                >
                                                    {product.name}
                                                </option>))}

                                        </select>
                                    ) : formElementType[index] === 'store' ? (
                                        // Render dropdown for array
                                        <select
                                            name={key}
                                            id={key}
                                            value={localObject[key]}
                                            onChange={(e) => {
                                                const selectedOption = e.target.selectedOptions[0];   
                                                handleListChange(selectedOption.dataset.id, selectedOption.value, selectedOption.dataset.type);
                                            }}
                                            className="w-full px-4 py-2 border rounded text-gray-500"
                                        >
                                            {localStores && localStores.map((store) => (
                                                <option key={store.id}
                                                    value={store.name}
                                                    data-id={store.id}                  // Custom data attribute for store ID, these will get passed to handleListChange
                                                    data-type='Store'
                                                >
                                                    {store.name}
                                                </option>))}

                                        </select>
                                    ) : formElementType[index] === 'date' && !isNaN(Date.parse(localObject[key])) &&
                                         (localObject[key].includes('-') || localObject[key].includes('/')) ? (
                                         // Render date input and removing the T part
                                          < input
                                            type="date"
                                            name={ key }
                                            id={ key }
                                            value={localObject[key].split('T')[0]}
                                            onChange={ handleInputChange }
                                            className="w-full px-4 py-2 border rounded text-gray-500"
                                            />
                                    ) : (
                                          // Render text input for other fields (like 'name', 'price')
                                        <input
                                            type="text"
                                            name={key}
                                            id={key}
                                            value={localObject[key]}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded text-gray-500"
                                            placeholder={`Enter ${labels[key]}`}
                                        />
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