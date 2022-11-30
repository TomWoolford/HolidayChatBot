import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { errorMessage } from '../../helpers/responses';
import './responses.css';

const Responses = ({ messages }) => { 
    const hiddenRef = useRef(0);
    const resultStartRef = useRef(0);
    
    useEffect(() => {
        if (resultStartRef && resultStartRef.current)
            return scroll(resultStartRef.current);

        if (hiddenRef && hiddenRef.current) 
            return scroll(hiddenRef.current);
    }, [messages]);

    const scroll = curr => curr.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Will need to look into memo so it doesn't re-render everything 
    return (
        <> 
            {
                messages ? messages.map((message, idx) => {
                    const cssClass = message.isUser ? `message user ${message.key}` : `message bot ${message.key}`;
                    return message.key !== "" ?
                        <p 
                            className={cssClass}
                            key={`messages-${idx}`} 
                            dangerouslySetInnerHTML={{__html: message.msg}} 
                        /> :
                        <p 
                            className={cssClass}
                            key={`messages-${idx}`}
                            >{message.msg}
                        </p>
                })
                : errorMessage
            }
            <div ref={hiddenRef}></div>
        </>
    )
}

Responses.propTypes = { 
    messages: PropTypes.arrayOf(PropTypes.object),
};

export default Responses;