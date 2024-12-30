/**This file containes state for customer enitity.
 */

import { createSlice } from '@reduxjs/toolkit';

export const initialCustomerState = {
    customers: [],                             //current fetched customers data
    isAddCustomerVisible: false,               //used to toggle the visibility of AddCustomer component
    pageSize: 10,                               // used for pagination
    currentPage: 1,                             // used for pagination
    totalCount: 0,                              // used for pagination, keeps track of total number of products and 
                                                // displaying the page navigation at bottom of customer details.
    customerToEdit: null,                       //keep the track of customer record to edit
    isEditCustomerVisible: false,               //used to toggle the visibility of EditCustomer component
    customerToDelete: null,                     //keep the track of customer record to Delete
    isDeleteCustomerVisible: false,             //used to toggle the visibility of DeleteCustomer component
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState: initialCustomerState,
    reducers: {
        setCustomers(state, action) {
            state.customers = action.payload;
        },
        toggleAddVisibilityCustomer(state, action) {
            state.isAddCustomerVisible = action.payload;
        },
        setPageSizeCustomer(state, action) {
            state.pageSize = action.payload;
        },
        setCurrentPageCustomer(state, action) {
            state.currentPage = action.payload;
        },
        setTotalCountCustomer(state, action) {
            state.totalCount = action.payload;
        },
        setEditCustomer(state, action) {
            state.customerToEdit = action.payload;
        },
        toggleEditVisibilityCustomer(state, action) {
            state.isEditCustomerVisible = action.payload;
        },
        setDeleteCustomer(state, action) {
            state.customerToDelete = action.payload;
        },
        toggleDeleteVisibilityCustomer(state, action) {
            state.isDeleteCustomerVisible = action.payload;
        },
    },
});

export const {
    setCustomers,
    toggleAddVisibilityCustomer,
    setPageSizeCustomer,
    setCurrentPageCustomer,
    setTotalCountCustomer,
    setEditCustomer,
    toggleEditVisibilityCustomer,
    setDeleteCustomer,
    toggleDeleteVisibilityCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;