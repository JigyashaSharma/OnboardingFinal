/**
 * This is a template file for deleting an entity.
 * Used by Customer, Product, Store, Sale Pages.
 * 'type' should be passed to this component for it to fetch the required information.
 */

import { PropTypes } from 'prop-types';
import { useSendDeleteRequest, useDeleteCancel, useGetDeleteObject } from '../../hooks/DeleteDataHook';
import { XMarkIcon } from '@heroicons/react/24/solid';

const DeleteDataTemplate = ({ type }) => {

    const deleteObject = useGetDeleteObject(type);
    if (!deleteObject) {
        if (process.env.NODE_ENV !== 'production') {
            console.error("Object to be deleted not found.");
        }
        return;
    }

    const sendDeleteRequest = useSendDeleteRequest(deleteObject, type);
    const deleteCancel = useDeleteCancel(type);

    //handle Cancel the form
    const handleCancel = () => {
        deleteCancel();
    };

    //handle the form submit event
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Handling the errors inside sendDeleteRequest. Success/error this function will return and
        // message will be set by sendDeleteRequest.
        await sendDeleteRequest();
    };
    return (
        <div className='fixed inset-0 bg-gray-400 bg-opacity-70 backdrop-blur-sm  flex justify-center items-center z-50'
            onClick={handleCancel} //closing the component if we click outside
        >
            <div className="bg-white p-6 rounded shadow-md relative w-[500px] h-[200px]"
                onClick={(e) => e.stopPropagation()} // stopping the component from getting closed when click inside
            >
                <h2 className="mt-2 mb-4 font-semibold">Delete {type}</h2>
                <hr />
                <h2 className="mt-2 mb-4 font-semibold">Are you sure?</h2>
                <hr />
                <div className='flex justify-end'>
                    <button
                        type='button'
                        onClick={handleCancel}
                        className="px-3 py-1 rounded bg-gray-800 text-white mr-5 mt-4 text-center">cancel</button>
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        className="flex justify-between rounded bg-red-500 text-white space-x-2 w-25 mt-4">
                        <span className="flex-grow text-center mt-1">delete</span>
                        <XMarkIcon className="w-7 h-full bg-red-600 ml-2 rounded-r-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteDataTemplate.propTypes = { 
    type: PropTypes.string.isRequired,
};
export default DeleteDataTemplate;