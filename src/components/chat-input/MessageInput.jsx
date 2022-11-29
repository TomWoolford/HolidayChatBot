import PropTypes from 'prop-types';
import { IoIosSend } from 'react-icons/io';
import './chatInput.css';

const MessageInput = ({ inputState, submit }) => {
    const {userInput, setuserInput} = inputState;

    const checkKey = e => {
        e.preventDefault();
        e.stopPropagation();
        
        if (e.key === 'Enter' || e.which === 13) submit();
    }

    return (
        <div className="input-group">
            <input 
                className="message-input" 
                type="text" 
                placeholder="Write a message here..."
                value={userInput}
                onChange={(e) => setuserInput(e.target.value)}
                onKeyUp={checkKey}
            />
            <button 
                className="send-button"
                onClick={submit}
            >Send{' '}<IoIosSend size={15}/>
            </button>
        </div>
    )
}

MessageInput.propTypes = {
    inputState: PropTypes.object,
    submit: PropTypes.func,
};

export default MessageInput;