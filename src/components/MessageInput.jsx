import PropTypes from 'prop-types';
import { IoIosSend } from 'react-icons/io';
import './chat.css';

const MessageInput = ({ inputState, submit }) => {
    const {userInput, setuserInput} = inputState;

    return (
        <>
            <input 
                className="message-input" 
                type="text"
                placeholder="Write a message here..."
                value={userInput}
                onChange={(e) => setuserInput(e.target.value)}
            />
            <button 
                className="send-button"
                onClick={submit}
            >Send{' '}<IoIosSend size={15}/>
            </button>
        </>
    )
}

MessageInput.propTypes = {
    inputState: PropTypes.object,
    submit: PropTypes.func,
};

export default MessageInput;