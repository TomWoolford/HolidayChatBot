import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MessageInput from '../chat-input/MessageInput';
import './chat.css';
import Responses from '../responses/Responses';
import { message, questions, getNextMessage, getNewStage } from '../../helpers/responses';
import { isValidInput } from '../../helpers/helpers'

const ChatContent = ({ open }) => {
    const [userInput, setuserInput] = useState('');
    const [userStages, setUserStages] = useState([0]);
    const [messages, setMessages] = useState([questions[0]]);
    const contentRef = useRef(0);

    const handleSubmit = () => {
        if (isValidInput) { // Should send the users input first if valid 

            setMessages(() => [...messages, new message(userInput.trim(), "", true)]);
            // const nextMessage = getNextMessage(userStages, userInput.trim());
            // setMessages(() => [...messages, nextMessage]);

            // setUserStages.push(getNewStage(nextMessage));
        }
        setuserInput('');
    }

    return (
        <div className="content-parent" ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}>
            <div className="content"> 
                <Responses messages={messages} />
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