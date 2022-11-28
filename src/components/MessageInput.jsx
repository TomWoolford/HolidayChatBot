import PropTypes from 'prop-types';
import { IoIosSend } from 'react-icons/io';
import './chat.css';

const MessageInput = () => {

    return (
        <>
            <input 
                className="message-input" 
                type="text"
                placeholder="Write a message here..."
            />
            <button className="send-button">Send{' '}<IoIosSend size={15}/></button>
        </>
    )
}

MessageInput.propTypes = {

};

export default MessageInput;