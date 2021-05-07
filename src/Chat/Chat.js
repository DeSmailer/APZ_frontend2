import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow/ChatWindow';
import ChatInput from './ChatInput/ChatInput';
import { baseUrl, chatConnectionUrl, getCookie } from '../baseUrl';

const Chat = () => {
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;
    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(chatConnectionUrl + '/hubs/chat')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                alert('Connected!');

                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);

                    setChat(updatedChat);
                });
            })
            .catch(e => alert('Connection failed: ', e));
    }, []);

    const sendMessage = async (chatId, senderId, text) => {
        const chatMessage = {
            chatId: chatId-0,
            senderId: senderId-0,
            text: text
        };

        try {
            await fetch(baseUrl + '/Chat/Post', {
                method: 'POST',
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (e) {
            console.log('Sending message failed.', e);
        }
    }

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat} />
        </div>
    );
};

export default Chat;