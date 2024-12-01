/**This file containes state for common variables used accros different entities
 */

import { createSlice } from '@reduxjs/toolkit';

export const initialCustomerState = {
    errorMsg: '',                               // used to keep track of error in components
    successMsg: '',                             // used to keep track of success in components
}

export const commonSlice = createSlice({
    name: 'common',
    initialState: initialCustomerState,
    reducers: {
        setError(state, action) {
            state.errorMsg = action.payload;
        },
        setSuccess(state, action) {
            state.successMsg = action.payload;
        }
    },
});

export const {
    setError,
    setSuccess,
} = commonSlice.actions;

export default commonSlice.reducer;