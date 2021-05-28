import React, { useState } from 'react';
import { getCookie } from '../../baseUrl';

const ChatInput = (props) => {
    const [chatId, setChatId] = useState('');
    const [senderId, setSenderId] = useState('');
    const [text, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();

        const isTextProvided = text && text !== '';

        if (isTextProvided) {
            props.sendMessage(getCookie("chatToken"), text);
        } 
        else {
            alert('Please insert an user and a message.');
        }
    }

    
    const onTextUpdate = (e) => {
        setText(e.target.value);
    }

    return (
        <form 
            onSubmit={onSubmit}>
            
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