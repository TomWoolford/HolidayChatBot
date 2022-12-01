import PropTypes from 'prop-types';
import React, { useRef, useEffect, useMemo, memo } from 'react';
import { errorMessage } from '../../helpers/responses';
import './responses.css';

const Responses = ({ messages }) => { 
    const hiddenRef = useRef(0);
    const resultStartRef = useRef(0);
    const redundantRef = useRef(0);

    const memoMessages = useMemo(() => (messages) ,[messages]);
    
    useEffect(() => {
        if (resultStartRef && resultStartRef.current)
            return scroll(resultStartRef.current);

        if (hiddenRef && hiddenRef.current) 
            return scroll(hiddenRef.current);
    }, [memoMessages]);

    const scroll = curr => curr.scrollIntoView({ behavior: 'smooth', block: 'center' });

    return (
        <> 
            {
                memoMessages ? memoMessages.map((message, idx) => {
                    const cssClass = message.isUser ? `message user ${message.key}` : `message bot ${message.key}`;
                    return message.key !== "" ?
                        <p 
                            ref={message.key === "matches" ? resultStartRef : redundantRef}
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

export default React.memo(Responses);