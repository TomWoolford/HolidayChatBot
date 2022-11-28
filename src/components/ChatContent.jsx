import PropTypes from 'prop-types';
import './chat.css';

const ChatContent = ({ open }) => {
    return (
        <div className={`content ${open ? "show" : "hide"}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci sed magnam minima numquam, minus mollitia cumque? Libero perspiciatis repellendus cumque inventore iure, nemo provident repudiandae, ratione dolor quo error corporis?
        </div>
    )
}

ChatContent.propTypes = {
    open: PropTypes.bool,
};

export default ChatContent;