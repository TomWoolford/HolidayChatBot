import { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MessageInput from '../chat-input/MessageInput';
import './chat.css';
import '../loading/loading.css';
import Responses from '../responses/Responses';
import { Message } from '../../helpers/classes';
import { getNextMessage, calculateResults } from '../../helpers/chatHandler';
import { isValidInput, getFirstResponse, getNewStage } from '../../helpers/helpers';
import Loading from '../loading/Loading';

const ChatContent = ({ open }) => {
    const [userInput, setuserInput] = useState('');
    const [userStages, setUserStages] = useState([0]);
    const [messages, setMessages] = useState([getFirstResponse()]);
    const [loading, setLoading] = useState(false);
    const contentRef = useRef(0);

    const memoMessages = useMemo(() => messages, [messages]);

    const handleSubmit = async () => { 
        setLoading(true);

        if (isValidInput(userInput)) { 
            if (userInput === 'restart') {
                setMessages([]);
            }
            if (userStages[userStages.length - 1] === 5) {
                await getResults(userStages[userStages.length - 1], userInput);
                setuserInput('');
                setLoading(false);
                return;
            }

            setMessages((prev) => [...prev, new Message(userInput.trim(), "", true)]);
            setuserInput('');
            
            const nextMessage = await getNextMessage(userStages[userStages.length - 1], userInput.trim());
            setMessages((prev) => [...prev, ...nextMessage]);

            const newStage = getNewStage(nextMessage[0]);
            if (newStage > -1 && newStage !== userStages[userStages.length - 1]) 
                setUserStages((prev) => [...prev, newStage]);

            if (newStage === 5) {
                const results = await calculateResults();
                setMessages((prev) => [...prev, ...results]);
            }
        }
        setLoading(false);
    }

    const getResults = async (stage, input) => {
        const results = await getNextMessage(stage, input);
        setMessages((prev) => [...prev, ...results]);
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

export default ChatContent;