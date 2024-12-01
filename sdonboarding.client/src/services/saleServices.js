/**This file contains the Sale apis to send request to servers and get the response.
 */

import axios from "axios";

export const saleEndpoint = "/api/sale";

const saleApiServices = {
    async fetchSales({ pageNumber = 1, pageSize = 10 }) {
        try {
            if (!pageNumber || !pageSize) {
                throw new Error("Invalid parameters for sale fetch request");
            }
            const url = `${saleEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
            const response = await axios.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Fetch sale failed!! ", error);
            }
            throw new Error("Fetch sale failed!!");
        }

    },
    async createSale(newSale) {
        try {
            if (!newSale) {
                throw new Error("Invalid sale object");
            }
            const response = await axios.post(saleEndpoint, newSale);
            return response.data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Create sale failed!! ", error);
            }
            throw new Error("Create sale failed!!");
        }

    },
    async editSale(editSale) {
        try {
            if (!editSale || !editSale.id) {
                throw new error("Sale id missing for delete request.");
            }
            const url = `${saleEndpoint}/${editSale.id}`;
            const response = await axios.put(url, editSale);
            const data = response.data;
            return data;
        } catch (error) {

            if (process.env.NODE_ENV !== 'production') {
                console.error("Edit sale failed!! ", error);
            }
            throw new Error("Edit sale failed!!");
        }
    },
    async deleteSale(id) {
        try {
            if (!id) {
                throw new error("Sale id missing for delete request.");
            }
            const url = `${saleEndpoint}/${id}`;
            const response = await axios.delete(url);
            const data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Create sale failed!! ", error);
            }
            if (error.response) {
                // Extract the message from the error response
                const errorMessage = error.response.data.message || 'Unknown error occurred';
                throw new Error(`Delete sale failed: ${errorMessage}`);
            } else {
                // In case there's no response (e.g., network error, etc.)
                throw new Error("Delete sale failed due to network error or server not responding.");
            }
        }
    }
}

export default saleApiServices;
