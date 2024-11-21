/**
 * This file is the base for Store Page.
 * It calls all the different templates for it to have display, create, edit and delete funcationalities
 */

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import {
    toggleAddVisibilityStore, setTotalCountStore, setStores
} from '../redux/slices/storeSlice';
import { setError } from '../redux/slices/commonSlice';
import storeApiServices from '../services/storeServices';
import Message from '../components/Message';
import DisplayTableTemplate from '../components/UITemplate/DisplayDataTemplate';
import PaginationTemplate from '../components/UITemplate/PaginationTemplate';
import Footer from '../components/Footer';
import AddDataTemplate from '../components/UITemplate/AddDataTemplate';

const Store = () => {
    const dispatch = useDispatch();

    const error = useSelector((state) => state.commonDetails.errorMsg);
    const success = useSelector((state) => state.commonDetails.successMsg);

    const addVisible = useSelector((state) => state.storeDetails.isAddStoreVisible);

    const editVisible = useSelector((state) => state.storeDetails.isEditStoreVisible);

    const deleteVisible = useSelector((state) => state.storeDetails.isDeleteStoreVisible);

    const [loading, setLoading] = useState(true);

    //pagination objects in redux store
    const pageSize = useSelector((state) => state.storeDetails.pageSize);  // Default to 10
    const currentPage = useSelector((state) => state.storeDetails.currentPage);  // Start at page 1

    //function makes create store(AddDataTemplate) component visible
    const handleNewStoreClick = () => {
        dispatch(toggleAddVisibilityStore(true));
        console.log(addVisible); // Might log the old state due to async nature
    };

    //Fetch the stores details from server and set the stores and totalCount in redux store.
    const fetchStoreDetails = useCallback(async () => {
        try {
            setLoading(true);
            const storesData = await storeApiServices.fetchStores({
                pageNumber: currentPage,
                pageSize: pageSize,
            });

            dispatch(setStores(storesData.dtos));
            dispatch(setTotalCountStore(storesData.totalCount));
            console.log("Store state updated:");

        } catch (errors) {
            console.log(errors);
            dispatch(setError(`Failed to fetch store ${errors}`));
            setTimeout(() => {
                dispatch(setError(''));
            }, 10000);
        } finally {
            setLoading(false);
        }
    }, [dispatch, pageSize, currentPage]);

    //This will refresh the store page once add/edit/delete store is done
    useEffect(() => {
        fetchStoreDetails();
    }, [fetchStoreDetails, addVisible, editVisible, deleteVisible]);

    if (loading) {
        return <p><em>Loading...</em></p>;
    }

    return (

        <div>
            {/* Background blur effect when modal is open */}
            <div className='transition-all duration-300 w-full mx-auto my-4 px-4'>

                <div className="flex flex-row">
                    {/* Button to Create Store form */}
                    <button
                        className="btn btn-primary w-40 h-12 mb-5 mr-20"
                        onClick={handleNewStoreClick}
                    >
                        New Store
                    </button>
                    <Message type={error ? "error" : "success"} message={error ? error : success} className="mb-5" />
                </div>
                {/* Store Table */}
                <DisplayTableTemplate type='Store' />

                {/* Pagination - Aligning it properly */}
                <div className="mt-4 flex justify-left">
                    <PaginationTemplate type='Store' />
                </div>
                {/*Add Customer component */}
                {addVisible && <AddDataTemplate type='Store' />}

                <div className="py-4 ">
                    {/*Footer Component */}
                    {<Footer />}
                </div>
            </div>
        </div>
    );
};

export default Store;