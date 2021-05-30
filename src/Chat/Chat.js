import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow/ChatWindow';
import ChatInput from './ChatInput/ChatInput';
import { baseUrl, chatConnectionUrl, getCookie } from '../baseUrl';
import { Button } from 'bootstrap';

const connection = new HubConnectionBuilder()
    .withUrl(chatConnectionUrl + '/hubs/chat')
    .withAutomaticReconnect()
    .build();



const Chat = () => {
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;
    useEffect(() => {


        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.invoke("JoinGroup", getCookie("chatToken"))
                    .catch(err => {
                        console.log(err);
                    });


                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);

                    setChat(updatedChat);

                    toBottom();
                });
            })
            .catch(e => alert('Connection failed: ', e));
    }, []);

    const sendMessage = async (chatToken, text) => {
        const chatMessage = {
            ChatToken: chatToken,
            Message: text
        };

        try {
            await fetch(baseUrl + '/Chat/Post', {
                method: 'POST',
                body: JSON.stringify(chatMessage),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Token': getCookie('token'),
                    'Content-Type': 'application/json; charset=UTF-8'
                },
            });
        }
        catch (e) {
            console.log('Sending message failed.', e);
        }
    }

    function toBottom() {
        var block = document.getElementById("chatWindow");
        block.scrollTop = block.scrollHeight;
    }

    window.addEventListener('beforeunload', function (event) {
        connection.invoke("OnDisconnectedAsync", getCookie("chatToken"))
            .catch(err => {
                console.log(err);
            });
    }, false);
    return (
        <div>
            <ChatWindow chat={chat} />
            <hr />
            <ChatInput sendMessage={sendMessage} />
        </div>
    );

};

export default Chat;