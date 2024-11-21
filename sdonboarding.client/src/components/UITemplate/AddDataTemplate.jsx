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
    const { labels, initObject, formElementType } = genericAddDataMethods.getInitLocalObject(type);

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
                setLocalCustomers(customers);
                setLocalProducts(products);
                setLocalStores(stores);

                //initialize localObject with proper values so that if there is no change triggered(onChange)
                //we have the default first value to create the sale with
                /*setLocalObject((prevState) => ({
                    ...prevState,
                    customerId: customers[0].id,
                    customer: customers[0].name,
                    productId: products[0].id,
                    product: products[0].name,
                    storeId: stores[0].id,
                    store: stores[0].name,
                }))*/
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
        e.target.setCustomValidity('');
        setLocalObject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    /*handle the product active dropdown value*/
    const handleActiveChange = (e) => {
        setLocalObject((prevState) => ({
            ...prevState,
            active: e.target.value === 'true'
        }));
    };

    /*List Change handler, it will update localObject with ID and name as we select it from the dropdown*/
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

    const handleCancel = () => {
        setLocalObject(null);
        handleAddCancel();
    };

    
    //handle the form submit event
    const handleSubmit = async (e) => {
        e.preventDefault();

        const valid = genericMethods.validateInputValuesOnSubmit(type);

        //Call the parent function for edit request to server
        if (valid === true) {
            await handleAddSubmit();
            setLocalObject(null);
        } else {
            console.log("Form is invalid");
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
                        {Object.keys(labels).map((key, index) => {
                            return (
                                <div key={key} className="flex flex-col">
                                    <label htmlFor={key} className='mt-2'>{labels[key]}</label>
                                    {formElementType[index] === 'boolean' ? (
                                        // Render dropdown for boolean fields (like 'active')
                                        <select
                                            name={key}
                                            id={key}
                                            value={localObject[key].toString()}
                                            onChange={handleActiveChange}
                                            className="w-full px-4 py-2 border rounded text-gray-400"
                                            required
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
                                                    const selectedOption = e.target.selectedOptions[0];
                                                    handleListChange(selectedOption.dataset.id, selectedOption.value, selectedOption.dataset.type);
                                                }}
                                                className="w-full px-4 py-2 border rounded text-gray-400"
                                                required
                                            >
                                                <option value="" disabled></option>
                                                {localCustomers && localCustomers.map((customer) => {
                                                    console.log("name: ", customer.name)
                                                    return(
                                                        <option key={customer.id}
                                                            value={customer.name} 
                                                            data-id={customer.id}           // Custom data attribute for customer ID, these will get passed to handleListChange
                                                            data-type='Customer'
                                                        >
                                                            {customer.name}
                                                        </option>)
                                                })}

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
                                                className="w-full px-4 py-2 border rounded text-gray-400"
                                                required
                                                >
                                                    <option value="" disabled></option>
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
                                                value={localObject[key]} //setting here
                                                        onChange={(e) => {
                                                            const selectedOption = e.target.selectedOptions[0];
                                                            handleListChange(selectedOption.dataset.id, selectedOption.value, selectedOption.dataset.type);
                                                        }}
                                                className="w-full px-4 py-2 border rounded text-gray-400"
                                                required
                                            >
                                                <option value="" disabled></option>
                                                {localStores &&localStores.map((store) => (
                                                    <option key={store.id}
                                                        value={store.name}
                                                        data-id={store.id}           // Custom data attribute for store ID, these will get passed to handleListChange
                                                        data-type='Store'
                                                    >
                                                        {store.name}
                                                    </option>))}

                                            </select>
                                                ) : formElementType[index] === 'date' ? (
                                        // Render date input if the field is a date
                                        <input
                                            type="date"
                                            name={key}
                                            id={key}
                                            value={localObject[key]}
                                            onChange={handleInputChange}
                                            className="w-1/2 px-4 py-2 border rounded text-gray-400"
                                            required

                                        />
                                    ) : formElementType[index] === 'number' ? (
                                        // Render number input if the field is a number(Price)
                                        <input
                                            type="number"
                                            name={key}
                                            id={key}
                                            value={localObject[key]}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded text-gray-400"
                                            step="any" 
                                            min="0"
                                            placeholder={`Enter ${labels[key]}`}
                                            required

                                        />
                                    ) : (
                                        // Render text input for other fields (like 'name', Address)
                                        <input
                                            type="text"
                                            name={key}
                                            id={key}
                                            value={localObject[key]}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border rounded text-gray-400"
                                            placeholder={`Enter ${labels[key]}`}
                                            required
                                        />
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