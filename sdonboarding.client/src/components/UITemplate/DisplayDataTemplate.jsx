/**
 * This is a template file for Displaying an entity.
 * Used by Customer, Product, Store, Sale Pages.
 * 'type' should be passed to this component for it to fetch the required information.
 */

import PropTypes from 'prop-types';
import { useGetDisplayObject, useSetEditObject, useSetDeleteObject, useGetSortListAsc, useGetSortListDesc } from '../../hooks/DisplayDataHooks';
import { genericDisplayDataMethods } from '../../utils/GenericDisplayMethods';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';

const DisplayTableTemplate = ({ type }) => {

    //Used to sort the displayed Items
    const [sort, setSort] = useState(['asc', 'id']);

    /* custom hooks for edit delete and fetching objects to be displayed */
    const setEditDisplay = useSetEditObject(type);
    const setDeleteDisplay  = useSetDeleteObject(type);
    const [objects, setObjects] = useState(useGetDisplayObject(type));
    const getSortListAsc = useGetSortListAsc(type);
    const getSortListDesc = useGetSortListDesc(type);
    

    /* get the table column title and the object keys that we want to display on screen*/
    const theader = genericDisplayDataMethods.getDisplayTableHeader(type);

    console.log("object loaded");

    const handleEdit = (object) => {
        setEditDisplay(object);
    };

    const handleDelete = (object) => {
        setDeleteDisplay(object);
    };

    const handleSortAsc = (key) => {
        setSort(["asc", key]);
    };

    const handleSortDesc = (key) => {
        setSort(["desc", key]);
    };

    const sortList = useCallback(() => {
        if (sort[0] !== 'asc' || sort[1] !== 'id') {
            if (sort[0] === 'asc') {
                const sortedData = getSortListAsc(sort[1]);
                setObjects(sortedData);
            }
            else {
                const sortedData = getSortListDesc(sort[1]);
                setObjects(sortedData);
            }
        }
    }, [getSortListAsc, getSortListDesc, sort]);


    useEffect(() => {
        sortList();
    }, [sortList]);

    return (
        <div>
            <table className="table table-striped table-hover table-bordered rounded-lg" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        {Object.entries(theader).map(([key, value]) => (
                            <th key={value}>
                            <div>
                                {value}

                                    <button className=" focus:outline-none text-[10px] text-gray-400" onClick={() => handleSortAsc(key)}>
                                        &#x25B2;
                                    </button>
                                    <button className="focus:outline-none text-[10px] text-gray-400" onClick={() => handleSortDesc(key)}>
                                  &#x25BC;
                                </button>
                                </div>
                            </th>
                        ))}
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {objects.map((object) => {
                        return (
                            <tr
                                key={object.id}
                                className='hover:bg-gray-200 transition-all duration-300 text-black'
                            >
                                {
                                 /*here value is actual key in object. We will find the value to display with it.
                                 Since object can have more extra information.*/ }
                                {Object.keys(theader).map((key) => {
                                    if (key === 'dateSold') {
                                        return (<td key={key}>{object[key].split('T')[0]}</td>);     //trimming T part from date
                                    } if (key === 'price' && type === 'Product') {
                                        return (<td key={key}>{`$${object[key]}`}</td>)
                                    }
                                    return (<td key={key}>{object[key]}</td>);
                                })}
                                <td>
                                    <button className="flex items-center p-2  text-white bg-yellow-500 rounded-md
                                                focus:outline-none focus:ring-2 focus:ring-yellow   -300"
                                        onClick={() => handleEdit(object)}>  {          /*this won't work: onClick={handleEdit(object)}'*/}
                                        <PencilSquareIcon className="h-5 w-10" />
                                        <span>EDIT</span>
                                    </button>
                                </td>
                                <td >
                                    <button className="flex items-center p-2 text-white bg-red-600" onClick={() => handleDelete(object)}>
                                        <TrashIcon className="h-5 w-5" />
                                        <span>DELETE</span>
                                    </button>
                                </td>
                            </tr>);
                    })}
                </tbody>
            </table>
        </div>
    );
};


DisplayTableTemplate.propTypes = {
    type: PropTypes.string.isRequired,     // 'type' should be a string
};
export default DisplayTableTemplate;