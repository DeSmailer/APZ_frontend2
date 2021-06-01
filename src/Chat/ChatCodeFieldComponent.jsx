import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { SetWord } from '../Translations/Translate';
import { baseUrl, getCookie } from '../baseUrl';
import Cookies from 'js-cookie';

class ChatCodeFieldComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ChatCode: "",
        }

        this.changeChatCode = this.changeChatCode.bind(this);


        this.validateChatCode = this.validateChatCode.bind(this);

    }

    changeChatCode(event) {
        this.setState({ ChatCode: event.target.value });
        console.log(this.state.ChatCode)
    }


    validateChatCode() {
        return this.state.ChatCode.length == 9;
    }


    openChat() {
        const body = {
            ChatCode: this.state.ChatCode,
        }
        fetch(baseUrl + `/Chat/GetChatTokenByChatCode`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Token': getCookie('token'),
                /*'InstitutionId': getCookie('institutionId'),
                'Role': getCookie('role'),*/
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(
                (response) => {
                    console.log(response.chatToken + "  " + response.chatId)
                    Cookies.set('chatToken', response.chatToken);
                    Cookies.set('chatId', response.chatId);
                    this.props.history.push('/chatPage')
                    alert("Ok");
                },
                (error) => {
                    alert(error);
                }
            );
    }

    handleSubmit = event => {
        if (this.validateChatCode() === true) {
            this.openChat();
            event.preventDefault();
        } else {
            alert(SetWord("Not all fields are filled in correctly"));
        }
    }

    render() {
        return (
            <div className="default-div">
                <h4>{SetWord("Chat code")}</h4>
                <Form >
                    <Form.Group controlId="formBasicChatCode">
                        <Form.Label>{SetWord("Chat Code")}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={SetWord("Enter chat code")}
                            value={this.state.ChatCode}
                            onChange={this.changeChatCode} />
                    </Form.Group>

                    <button className="default-button" onClick={this.handleSubmit}>
                        {SetWord("Confirm")}
                    </button>
                </Form>
            </div>

        );
    }
}
export default ChatCodeFieldComponent;
