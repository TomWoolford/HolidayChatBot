import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MessageInput from './MessageInput';
import './chat.css';

const ChatContent = ({ open }) => {
    const [userInput, setuserInput] = useState('');
    const contentRef = useRef(0);

    const handleSubmit = () => {
        setuserInput('');

        console.log('You Typed: ', userInput);
    }

    return (
        <div className="content-parent" ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}>
            <div className="content"> 
             Response display here!
            </div>
            <div className="chat-input">
                <div className="input-group">
                    <MessageInput inputState={{userInput, setuserInput}} submit={handleSubmit} /> 
                </div>
            </div>
        </div>
    )
}

ChatContent.propTypes = {
    open: PropTypes.bool,
};

export default ChatContent;