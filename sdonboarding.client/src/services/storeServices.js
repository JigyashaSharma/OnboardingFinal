/**This file contains the Store apis to send request to servers and get the response.
 */
import axios from "axios";

export const storeEndpoint = "/api/store";

const storeApiServices = {
    async fetchStores({ pageNumber = 1, pageSize = 10 }) {
        try {
            const url = `${storeEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Http Error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("fetch store failed!! ", error);
            throw error;
        }
        
    },
    async createStore(newStore) {
        try {
            const response = await axios.post(storeEndpoint, newStore);
            return response.data;
        } catch (error) {
            console.error("create store failed!! ", error);
            throw error; 
        }
        
    },
    async editStore(editStore) {
        try {
            const url = `${storeEndpoint}/${editStore.id}`;
            const response = await axios.put(url, editStore);
            const data = response.data;
            return data;
        } catch (error) {

            console.error("Edit store failed!! ", error);
            throw error;
        }
    },
    async deleteStore(id) {
        try {
            const url = `${storeEndpoint}/${id}`;
            const response = await axios.delete(url);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Delete store failed!! ", error);
            throw error;
        }
    }
}

export default storeApiServices;
