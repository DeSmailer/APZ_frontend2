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
    const [isLoaded, setLoad] = useState("");


    useEffect(() => {

        console.log(connection.connectionId)
        if (connection.connectionId == null) {
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

                    const token = {
                        Token: getCookie("chatToken")
                    };

                    fetch(baseUrl + '/Chat/GetAllMessages', {
                        method: 'POST',
                        body: JSON.stringify(token),
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Token': getCookie('token'),
                            'Content-Type': 'application/json; charset=UTF-8'
                        },
                        credentials: 'same-origin'
                    })
                        .then(result => result.json())
                        .then(
                            (result) => {
                                console.log(result);
                                fillChat(result);
                                setLoad(true);
                                console.log()
                            },
                            (error) => {
                                this.setState({
                                    error
                                });
                            }
                        );
                })
        }
        else {
            window.location.reload();
        }
    }, []);

    function fillChat(oldMessages) {
        const updatedChat = [...latestChat.current];
        oldMessages.forEach(message => {
            console.log(message);
            updatedChat.push(message);
        });
        setChat(updatedChat);
    }

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
    if (isLoaded == false) {
        return (
            <div>
                <div class="fa-3x" className="chat-box center">
                    <i class="fas fa-spinner fa-pulse"></i>
                </div>
                <hr />
                <ChatInput sendMessage={sendMessage} />
            </div>
        );
    }
    else {
        return (
            <div>
                <ChatWindow chat={chat} />
                <hr />
                <ChatInput sendMessage={sendMessage} />
            </div>
        );
    }

};

export default Chat;