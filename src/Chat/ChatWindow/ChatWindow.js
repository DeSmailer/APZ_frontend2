import React from 'react';

import Message from './Message/Message';

const ChatWindow = (props) => {
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            userName={m.userName}
            message={m.message}
            time={m.time}/>);
            console.log(props)
    return(
        <div className="chat-box" id="chatWindow">
            {chat}
        </div>
    )
};

export default ChatWindow;