/**This file contains methods that can be used by DisplayDataTemplate.
 */
import { object } from 'prop-types';
import { ObjectTypes } from './GenericObjects';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import '../styles/display.css';

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
    /**
     * @param objectHeader
     * @returns the sort button for each header title
     */
    displaySortButton(objectHeader, handleSortAsc, handleSortDesc) {
        if (!objectHeader || !handleSortAsc || !handleSortDesc) {
            //alert('Table Titles missing.');
            if (process.env.NODE_ENV !== 'production') {
                console.error("Table Header are missing!!");
            }
            return;
        }
        return (
            Object.entries(objectHeader).map(([key, value]) => (
                <th key={value}>
                    <div className="space-x-2">
                        {value}

                        <button className="btnNew" onClick={() => handleSortAsc(key)}>
                            &#x25B2;
                        </button>
                        <button className="btnNew" onClick={() => handleSortDesc(key)}>
                            &#x25BC;
                        </button>
                    </div>
                </th>
            ))
        );
    },
    /**
     * Display one row of the entity
     * @param {any} object
     * @param {any} theader
     * @returns
     */
    displayEachRow(object, theader, type, handleEdit, handleDelete) {
        if (!object || !theader || !type || !handleEdit || !handleDelete) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Table Header or data is missing!!");
            }
            return;
        }
        return (
            <tr
                key={object.id}
                className='hover:bg-gray-200 transition-all duration-300 text-black'
            >
                {
              /*here value is actual key in object. We will find the value to display with it.
              Since object can have extra information.*/ }
                {Object.keys(theader).map((key) => {
                    if (key === 'dateSold') {
                        return (<td key={key}>{object[key].split('T')[0]}</td>);     //trimming T part from date
                    } if (key === 'price' && type === 'Product') {
                        return (<td key={key}>{`$${object[key]}`}</td>)
                    }
                    return (<td key={key}>{object[key]}</td>);
                })}
                <td>
                    <button className="flex items-center p-2  text-white bg-yellow-500 rounded-md
                                                focus:outline-none focus:ring-2 focus:ring-yellow   -300"
                        onClick={() => handleEdit(object)}>  {          /*this won't work: onClick={handleEdit(object)}'*/}
                        <PencilSquareIcon className="h-5 w-10" />
                        <span>EDIT</span>
                    </button>
                </td>
                <td >
                    <button className="flex items-center p-2 text-white bg-red-600" onClick={() => handleDelete(object)}>
                        <TrashIcon className="h-5 w-5" />
                        <span>DELETE</span>
                    </button>
                </td>
            </tr>
        );
    },
    /**
     *  Iterates over the entity data to display
     * @param objects
     * @param theader
     * @returns
     */
    displayData(objects, theader, type, handleEdit, handleDelete) {
        
        if (!objects || !Array.isArray(objects) || objects.length === 0 || !theader || !handleEdit || !handleDelete || !type) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Table Header/Data/functions missing!!");
            }
            const colSpan = theader && typeof theader === 'object' ? Object.keys(theader).length : 1;
            //can add more conditions here to give more intuitive message.
            return <tr><td colSpan={colSpan}>No data available. Please try again in sometime.</td></tr>;
        }

        //vslidate the objects has the required fields
        const valid = genericDisplayDataMethods.validateFetchResponse(objects, type);
        if (!valid) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(`Data fetched for ${type} do not have required fields. Please check the api is correct.`);
            }
            const colSpan = theader && typeof theader === 'object' ? Object.keys(theader).length : 1;
            //can add more conditions here to give more intuitive message.
            return <tr><td colSpan={colSpan}>Invalid response from server. Please try again in sometime.</td></tr>;
        }
        return (objects.map((object) => {
            return genericDisplayDataMethods.displayEachRow(object, theader, type, handleEdit, handleDelete);
        }));
    },
    /**
     * Validate server response. This assume the objects is an array
     */
    validateFetchResponse(objects, type) {
        const originalKeys = Object.keys(objects[0]);
        let requiredkeys = [];
        switch (type) {
            case ObjectTypes.Customer:
                // Check if each customer has the correct fields
                requiredkeys = ['id', 'name', 'address'];

                const validCustomer = requiredkeys.every(key => originalKeys.includes(key));

                if (!validCustomer) {
                    return false; // Early return to prevent updating state with invalid data
                } else {
                    return true;
                }
                break;
            case ObjectTypes.Product:
                // Check if each customer has the correct fields
                requiredkeys = ['id', 'name', 'price'];
                const validProduct = requiredkeys.every(key => originalKeys.includes(key));

                if (!validProduct) {
                    return false; // Early return to prevent updating state with invalid data
                } else {
                    return true;
                }
                break;
            case ObjectTypes.Store:
                // Check if each customer has the correct fields
                requiredkeys = ['id', 'name', 'address'];
                const validStore = requiredkeys.every(key => originalKeys.includes(key));

                    if (!validStore) {
                        return false; // Early return to prevent updating state with invalid data
                    } else {
                        return true;
                    }
                break;
            case ObjectTypes.Sale:
                // Check if each sale has the correct fields
                requiredkeys = ['id', 'customerId', 'customer', 'productId', 'product', 'storeId', 'store'];
                const validSale = requiredkeys.every(key => originalKeys.includes(key));

                    if (!validSale) {
                        return false; // Early return to prevent updating state with invalid data
                    } else {
                        return true;
                    }
                break;
            default:

        }
        
    },
};