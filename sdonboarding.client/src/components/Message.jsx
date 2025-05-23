/**
 * This is a common message component file to show error and success messages for operations on entities.
 * Used by Customer, Product, Store, Sale Pages.
 * type and message should be passed to here to show it appropriately.
 */

import PropTypes from "prop-types";
import { MessageTypes } from '../utils/GenericObjects';

const Message = ({ type, message }) => {
    let messageClass = '';

    switch (type) {
        case MessageTypes.error:
            messageClass = 'text-red-500 bg-red-100 border-red-500';
            break;
        case MessageTypes.success:
            messageClass = 'text-green-500 text-green-100 border-green-500';
            break;
        case MessageTypes.loading:
            messageClass = 'text-blue-500 bg-blue-100 border-blue-500';
            break;
        default:
            return;
    }

    return (
        <div className={`p-4 border-1-4 ${messageClass} my-4`} >
            <strong>{message}</strong>
        </div>
    );
};

//PropTypes Validation
Message.propTypes = {
    type: PropTypes.oneOf(Object.values(MessageTypes)).isRequired,
    message: PropTypes.string.isRequired,
}

export default Message;