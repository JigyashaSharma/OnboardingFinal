/**
 * This is a template file for Displaying an entity.
 * Used by Customer, Product, Store, Sale Pages.
 * 'type' should be passed to this component for it to fetch the required information.
 */

import PropTypes from 'prop-types';
import { useGetDisplayObject, useSetEditObject, useSetDeleteObject, useGetSortListAsc, useGetSortListDesc } from '../../hooks/DisplayDataHooks';
import { genericDisplayDataMethods } from '../../utils/GenericDisplayMethods';
import { useCallback, useEffect, useState } from 'react';

const DisplayTableTemplate = ({ type }) => {

    //Used to sort the displayed Items. Intially setting it to ascending and id as done in DB.
    const [sort, setSort] = useState(['asc', 'id']);

    /* custom hooks for edit delete and fetching objects to be displayed */
    const setEditDisplay = useSetEditObject(type);
    const setDeleteDisplay  = useSetDeleteObject(type);
    const [objects, setObjects] = useState(useGetDisplayObject(type));
    const getSortListAsc = useGetSortListAsc(type);
    const getSortListDesc = useGetSortListDesc(type);
    

    /* get the table column title and the object keys that we want to display on screen*/
    const theader = genericDisplayDataMethods.getDisplayTableHeader(type);

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
        //Data will already be sorted based on id in DB.
        //Calling sort only if sort done for other attributes.
        if (sort[0] !== 'asc' || sort[1] !== 'id') {
            if (sort[0] === 'asc') {
                // getSortListAsc handles any null value in array and return null if nothing to sort.
                const sortedData = getSortListAsc(sort[1]);
                if (!sortedData) {
                    //resetting sort values to default
                    setSort(['asc', 'id']);
                    alert("No data to sort!!");
                    return;
                }
                setObjects(sortedData);
            }
            else {
                const sortedData = getSortListDesc(sort[1]);
                if (!sortedData) {
                    //resetting sort values to default
                    setSort(['asc', 'id']);
                    alert("No data to sort!!");
                    return;
                }
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
                        {genericDisplayDataMethods.displaySortButton(theader, handleSortAsc, handleSortDesc)}
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        genericDisplayDataMethods.displayData(objects, theader, type, handleEdit, handleDelete)
                    }
                </tbody>
            </table>
        </div>
    );
};


DisplayTableTemplate.propTypes = {
    type: PropTypes.string.isRequired,     // 'type' should be a string
};
export default DisplayTableTemplate;