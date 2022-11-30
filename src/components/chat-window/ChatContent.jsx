import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MessageInput from '../chat-input/MessageInput';
import './chat.css';
import '../loading/loading.css';
import Responses from '../responses/Responses';
import { Message } from '../../helpers/classes';
import { getNextMessage, getNewStage, getFirstResponse, calculateResults } from '../../helpers/chatHandler';
import { isValidInput } from '../../helpers/helpers';
import Loading from '../loading/Loading';

const ChatContent = ({ open }) => {
    const [userInput, setuserInput] = useState('');
    const [userStages, setUserStages] = useState([0]);
    const [messages, setMessages] = useState([getFirstResponse()]);
    const [loading, setLoading] = useState(false);
    const contentRef = useRef(0);

    const handleSubmit = async () => { 
        setLoading(true);

        if (isValidInput(userInput)) { 
            setMessages((prev) => [...prev, new Message(userInput.trim(), "", true)]);
            setuserInput('');
            
            const nextMessage = await getNextMessage(userStages[userStages.length - 1], userInput.trim());
            setMessages((prev) => [...prev, nextMessage]);

            const newStage = getNewStage(nextMessage);
            if (newStage > -1 && newStage !== userStages[userStages.length - 1]) 
                setUserStages((prev) => [...prev, newStage]);

            if (newStage === 5) {
                await calculateResults();
            }
        }
        setLoading(false);
    }

    return (
        <div 
            className="content-parent" 
            ref={contentRef} 
            style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}
        >
            <div className="content"> 
                <Responses messages={messages} />
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