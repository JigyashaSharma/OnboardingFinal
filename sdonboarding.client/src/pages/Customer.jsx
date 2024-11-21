/**
 * This file is the base for Customer Page.
 * It calls all the different templates for it to have display, create, edit and delete funcationalities
 */

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import {
    toggleAddVisibilityCustomer, setTotalCountCustomer, setCustomers
} from '../redux/slices/customerSlice';
import { setError } from '../redux/slices/commonSlice';
import customerApiServices from '../services/customerServices';
import Message from '../components/Message';
import DisplayTableTemplate from '../components/UITemplate/DisplayDataTemplate';
import PaginationTemplate from '../components/UITemplate/PaginationTemplate';
import Footer from '../components/Footer';

const Customer = () => {
    const dispatch = useDispatch();

    const error = useSelector((state) => state.commonDetails.errorMsg);
    const success = useSelector((state) => state.commonDetails.successMsg);

    const addVisible = useSelector((state) => state.customerDetails.isAddCustomerVisible);

    const editVisible = useSelector((state) => state.customerDetails.isEditCustomerVisible);

    const deleteVisible = useSelector((state) => state.customerDetails.isDeleteCustomerVisible);

    const [loading, setLoading] = useState(true);

    //pagination objects in redux store
    const pageSize = useSelector((state) => state.customerDetails.pageSize);  // Default to 10
    const currentPage = useSelector((state) => state.customerDetails.currentPage);  // Start at page 1

    //function makes create customer(AddDataTemplate) component visible
    const handleNewCustomerClick = () => {
        dispatch(toggleAddVisibilityCustomer(true));
        console.log(addVisible); // Might log the old state due to async nature
    };

    //Fetch the customers details from server and set the customers and totalCount in redux store.
    const fetchCustomerDetails = useCallback(async () => {
        try {
            setLoading(true);
            const customersData = await customerApiServices.fetchCustomers({
                pageNumber: currentPage,
                pageSize: pageSize,
            });

            dispatch(setCustomers(customersData.dtos));
            dispatch(setTotalCountCustomer(customersData.totalCount));
            console.log("Customer state updated:");

        } catch (errors) {
            console.log(errors);
            dispatch(setError(`Failed to fetch customer ${errors}`));
            setTimeout(() => {
                dispatch(setError(''));
            }, 10000);
        } finally {
            setLoading(false);
        }
    }, [dispatch, pageSize, currentPage]);


    //This will refresh the customer page once add/edit/delete customer is done
    useEffect(() => {
        fetchCustomerDetails();
    }, [fetchCustomerDetails, addVisible, editVisible, deleteVisible]);

    if (loading) {
        return <p><em>Loading...</em></p>;
    }

    return (

        <div>
            {/* Background blur effect when modal is open */}
            <div className='transition-all duration-300 w-full mx-auto my-4 px-4'>

                <div className="flex flex-row">
                    {/* Button to Create Customer form */}
                    <button
                        className="btn btn-primary w-40 h-12 mb-5 mr-20"
                        onClick={handleNewCustomerClick}
                    >
                        New Customer
                    </button>
                    <Message type={error ? "error" : "success"} message={error ? error : success} className="mb-5" />
                </div>
                {/* Customer Table */}
                <DisplayTableTemplate type='Customer' />

                {/* Pagination - Aligning it properly */}
                <div className="mt-4 flex justify-left">
                    <PaginationTemplate type='Customer' />
                </div>
                <div className="py-4 ">
                    {/*Footer Component */}
                    {<Footer />}
                </div>
            </div>
        </div>
    );
};

export default Customer;