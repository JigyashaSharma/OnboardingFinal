/**This file containes state for product enitity.
 */

import { createSlice } from '@reduxjs/toolkit';

export const initialProdState = {
    products: [],                               //current fetched products data
    isAddProductVisible: false,                 //used to toggle the visibility of AddProduct component
    pageSize: 10,                               // used for pagination
    currentPage: 1,                             // used for pagination
    totalCount: 0,                              // used for pagination
    productToEdit: null,                        //keep the track of product record to edit
    isEditProductVisible: false,                //used to toggle the visibility of EditProduct component
    productToDelete: null,                      //keep the track of product record to Delete
    isDeleteProductVisible: false,              //used to toggle the visibility of DeleteProduct component
};

export const productSlice = createSlice({
    name: 'product',
    initialState: initialProdState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        setErrorProduct(state, action) {
            state.errorMsg = action.payload;
        },
        setSuccessProduct(state, action) {
            state.successMsg = action.payload;
        },
        setPageSizeProduct(state, action) {
            state.pageSize = action.payload;
        },
        setCurrentPageProduct(state, action) {
            state.currentPage = action.payload;
        },
        setTotalCountProduct(state, action) {
            state.totalCount = action.payload;
        },
        toggleAddVisibilityProduct(state, action) {
            state.isAddProductVisible = action.payload;
        },
        setEditProduct(state, action) {
            state.productToEdit = action.payload;
        },
        toggleEditVisibilityProduct(state, action) {
            state.isEditProductVisible = action.payload;
        },
        setDeleteProduct(state, action) {
            state.productToDelete = action.payload;
        },
        toggleDeleteVisibilityProduct(state, action) {
            state.isDeleteProductVisible = action.payload;
        },
    },
});

export const {
    setProducts,
    setErrorProduct,
    setSuccessProduct,
    setPageSizeProduct,
    setCurrentPageProduct,
    setTotalCountProduct,
    toggleAddVisibilityProduct,
    setEditProduct,
    toggleEditVisibilityProduct,
    setDeleteProduct,
    toggleDeleteVisibilityProduct,
} = productSlice.actions;


export default productSlice.reducer;
