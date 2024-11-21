/**This file contains the Sale apis to send request to servers and get the response.
 */

import axios from "axios";

export const saleEndpoint = "/api/sale";

const saleApiServices = {
    async fetchSales({ pageNumber = 1, pageSize = 10 }) {
        try {
            const url = `${saleEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
            const response = await axios.get(url);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("fetch sale failed!! ", error);
            throw error;
        }

    },
    async createSale(newSale) {
        try {
            const response = await axios.post(saleEndpoint, newSale);
            return response.data;
        } catch (error) {
            console.error("create sale failed!! ", error);
            throw error;
        }

    },
    async editSale(editSale) {
        try {
            const url = `${saleEndpoint}/${editSale.id}`;
            const response = await axios.put(url, editSale);
            const data = response.data;
            return data;
        } catch (error) {

            console.error("Edit sale failed!! ", error);
            throw error;
        }
    },
    async deleteSale(id) {
        try {
            const url = `${saleEndpoint}/${id}`;
            const response = await axios.delete(url);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Delete sale failed!! ", error);
            throw error;
        }
    }
}

export default saleApiServices;
