import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import { errorMessage } from '../../helpers/responses';
import './responses.css';

const Responses = ({ messages }) => { 
    const hiddenRef = useRef(0);
    const resultStartRef = useRef(0);
    const redundantRef = useRef(0);
    
    // Scroll to the correct item in the list
    useEffect(() => {
        if (resultStartRef && resultStartRef.current)
            return scroll(resultStartRef.current);

        if (hiddenRef && hiddenRef.current) 
            return scroll(hiddenRef.current);
    }, [messages]);

    const scroll = curr => curr.scrollIntoView({ behavior: 'smooth', block: 'center' });

    return (
        <> 
            {
                messages ? messages.map((message, idx) => {
                    const cssClass = message.isUser ? `message user ${message.key}` : `message bot ${message.key}`;
                    return message.key !== "" ?
                        <p 
                            ref={message.key.includes("important") ? resultStartRef : redundantRef} // Ref to scroll to item if "important"
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
                : <p className="message bot">{errorMessage.msg}</p>
            }
            <div ref={hiddenRef}></div> 
        </>
    )
}

Responses.propTypes = { 
    messages: PropTypes.arrayOf(PropTypes.object),
};

export default Responses;