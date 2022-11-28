import PropTypes from 'prop-types';
import './chat.css';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';

const ChatBot = () => {
    return (
        <ChatContainer>
            <ChatHeader />
        </ChatContainer>
    )
}

ChatBot.propTypes = {

};

export default ChatBot;