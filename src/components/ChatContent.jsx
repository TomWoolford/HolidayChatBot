import { useRef } from 'react';
import PropTypes from 'prop-types';
import { IoIosSend } from 'react-icons/io';
import './chat.css';

const ChatContent = ({ open }) => {
    const contentRef = useRef(0);

    return (
        <div className="content-parent" ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}>
            <div className="content"> 
            </div>
            <div className="chat-input">
                <div className="input-group">
                    <input 
                        className="message-input" 
                        type="text"
                        placeholder="Write a message here..."
                    />
                    <button className="send-button">Send{' '}<IoIosSend size={15}/></button>
                </div>
            </div>
        </div>
    )
}

ChatContent.propTypes = {
    open: PropTypes.bool,
};

export default ChatContent;