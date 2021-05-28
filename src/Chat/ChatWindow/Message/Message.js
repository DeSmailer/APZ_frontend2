import React from 'react';

const Message = (props) => (
    <div className="message-box">
        <p className="message-box-header"><strong>{props.userName}:</strong></p>
        <p className="chat-box-body">{props.message}</p>
    </div>
);

export default Message;