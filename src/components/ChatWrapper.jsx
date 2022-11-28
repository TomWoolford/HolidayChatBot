import ChatContainer from './chat-window/ChatContainer';
import ChatContent from './chat-window/ChatContent';
import ChatHeader from './chat-window/ChatHeader';

const ChatWrapper = () => 
        <ChatContainer>
            <ChatHeader content={ChatContent} />
        </ChatContainer>;

export default ChatWrapper;