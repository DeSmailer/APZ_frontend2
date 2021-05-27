import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { SetWord } from '../Translations/Translate';
import { baseUrl, getCookie } from '../baseUrl';

class TopUpBalanceComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Amount: 0,
        }

        this.changeAmount = this.changeAmount.bind(this);

        this.validateAmount = this.validateAmount.bind(this);
    }

    changeAmount(event) {
        this.setState({ Amount: event.target.value });
        console.log(this.state.Amount)
    }

    validateAmount() {
        return this.state.Amount > 0;
    }

    topUpBalance() {
        const body = {
            Token: getCookie('token'),
            Amount: this.state.Amount - 0.0,
        }
        console.log(body)
        fetch(baseUrl + `/Wallet/ChangeBalance`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                /*'Token': getCookie('token'),
        'InstitutionId': getCookie('institutionId'),
        'Role': getCookie('role'),*/
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(
                (response) => {
                    if (response.ok) {
                        alert("Ok");
                    }
                },
                (error) => {
                    alert(error);
                }
            );
    }

    handleSubmit = event => {
        if (this.validateAmount()) {
            this.topUpBalance();
            event.preventDefault();
        } else {
            alert("не всі поля заповнені вірно");
        }

    }

    render() {
        return (
            <div className="default-div">

                <Form >
                    <Form.Group controlId="formBasicAmount">
                        <Form.Label>{SetWord("Amount")}</Form.Label>
                        <Form.Control
                            type="real"
                            placeholder={SetWord("Enter amount")}
                            value={this.state.Amount}
                            onChange={this.changeAmount} />
                    </Form.Group>
                    <button className="default-button" onClick={this.handleSubmit}>
                        {SetWord("Confirm")}
                    </button>
                </Form>
            </div>

        );
    }
}
export default TopUpBalanceComponent;