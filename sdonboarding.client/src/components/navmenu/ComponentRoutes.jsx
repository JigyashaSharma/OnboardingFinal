/**
 * This files contain the Routes to navigate the items in Nav menu
 */

import { Routes, Route } from 'react-router-dom';
import { Home } from '../../pages/Home.jsx';
import Customer from '../../pages/Customer.jsx';
import Product from '../../pages/Product.jsx';
import Sale from '../../pages/Sale.jsx';
import Store from '../../pages/Store.jsx';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setError, setSuccess } from '../../redux/slices/commonSlice.js';
import { useEffect } from 'react';


export const ComponentRoutes = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setError(''));
        dispatch(setSuccess(''));
    }, [dispatch, location]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/products" element={<Product />} />
            <Route path="/stores" element={<Store />} />
            <Route path="/sales" element={<Sale />} />
        </Routes>
    );
};