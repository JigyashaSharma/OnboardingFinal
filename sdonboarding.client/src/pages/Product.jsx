/**
 * This file is the base for Product Page.
 * It calls all the different templates for it to have display, create, edit and delete funcationalities
 */

import { useDispatch, useSelector } from 'react-redux';
import productApiServices from '../services/productServices';
import Message from "../components/Message";
import DisplayTableTemplate from '../components/UITemplate/DisplayDataTemplate';
import { useState, useEffect, useCallback } from 'react';
import PaginationTemplate from '../components/UITemplate/PaginationTemplate';
import { setError} from '../redux/slices/commonSlice';
import { setProducts, toggleAddVisibilityProduct, setTotalCountProduct } from '../redux/slices/productSlice';
import Footer from '../components/Footer';
import AddDataTemplate from '../components/UITemplate/AddDataTemplate';
import EditProductTemplate from '../components/UITemplate/EditDataTemplate';

const Product = () => {
    const dispatch = useDispatch();

    const error = useSelector((state) => state.commonDetails.errorMsg);
    const success = useSelector((state) => state.commonDetails.successMsg);

    const addVisible = useSelector((state) => state.productDetails.isAddProductVisible);

    const editVisible = useSelector((state) => state.productDetails.isEditProductVisible);

    const deleteVisible = useSelector((state) => state.productDetails.isDeleteProductVisible);

    const [loading, setLoading] = useState(true);

    //pagination objects in redux store
    const pageSize = useSelector((state) => state.productDetails.pageSize);  // Default to 10
    const currentPage = useSelector((state) => state.productDetails.currentPage);  // Start at page 1

    //function makes create product(AddDataTemplate) component visible
    const handleNewProductClick = () => {
        dispatch(toggleAddVisibilityProduct(true));
    };

    //Fetch the products details from server and set the products and totalCount in redux store
    const fetchProductDetails = useCallback(async () => {
        try {
            setLoading(true);
            const productsData = await productApiServices.fetchProducts({
                pageNumber: currentPage,
                pageSize: pageSize,
            });

            dispatch(setProducts(productsData.dtos));
            dispatch(setTotalCountProduct(productsData.totalCount));
            console.log("Product state updated:");

        } catch (errors) {
            console.log(errors);
            dispatch(setError(`Failed to fetch product ${errors}`));
            setTimeout(() => {
                dispatch(setError(''));
            }, 10000);
        } finally {
            setLoading(false);
        }
    }, [dispatch, pageSize, currentPage]);

    //This will refresh the product page once add or edit product is done
    useEffect(() => {
        fetchProductDetails();
    }, [fetchProductDetails, addVisible, editVisible, deleteVisible]);

    if (loading) {
        return <p><em>Loading...</em></p>;
    }

    return (

        <div>
            {/* Background blur effect when modal is open */}
            <div className='transition-all duration-300 w-full mx-auto my-4 px-4'>

                <div className="flex flex-row">
                    {/* Button to show AddProduct form */}
                    <button
                        className="btn btn-primary w-40 h-12 mb-5 mr-20"
                        onClick={handleNewProductClick}
                    >
                        New Product
                    </button>
                    <Message type={error ? "error" : "success"} message={error ? error : success} className="mb-5" />
                </div>
                {/* Product Table */}
                <DisplayTableTemplate type='Product' />

                {/* Pagination - Aligning it properly */}
                <div className="mt-4 flex justify-left">
                    <PaginationTemplate type='Product' />
                </div>
                {/*Add Customer component */}
                {addVisible && <AddDataTemplate type='Product' />}

                {/*Edit Customer component */}
                {editVisible && <EditProductTemplate type='Product' />}

                <div className="py-4 ">
                    {/*Footer Component */}
                    {<Footer />}
                </div>

            </div>
        </div>
    );


};

export default Product;