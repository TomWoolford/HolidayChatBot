import PropTypes from 'prop-types';
import './chat.css';

const ChatContainer = ({ children }) => 
        <div className="container">
            {children}
        </div>;

ChatContainer.propTypes = { children: PropTypes.element };

export default ChatContainer;