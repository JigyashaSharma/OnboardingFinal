/**This file contains methods that can be used by AddDataTemplate.
 */
import { ObjectTypes } from './GenericObjects';


const genericAddDataMethods = {
    /**
     * This function provides initial details for AddDataTemplate based in type.
     * 
     * @param type : type of component(Customer, Product, Sale, Store)
     * @returns: initObject: initial object with default values to be used by the AddDataTemplate fo initial display.
     *           labels: this will display in AddDataTemplate form.
     *           formElementType: Used to decide which element to use in AddDataTemplate form,
     */
    getInitLocalObject(type){
        if (type === ObjectTypes.Customer) {
            const initObject = { id: 0, name: '', address: '' };
            const labels = { name: 'Name', address: 'Address' };
            const formElementType = ['string', 'string'];
            return {
                labels, initObject, formElementType
            };
        } else if (type === ObjectTypes.Product) {
            const initObject = { id: 0, name: '', price: '' };
            const labels = { name: 'Name', price: 'Price' };
            const formElementType = ['string', 'number'];
            return {
                labels, initObject, formElementType
            };

        } else if (type === ObjectTypes.Store) {
            const initObject = { id: 0, name: '', address: '' };
            const labels = { name: 'Name', address: 'Address' };
            const formElementType = ['string', 'string'];
            return {
                labels, initObject, formElementType
            };

        } else if (type === ObjectTypes.Sale) {
            const initObject = { id: 0, dateSold: '', customerId:0, customer:'', productId:0, product: '', storeId: '', store: '' };
            const labels = { dateSold: 'Date sold', customer: 'Customer', product:'Product', store:'Store' };
            const formElementType = ['date', 'customer', 'product', 'store'];
            return {
                labels, initObject, formElementType
            };

        }
    },
    

}

export default genericAddDataMethods;