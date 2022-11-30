import React, { useMemo, useRef, useState } from 'react';
import MessageInput from '../chat-input/MessageInput';
import Responses from '../responses/Responses';
import Loading from '../loading/Loading';
import { Message } from '../../helpers/classes';
import { getNextMessage } from '../../helpers/chatHandler';
import { isValidInput, getFirstResponse, getNewStage } from '../../helpers/helpers';
import { calculateResults } from '../../helpers/resultHandler';
import PropTypes from 'prop-types';
import './chat.css';
import '../loading/loading.css';

const ChatContent = ({ open }) => {
    const [userInput, setuserInput] = useState('');
    const [userStages, setUserStages] = useState([0]);
    const [messages, setMessages] = useState([getFirstResponse()]);
    const [loading, setLoading] = useState(false);
    const contentRef = useRef(0);

    const memoMessages = useMemo(() => messages, [messages]);

    const handleSubmit = async () => { 
        setLoading(true);

        // Check for valid input 
        if (isValidInput(userInput)) { 
            // Clear chats
            if (userInput === 'restart') 
                setMessages([]);
            
            // User is requesting partial results
            if (userStages[userStages.length - 1] === 5) 
                return await getPartialResults(userStages[userStages.length - 1], userInput);

            // Show input as chat message
            setMessages((prev) => [...prev, new Message(userInput.trim(), "", true)]);
            
            // Get next message and stage
            const nextMessage = await updateChat(userInput);
            const newStage = updateStage(nextMessage[0]);

            // If we are at the end return results
            if (newStage === 5) {
                const results = await calculateResults();
                setMessages((prev) => [...prev, ...results]);
            }
        }
        setLoading(false);
    }

    const getPartialResults = async (stage, input) => {
        const results = await getNextMessage(stage, input);
        
        setMessages((prev) => [...prev, ...results]);
        setuserInput('');
        setLoading(false);

        return;
    }

    const updateStage = (message) => {
        const newStage = getNewStage(message);

        if (newStage > -1 && newStage !== userStages[userStages.length - 1]) 
            setUserStages((prev) => [...prev, newStage]);

        return newStage;
    }

    const updateChat = async (input) => {
        const nextMessage = await getNextMessage(userStages[userStages.length - 1], input.trim());
        setMessages((prev) => [...prev, ...nextMessage]);
        setuserInput('');

        return nextMessage;
    }

    return (
        <div 
            className="content-parent" 
            ref={contentRef} 
            style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}
        >
            <div className="content"> 
                <Responses messages={memoMessages} />
            </div>
            
            <div className="loading">
                {loading && <Loading />}
            </div>

            <div className="chat-input">
                <div className="input-group">
                    <MessageInput 
                        inputState={{userInput, setuserInput}} 
                        submit={handleSubmit} 
                        loading={loading}
                    /> 
                </div>
            </div>
        </div>
    )
}

ChatContent.propTypes = {
    open: PropTypes.bool,
};

export default React.memo(ChatContent);