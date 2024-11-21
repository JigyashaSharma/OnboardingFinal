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
    }
}

export default genericMethods;