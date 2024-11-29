/**This files contains the common methods that can be used by different Templates.
 */

import customerApiServices from '../services/customerServices';
import productApiServices from '../services/productServices';
import storeApiServices from '../services/storeServices';

const genericMethods = {

    //Used to fetch all the customers records. Currently used to create and edit sale.
    async fetchCustomerDetails() {
        try {
            //getting totalCount
            let customersData = await customerApiServices.fetchCustomers({
                pageNumber: 1,
                pageSize: 1,
            });
            const totalCount = customersData.totalCount;

            //fetch again all the customer
            customersData = await customerApiServices.fetchCustomers({
                pageNumber: 1,
                pageSize: totalCount,
            });

            return customersData.dtos;

        } catch (errors) {
            console.log(errors);
            throw errors;
        }
    },
    //Used to fetch all the products records. Currently used to create and edit sale.
    async fetchProductDetails() {
        try {
            //getting totalCount
            let productsData = await productApiServices.fetchProducts({
                pageNumber: 1,
                pageSize: 1,
            });
            const totalCount = productsData.totalCount;

            //fetch again all the customer
            productsData = await productApiServices.fetchProducts({
                pageNumber: 1,
                pageSize: totalCount,
            });

            return productsData.dtos;

        } catch (errors) {
            console.log(errors);
            throw errors;
        }
    },
    //Used to fetch all the stores records. Currently used to create and edit sale.
    async fetchStoreDetails() {
        try {
            //getting totalCount
            let storesData = await storeApiServices.fetchStores({
                pageNumber: 1,
                pageSize: 1,
            });
            const totalCount = storesData.totalCount;

            //fetch again all the customer
            storesData = await storeApiServices.fetchStores({
                pageNumber: 1,
                pageSize: totalCount,
            });

            return storesData.dtos;

        } catch (errors) {
            console.log(errors);
            throw errors;
        }
    },
    /* Adding this validation here, but it can be in separate validation file if we have lot of them.*/
    validateNameInput(name) {
        // Regex to validate name (letters, spaces, hyphens, no leading/trailing spaces)
        const namePattern = /^[A-Za-z]+([ -][A-Za-z]+)*$/;

        // Trim leading and trailing spaces before validation
        if (name.trim() === name && namePattern.test(name)) {
            // Clear any previous custom validation message
            return 1;
        } else {
            // Set a custom validation message if the name is invalid
            //event.target.setCustomValidity('Please enter a valid name (letters, spaces, apostrophes, hyphens only, no leading or trailing spaces).');
            return 0;
        }
    },
    validateAddressInput(address) {
        // Regex to validate name (letters, spaces, apostrophes, hyphens, no leading/trailing spaces)
        const addressPattern = /^[A-Za-z0-9]+((([,-.][\s])|[,-.]|[\s])[A-Za-z0-9]+)*$/;

        // Trim leading and trailing spaces before validation
        if (address.trim() === address && addressPattern.test(address)) {
            // Clear any previous custom validation message
            return 1;
        } else {
            // Set a custom validation message if the name is invalid
            //event.target.setCustomValidity('Please enter a valid name (letters, spaces, apostrophes, hyphens only, no leading or trailing spaces).');
            return 0;
        }
    },
    validateProductStoreNameInput(name) {
        // Regex to validate name (letters, spaces, dot, hyphens, no leading/trailing spaces)
        const namePattern = /^[A-Za-z0-9]+((([-.][\s])|[-.]|[\s])[A-Za-z0-9]+)*$/;

        // Trim leading and trailing spaces before validation
        if (name.trim() === name && namePattern.test(name)) {
            // Clear any previous custom validation message
            return 1;
        } else {
            // Set a custom validation message if the name is invalid
            //event.target.setCustomValidity('Please enter a valid name (letters, spaces, dot, hyphens only, no leading or trailing spaces).');
            return 0;
        }
    },
    validateInputValuesOnSubmit(type) {
        let fromValid = true;

        if (type === 'Customer') {
            const nameInput = document.querySelector('input[type="text"][name="name"]');
            const addressInput = document.querySelector('input[type="text"][name="address"]');

            let check = genericMethods.validateNameInput(nameInput.value);
            if (check === 0) {
                nameInput.setCustomValidity('Please enter a valid name (letters, spaces, hyphens only, no leading or trailing spaces).');
                fromValid = false;
                nameInput.reportValidity();
                return fromValid;
            } else {
                nameInput.setCustomValidity('');
            }

            check = genericMethods.validateAddressInput(addressInput.value);
            if (check === 0) {
                addressInput.setCustomValidity('Please enter a valid address (alphanumeric then space, comma, dot, hyphens with more alpha numeric, no leading or trailing spaces).');
                fromValid = false;
                addressInput.reportValidity();
                return fromValid;
            } else {
                addressInput.setCustomValidity('');
            }
        } else if (type === 'Product') {
            const nameInput = document.querySelector('input[type="text"][name="name"]');

            let check = genericMethods.validateProductStoreNameInput(nameInput.value);
            if (check === 0) {
                nameInput.setCustomValidity('Please enter a valid name (alphanumeric, spaces, dot, hyphens only, no leading or trailing spaces).');
                fromValid = false;
                nameInput.reportValidity();
                return fromValid;
            } else {
                nameInput.setCustomValidity('');
            }
        } else if (type === 'Store') {
            const nameInput = document.querySelector('input[type="text"][name="name"]');
            const addressInput = document.querySelector('input[type="text"][name="address"]');

            let check = genericMethods.validateProductStoreNameInput(nameInput.value);
            if (check === 0) {
                nameInput.setCustomValidity('Please enter a valid name (alphanumeric, spaces, hyphens only, no leading or trailing spaces).');
                fromValid = false;
                nameInput.reportValidity();
                return fromValid;
            } else {
                nameInput.setCustomValidity('');
            }

            check = genericMethods.validateAddressInput(addressInput.value);
            if (check === 0) {
                addressInput.setCustomValidity('Please enter a valid address (start alphanumeric word then (space/comma/dot/hyphens/alpha numeric), no leading or trailing spaces).');
                fromValid = false;
                addressInput.reportValidity();
                return fromValid;
            } else {
                addressInput.setCustomValidity('');
            }
        }

        return fromValid;
    },
    /**
     * @param params : list of variables that we want to validate if they have proper value.
     * @returns : true if the list has values else false.
     */
    handleMissingField(params) {
        // Loop through the params object and check for missing values
        const valid = Object.values(params).map((value) => {
            if(!value) {
                // In development or staging environments, log an error with missing field details
                if (process.env.NODE_ENV !== 'production') {
                    const error = new Error("Missing required parameter(s)");
                    console.error("Missing required parameter(s)", error.stack);
                }
                //returning
                return false; // this tell error
            }
        });

        // Return false if all required fields are present
        return !valid.includes(false);
    },
    /**
     * @param  key
     * @param localObject
     * @param objectOptionList
     * @param objectType
     * @param handleListFunction
     * @returns: Select tag with list of objectOptionList passed example: customer/product/store
     */
    generateSelect(key, localObject, objectOptionList, objectType, handleListFunction) {
        if (!key || !localObject || !objectOptionList || !objectType || !handleListFunction) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Missing required parameter(s) in generateSelect function");
            }
            //returning disabled select if any parameter is not passed
            return <select disabled></select>;
        }
        return (
            <select
                name={key}
                id={key}
                value={localObject[key]}
                onChange={(e) => this.handleSelectChange(e, handleListFunction)}
                className="w-full px-4 py-2 border rounded text-gray-400"
                required
            >
                <option value="" disabled></option>
                {objectOptionList && objectOptionList.length > 0 ? (
                    objectOptionList.map((object) => {
                        return (
                            <option key={object.id}
                                value={object.name}
                                data-id={object.id}
                                data-type={objectType}
                            >
                                {object.name}
                            </option>)
                    })) : (
                    <option disabled>No options available</option>
                )}

            </select>
        );
    },
    /**
     * @param e: event argsfrom form
     * @param handleListFunction : function to call.
     */
    handleSelectChange(e, handleListFunction) {
        // Check if selectedOptions exists and has at least one option
        const selectedOption = e.target.selectedOptions[0];

        if (selectedOption) {
            // If selectedOption exists, call handleListFunction with the selected data
            handleListFunction(selectedOption.dataset.id, selectedOption.value, selectedOption.dataset.type);
        } else {
            // In production, do not log to the console
            if (process.env.NODE_ENV !== 'production') {
                console.error("No option selected"); // Log in development or staging environments
            }

            // Or in prod, display a user-friendly error message (e.g., toast or alert) or may not do anything
            //adding alert for now
            alert("Please select a valid option"); // Or we can set an error state and display an inline error message
        }
    },
    /**
     * @param key : key to set for tag id, name.
     * @param object : for which we are creating tag, will give default value.
     * @param handleInputChange : function to call onChange.
     * @returns : returns input tag for Date.
     */
    getDateDisplay(key, object, handleInputChange) {
        if (!key || !object || !handleInputChange) {
            // In production, do not log to the console
            if (process.env.NODE_ENV !== 'production') {
                console.error("Date not proper."); // Log in development or staging environments
            }

            // Or in prod, display a user-friendly error message (e.g., toast or alert) or may not do anything
            //adding alert for now
            alert("Date value not proper"); // Or we can set an error state and display an inline error message
        }
        return (
            < input
                type="date"
                name={key}
                id={key}
                value={object[key].split('T')[0]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded text-gray-500"
            />
        );
    },
    /**
     * @param key : key to set for tag id, name.
     * @param object : for which we are creating tag, will give default value.
     * @param handleInputChange : function to call onChange.
     * @returns : returns input tag for Text.
     */
    getTextInputDisplay(key, object, labels, handleInputChange) {
        if (!key || !object || !labels || !handleInputChange) {
            // In production, do not log to the console
            if (process.env.NODE_ENV !== 'production') {
                console.error("Text not proper."); // Log in development or staging environments
            }

            // Or in prod, display a user-friendly error message (e.g., toast or alert) or may not do anything
            //adding alert for now
            alert("Text value not proper"); // Or we can set an error state and display an inline error message
        }
        return (
            <input
                type="text"
                name={key}
                id={key}
                value={object[key]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded text-gray-400"
                placeholder={`Enter ${labels[key]}`}
                required
            />
        );
    },
    /**
     * @param key : key to set for tag id, name.
     * @param object : for which we are creating tag, will give default value.
     * @param handleInputChange : function to call onChange.
     * @returns : returns input tag for N umber.
     */
    getNumberDisplay(key, object, labels, handleInputChange) {
        if (!key || !object || !labels || !handleInputChange) {
            // In production, do not log to the console
            if (process.env.NODE_ENV !== 'production') {
                console.error("Number not proper."); // Log in development or staging environments
            }

            // Or in prod, display a user-friendly error message (e.g., toast or alert) or may not do anything
            //adding alert for now
            alert("Number value not proper"); // Or we can set an error state and display an inline error message
        }
        return (
            <input
                type="number"
                name={key}
                id={key}
                value={object[key]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded text-gray-400"
                step="any"
                min="0"
                placeholder={`Enter ${labels[key]}`}
                required
            />
        );
    },
}

export default genericMethods;