/**This file contains the Customer apis to send request to servers and get the response.
 */

import axios from 'axios';
const customerEndpoint = "/api/customer";

const customerApiServices = {
    async fetchCustomers({ pageNumber = 1, pageSize = 10 }) {
        try {
            const url = `${customerEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Http Error! status: ${response.status}');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching items: ", error);
            throw error;
        }
    },
    async createCustomer(newCustomer) {
        try {
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
            console.error("Error creating items: ", error);
            throw error;
        }
    },
    async editCustomer(editCustomer) {
        try {
            const url = `${customerEndpoint}/${editCustomer.id}`;
            const response = await axios.put(url, editCustomer);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Edit customer failed!! ", error);
            throw error;
        }
    },
    async deleteCustomer(id) {
        try {
            const url = `${customerEndpoint}/${id}`;
            const response = await axios.delete(url);
            const data = response.data;
            return data;
        } catch (error) {
            console.error("Delete customer failed!! ", error);
            throw error;
        }
    }
}

export default customerApiServices;