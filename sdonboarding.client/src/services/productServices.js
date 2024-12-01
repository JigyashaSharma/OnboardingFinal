/**This file contains the Product apis to send request to servers and get the response.
 */

import axios from "axios";

export const productEndpoint = '/api/product';

const productApiServices = {
    async fetchProducts({ pageNumber, pageSize }) {
        try {
            if (!pageNumber || !pageSize) {
                throw new Error("Invalid parameters for product fetch request");
            }
            const url = `${productEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

            const response = await axios.get(url);
            let data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Fetch product failed!", error);
            }
            throw new Error("Fetch Product failed");
        }
    },
    async createProduct(newProduct) {
        try {
            if (!newProduct) {
                throw new Error("Invalid product object");
            }
            const response = await axios.post(productEndpoint, newProduct);
            return response.data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Failed to create product. ", error);
            }
            throw new Error("create product failed!! ");
        }
    },
    async editProduct(editProduct) {
        try {
            if (!editProduct || !editProduct.id) {
                throw new error("product id missing for delete request.");
            }
            const url = `${productEndpoint}/${editProduct.id}`;
            const response = await axios.put(url, editProduct);
            const data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Edit product failed!! ", error);
            }
            throw new Error("Edit product failed!!");
        }
    },
    async deleteProduct(id) {
        try {
            if (!id) {
                throw new error("product id missing for delete request.");
            }
            const url = `${productEndpoint}/${id}`;
            const response = await axios.delete(url);
            const data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Delete product failed!! ", error);
            }

            if (error.response) {
                // Extract the message from the error response
                const errorMessage = error.response.data.message || 'Unknown error occurred';
                throw new Error(`Delete product failed: ${errorMessage}`);
            } else {
                // In case there's no response (e.g., network error, etc.)
                throw new Error("Delete product failed due to network error or server not responding.");
            }
        }
    }
};

export default productApiServices;