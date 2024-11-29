/**This file contains the Store apis to send request to servers and get the response.
 */
import axios from "axios";

export const storeEndpoint = "/api/store";

const storeApiServices = {
    async fetchStores({ pageNumber = 1, pageSize = 10 }) {
        try {
            if (!pageNumber || !pageSize) {
                throw new Error("Invalid parameters for store fetch request");
            }
            const url = `${storeEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Http Error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Fetch store failed!! ", error);
            }
            throw new Error("Fetch store failed!!");
        }
        
    },
    async createStore(newStore) {
        try {
            if (!newStore) {
                throw new Error("Invalid store object");
            }
            const response = await axios.post(storeEndpoint, newStore);
            return response.data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Create store failed!! ", error);
            }
            throw new Error("Create store failed!!"); 
        }
        
    },
    async editStore(editStore) {
        try {
            if (!editStore || !editStore.id) {
                throw new error("Store id missing for delete request.");
            }
            const url = `${storeEndpoint}/${editStore.id}`;
            const response = await axios.put(url, editStore);
            const data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Edit store failed!! ", error);
            }
            throw new Error("Edit store failed!!");
        }
    },
    async deleteStore(id) {
        try {
            if (!id) {
                throw new error("Store id missing for delete request.");
            }
            const url = `${storeEndpoint}/${id}`;
            const response = await axios.delete(url);
            const data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Delete store failed!! ", error);
            }
            if (error.response) {
                // Extract the message from the error response
                const errorMessage = error.response.data.message || 'Unknown error occurred';
                throw new Error(`Delete store failed: ${errorMessage}`);
            } else {
                // In case there's no response (e.g., network error, etc.)
                throw new Error("Delete store failed due to network error or server not responding.");
            }
        }
    }
}

export default storeApiServices;
