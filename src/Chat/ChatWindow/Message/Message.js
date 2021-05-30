import React from 'react';

const Message = (props) => (
    <div className="message-box">
        <div className="message-box-header">
            <span><strong>{props.userName}:</strong></span>
            <span className="message-time">{props.time}</span></div>
        <p className="chat-box-body">{props.message}</p>
    </div>
);

export default Message;