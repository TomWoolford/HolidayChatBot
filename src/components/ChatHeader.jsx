import { useState } from 'react';
import PropTypes from 'prop-types';
import './chat.css';

const ChatHeader = ({ content: Content }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button className="header" onClick={() => setOpen(() => !open)}>
                Need Help?
            </button>
            <Content open={open} />
        </>
    )
}

ChatHeader.propTypes = { 
    children: PropTypes.element,
};

export default ChatHeader;