import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import MessageInput from '../chat-input/MessageInput';
import './chat.css';
import './loading.css';
import Responses from '../responses/Responses';
import { message, questions, getNextMessage, getNewStage } from '../../helpers/responses';
import { isValidInput } from '../../helpers/helpers';

const ChatContent = ({ open }) => {
    const [userInput, setuserInput] = useState('');
    const [userStages, setUserStages] = useState([0]);
    const [messages, setMessages] = useState([questions[0]]);
    const [loading, setLoading] = useState(false);
    const contentRef = useRef(0);

    const handleSubmit = async () => { 
        setLoading(true);

        if (isValidInput(userInput)) { 
            setMessages((prev) => [...prev, new message(userInput.trim(), "", true)]);
            setuserInput('');
            
            const nextMessage = await getNextMessage(userStages[userStages.length - 1], userInput.trim());

            setMessages((prev) => [...prev, nextMessage]);

            const newStage = getNewStage(nextMessage);

            if (newStage !== userStages[userStages.length - 1]) 
                setUserStages((prev) => [...prev, newStage]);
        }
        setLoading(false);
    }

    return (
        <div className="content-parent" ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}>
            <div className="content"> 
                <Responses messages={messages} />
            </div>
            
            {loading && <div className="loading">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>}

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