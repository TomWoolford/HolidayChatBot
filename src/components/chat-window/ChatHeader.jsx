import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegComments } from 'react-icons/fa';
import './chat.css';

const ChatHeader = ({ content: Content }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        event.target.classList.toggle('header-light');
        setOpen(() => !open);
    }

    return (
        <>
            <button className="header" onClick={handleClick}
                > Need Help?{' '}<FaRegComments size={15} />
            </button>
            <Content open={open} />
        </>
    )
}

ChatHeader.propTypes = { 
    children: PropTypes.element,
};

export default ChatHeader;