/**
 * This file is the base for Sale Page.
 * It calls all the different templates for it to have display, create, edit and delete funcationalities
 */

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import {
    toggleAddVisibilitySale, setTotalCountSale, setSales
} from '../redux/slices/saleSlice';
import { setError } from '../redux/slices/commonSlice';
import saleApiServices from '../services/saleServices';
import Message from '../components/Message';
import DisplayTableTemplate from '../components/UITemplate/DisplayDataTemplate';
import PaginationTemplate from '../components/UITemplate/PaginationTemplate';
import Footer from '../components/Footer';

const Sale = () => {
    const dispatch = useDispatch();

    const error = useSelector((state) => state.commonDetails.errorMsg);
    const success = useSelector((state) => state.commonDetails.successMsg);

    const addVisible = useSelector((state) => state.saleDetails.isAddSaleVisible);

    const editVisible = useSelector((state) => state.saleDetails.isEditSaleVisible);

    const deleteVisible = useSelector((state) => state.saleDetails.isDeleteSaleVisible);

    const [loading, setLoading] = useState(true);

    //pagination objects in redux store
    const pageSize = useSelector((state) => state.saleDetails.pageSize);  // Default to 10
    const currentPage = useSelector((state) => state.saleDetails.currentPage);  // Start at page 1

    //function makes create sale(AddDataTemplate) component visible
    const handleNewSaleClick = () => {
        dispatch(toggleAddVisibilitySale(true));
        console.log(addVisible); // Might log the old state due to async nature
    };

    //Fetch the sales details from server and set the sales and totalCount in redux store
    const fetchSaleDetails = useCallback(async () => {
        try {
            setLoading(true);
            const salesData = await saleApiServices.fetchSales({
                pageNumber: currentPage,
                pageSize: pageSize,
            });

            dispatch(setSales(salesData.dtos));
            dispatch(setTotalCountSale(salesData.totalCount));
            console.log("Sale state updated:");

        } catch (errors) {
            console.log(errors);
            dispatch(setError(`Failed to fetch sale ${errors}`));
            setTimeout(() => {
                dispatch(setError(''));
            }, 10000);
        } finally {
            setLoading(false);
        }
    }, [dispatch, pageSize, currentPage]);

    //This will refresh the sale page once add/edit/delete sale is done
    useEffect(() => {
        fetchSaleDetails();
    }, [fetchSaleDetails, addVisible, editVisible, deleteVisible]);

    if (loading) {
        return <p><em>Loading...</em></p>;
    }

    return (

        <div>
            {/* Background blur effect when modal is open */}
            <div className='transition-all duration-300 w-full mx-auto my-4 px-4'>

                <div className="flex flex-row">
                    {/* Button to show create sale form */}
                    <button
                        className="btn btn-primary w-40 h-12 mb-5 mr-20"
                        onClick={handleNewSaleClick}
                    >
                        New Sale
                    </button>
                    <Message type={error ? "error" : "success"} message={error ? error : success} className="mb-5" />
                </div>
                {/* Sale Table */}
                <DisplayTableTemplate type='Sale' />

                {/* Pagination - Aligning it properly */}
                <div className="mt-4 flex justify-left">
                    <PaginationTemplate type='Sale' />
                </div>

                <div className="py-4 ">
                    {/*Footer Component */}
                    {<Footer />}
                </div>
            </div>
        </div>
    );
};

export default Sale;