import PropTypes from 'prop-types';
import { IoIosSend } from 'react-icons/io';
import './chatInput.css';

const MessageInput = ({ inputState, submit }) => {
    const {userInput, setuserInput} = inputState;

    return (
        <div className="input-group">
            <input 
                className="message-input" 
                type="text" 
                placeholder="Write a message here..."
                value={userInput}
                onChange={(e) => setuserInput(e.target.value)}
                onSubmit={submit}
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