import PropTypes from 'prop-types';
import { errorMessage } from '../../helpers/responses';
import './responses.css';

const Responses = ({ messages }) => { 
    // Set the class bubble depending on if user or not
    // Will need to look into memo so it doesn't re-render everything 
    return (
        <> 
            {
                messages ? messages.map((message, idx) => {
                    const classname = message.isUser ? "message user" : "message bot";
                    return message.key !== "" ?
                        <p 
                            className={classname}
                            key={`messages-${idx}`} 
                            dangerouslySetInnerHTML={{__html: message.msg}} 
                        /> :
                        <p 
                            className={classname}
                            key={`messages-${idx}`}
                            >{message.msg}
                        </p>
                })
                : errorMessage
            }
        </>
    )
}

Responses.propTypes = { 
    messages: PropTypes.arrayOf(PropTypes.object),
};

export default Responses;