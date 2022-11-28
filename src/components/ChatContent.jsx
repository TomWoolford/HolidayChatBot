import { useRef } from 'react';
import PropTypes from 'prop-types';
import './chat.css';
import MessageInput from './MessageInput';

const ChatContent = ({ open }) => {
    const contentRef = useRef(0);

    return (
        <div className="content-parent" ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}>
            <div className="content"> 
            </div>
            <div className="chat-input">
                <div className="input-group">
                   <MessageInput /> 
                </div>
            </div>
        </div>
    )
}

ChatContent.propTypes = {
    open: PropTypes.bool,
};

export default ChatContent;