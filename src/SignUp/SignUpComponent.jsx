import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { SetWord } from '../Translations/Translate';
import { baseUrl } from '../baseUrl';

class SignUpComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      Surname: "",
      Email: "",
      Password: "",
      RepeatPassword: "",
      Feature: "",
    }

    this.changeName = this.changeName.bind(this);
    this.changeSurname = this.changeSurname.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeRepeatPassword = this.changeRepeatPassword.bind(this);
    this.changeFeature = this.changeFeature.bind(this);

    this.validateName = this.validateName.bind(this);
    this.validateSurname = this.validateSurname.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateFeature = this.validateFeature.bind(this);
  }

  changeName(event) {
    this.setState({ Name: event.target.value });
    console.log(this.state.Name)
  }
  changeSurname(event) {
    this.setState({ Surname: event.target.value });
  }
  changeEmail(event) {
    this.setState({ Email: event.target.value });
  }
  changePassword(event) {
    this.setState({ Password: event.target.value });
  }
  changeRepeatPassword(event) {
    this.setState({ RepeatPassword: event.target.value });
  }
  changeFeature(event) {
    this.setState({ Feature: event.target.value });
  }

  validateName() {
    return this.state.Name.length > 0;
  }
  validateSurname() {
    return this.state.Surname.length > 0;
  }
  validateEmail() {
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regEmail.test(this.state.Email);
  }
  validatePassword() {
    return this.state.Password.length > 6 && this.state.Password === this.state.RepeatPassword;
  }
  validateFeature() {
    return this.state.Feature.length > 0;
  }

  SignUp() {
    const body = {
      Name: this.state.Name,
      Surname: this.state.Surname,
      Email: this.state.Email,
      Password: this.state.Password,
      Feature: this.state.Feature,
    }
    fetch(baseUrl + `/User/Register`, {
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
            this.props.history.push('/signIn')
            alert("Ok");
          }
        },
        (error) => {
          alert(error);
        }
      );
  }

  handleSubmit = event => {
    if (this.validateName() === true && this.validateSurname() &&
      this.validateEmail() && this.validatePassword() &&
      this.validateFeature()) {
      this.SignUp();
      event.preventDefault();
    } else {
      alert(SetWord("Not all fields are filled in correctly"));
    }
  }

  render() {
    return (
      <div className="default-div">

        <Form >
          <h4>{SetWord("SignUp")}</h4>

          <Form.Group controlId="formBasicName">
            <Form.Label>{SetWord("Name")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={SetWord("Enter name")}
              value={this.state.Name}
              onChange={this.changeName} />
          </Form.Group>

          <Form.Group controlId="formBasicSurname">
            <Form.Label>{SetWord("Surname")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={SetWord("Enter surname")}
              value={this.state.Surname}
              onChange={this.changeSurname} />
          </Form.Group>

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

          <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>{SetWord("Repeat password")}</Form.Label>
            <Form.Control
              type="password"
              placeholder={SetWord("Enter password")}
              value={this.state.RepeatPassword}
              onChange={this.changeRepeatPassword} />
          </Form.Group>

          <Form.Group controlId="formGridFeature">
            <Form.Label>{SetWord("Feature")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={SetWord("Enter feature")}
              value={this.state.Feature}
              onChange={this.changeFeature} />
          </Form.Group>

          <button className="default-button" onClick={this.handleSubmit}>
            {SetWord("Confirm")}
          </button>
        </Form>
      </div>

    );
  }
}
export default SignUpComponent;
