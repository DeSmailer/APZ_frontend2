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

                connection.invoke("JoinGroup", getCookie("chatToken"))  //JoinGroup is C# method name
                    .catch(err => {
                        console.log(err);
                    });


                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);

                    setChat(updatedChat);
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
                    /*'InstitutionId': getCookie('institutionId'),
                    'Role': getCookie('role'),*/
                    'Content-Type': 'application/json; charset=UTF-8'
                },
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