import React, { useMemo, useRef, useState } from 'react';
import MessageInput from '../chat-input/MessageInput';
import Responses from '../responses/Responses';
import Loading from '../loading/Loading';
import { Message } from '../../helpers/classes';
import { getNextMessage } from '../../helpers/chatHandler';
import { isValidInput, getFirstResponse, getNewStage, lastElement } from '../../helpers/helpers';
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
            // Show input as chat message
            setMessages((prev) => [...prev, new Message(userInput.trim(), "", true)]);
            
            // Get next message and stage
            const nextMessage = await updateMessages(userInput);
            const stageUpdate = updateStage(nextMessage[0]);

            // If we are at the end return results
            if (stageUpdate.newStage === 5 && stageUpdate.update) 
                await updateMessages("", 5);
        }
        setLoading(false);
    }

    const updateStage = (message) => {
        const newStage = getNewStage(message);
        let update = false;
        
        if (newStage > -1 && newStage !== lastElement(userStages)) {
            setUserStages((prev) => [...prev, newStage]);
            update = true;
        }

        return { newStage, update };
    }

    const updateMessages = async (input, stage = 0) => {
        const trimmed = input ? input.trim() : "";
        
        const nextMessage = await getNextMessage(stage === 0 ? lastElement(userStages) : stage, trimmed);
        isRestart(input);
        setMessages((prev) => [...prev, ...nextMessage]);
        setuserInput('');

        return nextMessage;
    }

    const isRestart = (input) => {
        if (input === 'restart')
            setMessages((prev) => []);
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