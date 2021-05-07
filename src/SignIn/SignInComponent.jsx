import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { SetWord } from '../Translations/Translate';
import { baseUrl, getCookie } from '../baseUrl';


class SignInComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
    }

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }


  changeEmail(event) {
    this.setState({ Email: event.target.value });
  }
  changePassword(event) {
    this.setState({ Password: event.target.value });
  }


  validateEmail() {
    let regEmail = /^((^<>()\[\]\\.,;:\s@"]+(\.^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEmail.test(this.state.Email);
  }
  validatePassword() {
    return this.state.Password.length > 6;
  }


  SignIn() {
    const body = {
      Email: this.state.Email,
      Password: this.state.Password,
    }
    fetch(baseUrl + `/User/LoginLikeClient`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Token': getCookie('token'),
        'InstitutionId': getCookie('institutionId'),
        'Role': getCookie('role'),
        'Content-Type': 'application/json; charset=UTF-8'
      },
      credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(
        (response) => {
          console.log(response);
          document.cookie = "token=" + response.token;
          document.cookie = "institutionId=" + response.institutionId;
          document.cookie = "role=" + response.role;
          alert('Ok');
        },
        (error) => {
          console.log('Post account ', error);
          alert('Your account could not be posted\nError: ' + error);
          alert('мейл' + body.Mail +
            'пароль ' + body.Password);

        }
      )
  }

  handleSubmit = event => {
    if (this.validateEmail() && this.validatePassword()) {
      this.SignIn();
      event.preventDefault();
    } else {
      alert("не всі поля заповнені вірно");
    }

  }

  render() {
    return (
      <div className="default-div">

        <Form >

          <Form.Group controlId="formBasicEmail">
            <Form.Label>{SetWord("Email")}</Form.Label>
            <Form.Control
              type="email"
              placeholder={SetWord("Enter email")}
              value={this.state.EMail}
              onChange={this.changeEmail} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>{SetWord("Password")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={SetWord("Enter password")}
              value={this.state.Password}
              onChange={this.changePassword} />
          </Form.Group>

          <Button className="default-button" onClick={this.handleSubmit}>
            {SetWord("Confirm")}
          </Button>
        </Form>
      </div>

    );
  }
}
export default SignInComponent;
