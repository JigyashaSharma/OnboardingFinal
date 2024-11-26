/**This file contains methods that can be used by DisplayDataTemplate.
 */
import { ObjectTypes } from './GenericObjects';

export const genericDisplayDataMethods = {
    /**
     * This function details to DisplayDataTemplate based in type.
     * 
     * @param type : type of component(Customer, Product, Sale, Store)
     * @returns: tableHeader: key:value pair
     *                        key: this is the key that we need to display from the objects/entities data.
     *                        value: table column name to be displayed
     */
    getDisplayTableHeader(type) {
        if (type === ObjectTypes.Customer) {
            const customerTableHeader = { name: 'Name', address: 'Address' };
            return customerTableHeader;

        } else if (type === ObjectTypes.Product) {
            const productTableHeader = {name: 'Name', price: 'Price' };
            return productTableHeader;
        } else if (type === ObjectTypes.Store) {
            const storeTableHeader = { name: 'Name', address: 'Address' };
            return storeTableHeader;
        } else if (type === ObjectTypes.Sale) {
            const saleTableHeader = { customer: 'Customer', product: 'Product', store: 'Store', dateSold: 'Date Sold' };
            return saleTableHeader;
        }
    },
};