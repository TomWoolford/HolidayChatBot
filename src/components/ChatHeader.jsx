import { useState } from 'react';
import PropTypes from 'prop-types';
import './chat.css';

const ChatHeader = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button className="header" onClick={() => setOpen(() => !open)}>
                Need Help?
            </button>
            {open && children}
        </>
    )
}

ChatHeader.propTypes = { 
    children: PropTypes.element,
};

export default ChatHeader;