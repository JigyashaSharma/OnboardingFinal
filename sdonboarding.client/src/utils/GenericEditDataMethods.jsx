/**This file contains methods that can be used by EditDataTemplate.
 */

import { ObjectTypes } from './GenericObjects';

export const genericEditDataMethods = {

    /**
     * This function products initial details for EditDataTemplate based in type.
     * 
     * @param type : type of component(Customer, Product, Sale, Store)
    * @returns: labels: key: value pair
    *                   key: key that we need to display, corresponds to objects keys.
    *                   value: form labels name to be displayed.
     *           formElementType: Used to decide which element to use in AddDataTemplate form,
     */
    getEditObjectLabels(type) {
        if (type === ObjectTypes.Customer) {
            const labels = { name: 'Name', address: 'Address' };
            const formElementType = ['string', 'string'];
            return {
                labels, formElementType
            };

        } else if (type === ObjectTypes.Product) {
            const labels = { name: 'Name', price: 'Price' };
            const formElementType = ['string', 'number'];
            return {
                labels, formElementType
            };

        } else if (type === ObjectTypes.Store) {
            const labels = { name: 'Name', address: 'Address' };
            const formElementType = ['string', 'string']
            return {
                labels, formElementType
            };

        } else if (type === ObjectTypes.Sale) {
            const labels = { dateSold: 'DateSold', customer: 'Customer', product: 'Product', store: 'Store' };
            const formElementType = ['date', 'customer', 'product', 'store'];
            return {
                labels, formElementType
            };
        }
    },
    /**
     * @param objects: object array that we want to filter and put the required element at top.
     * @param id: id of element in objects which we want to display at top
     * @returns : an array with required element at top of the list.
     */
    filterData(objects, id) {
        if (Array.isArray(objects) && objects.length > 0) {

            let defaultObject = objects.find((object) => object.id === id);
            if (defaultObject) {
                let restObject = objects.filter((object) => object.id !== id);
                return([defaultObject, ...restObject]);
            } else {
                // Handle the case where no matching customer is found
                //console.error("Customer not found in the list.");
                throw error("Object not found in the list.");
                // Optionally, you can set an error state or show a message to the user
            }
        } else {
            // Handle the case where 'customers' is not a valid array or is empty
            //console.error("Invalid customers array or customers array is empty.");
            throw error("Invalid objects array or objects array is empty.");
            // Optionally, set an error state or show a message to the user
        }
    }
};
