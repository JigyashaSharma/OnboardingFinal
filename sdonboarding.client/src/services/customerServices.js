/**This file contains the Customer apis to send request to servers and get the response.
 */

import axios from 'axios';
const customerEndpoint = "/api/customer";

const customerApiServices = {
    async fetchCustomers({ pageNumber = 1, pageSize = 10 }) {
        try {
            if (!pageNumber || !pageSize) {
                throw new Error("Invalid parameters for customer fetch request");
            }
            const url = `${customerEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Http Error! status: ${response.status}');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Fetch customer failed!", error);
            }
            throw new Error("Fetch customer failed");
        }
    },
    async createCustomer(newCustomer) {
        try {
            if (!newCustomer) {
                throw new Error("Invalid customer object");
            }
            const response = await fetch(
                customerEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCustomer)
            });

            if (!response.ok) {
                throw new Error('Http Error! status: ${response.status}');
            }
            const data = await response.json();
            return data;
            
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Create customer failed!! ", error);
            }
            throw new Error("Create customer failed!!");
        }
    },
    async editCustomer(editCustomer) {
        try {
            if (!editCustomer || !editCustomer.id) {
                throw error("Customer id missing for edit request.");
            }
            const url = `${customerEndpoint}/${editCustomer.id}`;
            const response = await axios.put(url, editCustomer);
            const data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Edit customer failed!! ", error);
            }
            throw new Error("Edit customer failed!!");
        }
    },
    async deleteCustomer(id) {
        try {
            if (!id) {
                throw error("customer id missing for delete request.");
            }
            const url = `${customerEndpoint}/${id}`;
            const response = await axios.delete(url);
            const data = response.data;
            return data;
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error("Delete customer failed!! ", error);
            }
            if (error.response) {
                // Extract the message from the error response
                const errorMessage = error.response.data.message || 'Unknown error occurred';
                throw new Error(`Delete customer failed: ${errorMessage}`);
            } else {
                // In case there's no response (e.g., network error, etc.)
                throw new Error("Delete customer failed due to network error or server not responding.");
            }
        }
    }
}

export default customerApiServices;