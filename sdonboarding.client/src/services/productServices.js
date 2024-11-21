/**This file contains the Product apis to send request to servers and get the response.
 */

import axios from "axios";

export const productEndpoint = '/api/product';

const productApiServices = {
    async fetchProducts({ pageNumber, pageSize }) {
        try {
            const url = `${productEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

            const response = await axios.get(url);
            let data = response.data;
            return data;
        } catch (error) {
            console.error("Fetch product failed!", error);
            throw error;
        }
    },
    async createProduct(newProduct) {
        try {
            const response = await axios.post(productEndpoint, newProduct);
            return response.data;
        } catch (error) {
            console.error("create product failed!! ", error);
            throw error;
        }
    },
    async editProduct(editProduct) {
        try {
            const url = `${productEndpoint}/${editProduct.id}`;
            const response = await axios.put(url, editProduct);
            const data = response.data;
            return data;
        } catch (error) {

            console.error("Edit product failed!! ", error);
            throw error;
        }
    },
    async deleteProduct(id) {
        try {
            const url = `${productEndpoint}/${id}`;
            const response = await axios.delete(url);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Delete product failed!! ", error);
            throw error;
        }
    }
};

export default productApiServices;