/**This file containes state for store enitity.
 */

import { createSlice } from '@reduxjs/toolkit';

export const initialStoreState = {
    stores: [],                                 //current fetched stores data
    isAddStoreVisible: false,                   //used to toggle the visibility of Add Store component
    pageSize: 10,                               // used for pagination
    currentPage: 1,                             // used for pagination
    totalCount: 0,                              // used for pagination
    storeToEdit: null,                          //keep the track of store record to edit
    isEditStoreVisible: false,                  //used to toggle the visibility of Edit Store component
    storeToDelete: null,                        //keep the track of store record to Delete
    isDeleteStoreVisible: false,                //used to toggle the visibility of Delete Store component
};

export const storeSlice = createSlice({
    name: 'store',
    initialState: initialStoreState,
    reducers: {
        setStores(state, action) {
            state.stores = action.payload;
        },
        setPageSizeStore(state, action) {
            state.pageSize = action.payload;
        },
        setCurrentPageStore(state, action) {
            state.currentPage = action.payload;
        },
        setTotalCountStore(state, action) {
            state.totalCount = action.payload;
        },
        toggleAddVisibilityStore(state, action) {
            state.isAddStoreVisible = action.payload;
        },
        setEditStore(state, action) {
            state.storeToEdit = action.payload;
        },
        toggleEditVisibilityStore(state, action) {
            state.isEditStoreVisible = action.payload;
        },
        setDeleteStore(state, action) {
            state.storeToDelete = action.payload;
        },
        toggleDeleteVisibilityStore(state, action) {
            state.isDeleteStoreVisible = action.payload;
        },
    },
});

export const {
    setStores,
    setPageSizeStore,
    setCurrentPageStore,
    setTotalCountStore,
    toggleAddVisibilityStore,
    setEditStore,
    toggleEditVisibilityStore,
    setDeleteStore,
    toggleDeleteVisibilityStore,
} = storeSlice.actions;


export default storeSlice.reducer;
