/**This file containes state for sale enitity.
 */

import { createSlice } from '@reduxjs/toolkit';

export const initialSaleState = {
    sales: [],                                  //current fetched sales data
    isAddSaleVisible: false,                    //used to toggle the visibility of Add Sale component
    pageSize: 10,                               // used for pagination
    currentPage: 1,                             // used for pagination
    totalCount: 0,                              // used for pagination
    saleToEdit: null,                           //keep the track of sale record to edit
    isEditSaleVisible: false,                   //used to toggle the visibility of Edit Sale component
    saleToDelete: null,                         //keep the track of sale record to Delete
    isDeleteSaleVisible: false,                 //used to toggle the visibility of Delete Sale component
};

export const saleSlice = createSlice({
    name: 'sale',
    initialState: initialSaleState,
    reducers: {
        setSales(state, action) {
            state.sales = action.payload;
        },
        setPageSizeSale(state, action) {
            state.pageSize = action.payload;
        },
        setCurrentPageSale(state, action) {
            state.currentPage = action.payload;
        },
        setTotalCountSale(state, action) {
            state.totalCount = action.payload;
        },
        toggleAddVisibilitySale(state, action) {
            state.isAddSaleVisible = action.payload;
        },
        setEditSale(state, action) {
            state.saleToEdit = action.payload;
        },
        toggleEditVisibilitySale(state, action) {
            state.isEditSaleVisible = action.payload;
        },
        setDeleteSale(state, action) {
            state.saleToDelete = action.payload;
        },
        toggleDeleteVisibilitySale(state, action) {
            state.isDeleteSaleVisible = action.payload;
        },
    },
});

export const {
    setSales,
    setPageSizeSale,
    setCurrentPageSale,
    setTotalCountSale,
    toggleAddVisibilitySale,
    setEditSale,
    toggleEditVisibilitySale,
    setDeleteSale,
    toggleDeleteVisibilitySale,
} = saleSlice.actions;


export default saleSlice.reducer;
