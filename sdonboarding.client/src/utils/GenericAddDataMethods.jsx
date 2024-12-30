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
    getInitLocalObject(type) {
        let initObject, labels, formElementType;
        console.log(type);
        switch (type) {
            case ObjectTypes.Customer:
                initObject = { id: 0, name: '', address: '' };
                labels = { name: 'Name', address: 'Address' };
                formElementType = ['string', 'string'];
                return {
                    labels, initObject, formElementType
                };
                break;
            case ObjectTypes.Product:
                initObject = { id: 0, name: '', price: '' };
                labels = { name: 'Name', price: 'Price' };
                formElementType = ['string', 'number'];
                return {
                    labels, initObject, formElementType
                };
                break;
            case ObjectTypes.Store:
                initObject = { id: 0, name: '', address: '' };
                labels = { name: 'Name', address: 'Address' };
                formElementType = ['string', 'string'];
                return {
                    labels, initObject, formElementType
                };
                break;
            case ObjectTypes.Sale:
                initObject = { id: 0, dateSold: '', customerId: 0, customer: '', productId: 0, product: '', storeId: '', store: '' };
                labels = { dateSold: 'Date sold', customer: 'Customer', product: 'Product', store: 'Store' };
                formElementType = ['date', 'customer', 'product', 'store'];
                return {
                    labels, initObject, formElementType
                };
                break;
            default:
                if (process.env.NODE_ENV !== 'production') {
                    console.error("type argument not valid in GenericAddDataMethods.getInitLocalObject"); // Log in development or staging environments
                }
                return {
                    labels: null, initObject: null, formElementType: null
                    };
        }
    },
    /**
     * @param  e : event arg passed from the form
     * @param  handleListFunction : function to callback
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

}

export default genericAddDataMethods;