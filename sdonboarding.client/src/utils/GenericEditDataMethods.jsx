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
    }
};
