import PropTypes from 'prop-types';
import { IoIosSend } from 'react-icons/io';
import './chatInput.css';

const MessageInput = ({ inputState, submit, loading }) => {
    const {userInput, setuserInput} = inputState;

    const checkKey = e => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!loading && e.key === 'Enter' || e.which === 13) submit();
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
                disabled={loading}
                autoFocus={loading}
            />
            <button 
                className="send-button"
                onClick={submit}
                disabled={loading}
            >Send{' '}<IoIosSend size={15}/>
            </button>
        </div>
    )
}

MessageInput.propTypes = {
    inputState: PropTypes.object,
    submit: PropTypes.func,
    loading: PropTypes.bool,
};

export default MessageInput;