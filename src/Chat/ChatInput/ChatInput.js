import React, { useState } from 'react';

const ChatInput = (props) => {
    const [chatId, setChatId] = useState('');
    const [senderId, setSenderId] = useState('');
    const [text, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();

        const isChatIdProvided = chatId && chatId !== '';
        const isSenderIdProvided = senderId && senderId !== '';
        const isTextProvided = text && text !== '';

        if (isChatIdProvided && isSenderIdProvided && isTextProvided) {
            props.sendMessage(chatId, senderId, text);
        } 
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onChatIdUpdate = (e) => {
        setChatId(e.target.value);
    }

    const onSenderIdUpdate = (e) => {
        setSenderId(e.target.value);
    }

    const onTextUpdate = (e) => {
        setText(e.target.value);
    }

    return (
        <form 
            onSubmit={onSubmit}>
            <label htmlFor="chatId">chatId:</label>
            <br />
            <input 
                id="chatId" 
                name="chatId" 
                value={chatId}
                onChange={onChatIdUpdate} />
            <br/>
            <label htmlFor="senderId">senderId:</label>
            <br />
            <input 
                id="senderId"
                name="senderId" 
                value={senderId}
                onChange={onSenderIdUpdate} />
            <br/>
            <label htmlFor="text">text:</label>
            <br />
            <input 
                type="text"
                id="text"
                name="text" 
                value={text}
                onChange={onTextUpdate} />
            <br/><br/>
            <button>Submit</button>
        </form>
    )
};

export default ChatInput;