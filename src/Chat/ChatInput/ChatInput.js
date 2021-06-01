import React, { useState } from 'react';
import { getCookie } from '../../baseUrl';
import { SetWord } from '../../Translations/Translate';

const ChatInput = (props) => {
    const [text, setText] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();

        const isTextProvided = text && text !== '';

        if (isTextProvided) {
            props.sendMessage(getCookie("chatToken"), text);
            setText("");
        }
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onTextUpdate = (e) => {
        setText(e.target.value);
    }

    function toBottom() {
        var block = document.getElementById("chatWindow");
        block.scrollTop = block.scrollHeight;
    }

    function handleSubmit() {

    }

    return (
        <div
            className=" input-form"
        >
            <div>
                <form
                    onSubmit={onSubmit}>
                    <br />
                    <div className="inline">
                        <input
                            className="input-text"
                            type="text"
                            id="text"
                            name="text"
                            value={text}
                            onChange={onTextUpdate} />
                    </div>

                    <div className="inline">
                        <button class="default-button inline chat-button">
                        {SetWord("Send")}
                            </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ChatInput;