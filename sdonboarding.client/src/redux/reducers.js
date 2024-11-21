//combine the reducers
import { combineReducers } from 'redux';
import productReducer from './slices/productSlice';
import customerReducer from './slices/customerSlice';
import commonReducer from './slices/commonSlice';
import saleReducer from './slices/saleSlice';
import storeReducer from './slices/storeSlice';

const rootReducer = combineReducers({
    productDetails: productReducer,
    customerDetails: customerReducer,
    storeDetails: storeReducer,
    saleDetails: saleReducer,
    commonDetails: commonReducer,
});

export default rootReducer;
