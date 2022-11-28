import PropTypes from 'prop-types';
import './chat.css';
import ChatContainer from './ChatContainer';
import ChatContent from './ChatContent';
import ChatHeader from './ChatHeader';

const ChatBot = () => {
    return (
        <ChatContainer>
            <ChatHeader />
            <ChatContent />
        </ChatContainer>
    )
}

ChatBot.propTypes = {

};

export default ChatBot;