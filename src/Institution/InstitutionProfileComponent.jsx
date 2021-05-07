import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { baseUrl, getCookie } from '../baseUrl';
import { Link } from 'react-router-dom';
import { SetWord } from '../Translations/Translate';

class InstitutionProfileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: "",
      Name: "",
      Location: "",
      CurrentBalance: "",
      ChatCode: ""
    }

    this.changeName = this.changeName.bind(this);
    this.changeLocation = this.changeLocation.bind(this);

    this.validateName = this.validateName.bind(this);
    this.changeLocation = this.changeLocation.bind(this);

  }

  changeName(event) {
    this.setState({ Name: event.target.value });
    console.log(this.state.Name)
  }

  changeLocation(event) {
    this.setState({ Location: event.target.value });
  }


  validateName() {
    return this.state.Name.length > 0;
  }

  validateLocation() {
    return this.state.Location.length > 0;
  }

  componentDidMount() {
    const body = {
      Token: getCookie('token')
    }
    fetch(baseUrl + "/Institution/GetById",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Token': getCookie('token'),
          'InstitutionId': getCookie('institutionId'),
          'Role': getCookie('role'),
          'Content-Type': 'application/json; charset=UTF-8',

        },
        credentials: 'same-origin'
      })
      .then(result => result.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            Id: result.id,
            Name: result.name,
            Location: result.location,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )

    fetch(baseUrl + "/Wallet/GetByInstitutionId",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Token': getCookie('token'),
          'InstitutionId': getCookie('institutionId'),
          'Role': getCookie('role'),
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'same-origin'
      })
      .then(result => result.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            CurrentBalance: result.currentBalance,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )

    fetch(baseUrl + `/Chat/CreateChatCode`, {
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
      .then(result => result.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            ChatCode: result.chatCode,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }

  updateProfile() {
    const body = {
      Id: this.state.Id,
      Name: this.state.Name,
      Location: this.state.Location,
    }
    fetch(baseUrl + `/Institution/UpdateProfile`, {
      method: 'PUT',
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
  }

  handleSubmit = event => {
    if (this.validateName() && this.validateLocation()) {
      this.updateProfile();
      event.preventDefault();
    } else {
      alert("не всі поля заповнені вірно");
    }

  }



  render() {
    return (
      <div>
        <div className="default-div">

          <Form >

            <Form.Group controlId="formBasicId">
              <Form.Label>{SetWord("Id")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={SetWord("Id")}
                value={this.state.Id}
                readOnly />

            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>{SetWord("Institution name")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={SetWord("Enter Institution name")}
                value={this.state.Name}
                onChange={this.changeName} />
            </Form.Group>

            <Form.Group controlId="formBasicLocation">
              <Form.Label>{SetWord("Location")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={SetWord("Enter location")}
                value={this.state.Location}
                onChange={this.changeLocation} />
            </Form.Group>

            <button className="default-button" onClick={this.handleSubmit}>
              {SetWord("Confirm")}
            </button>
          </Form>
        </div>

        <div className="default-div">
          <Form >

            <Form.Group controlId="formBasicCurrentBalance">
              <Form.Label>{SetWord("Current Balance")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={SetWord("Current Balance")}
                value={this.state.CurrentBalance}
                readOnly />

            </Form.Group>
            {availableButtons()}
          </Form>
        </div>

        {availableEmployees()}

        <div className="default-div">

          <h4>{SetWord("Chat code")}</h4>

          <span className="chat-code-container">
            {this.state.ChatCode}
          </span>

        </div>

        <div className="default-div">

          <h4>{SetWord("My chats")}</h4>

          <Link to={`/myChats/`}>
            <button className="default-button">
              {SetWord("View")}
            </button>
          </Link>

        </div>

      </div>
    );
  }
}

function availableButtons() {
  if (getCookie('role') === 'admin') {
    return (
      <Form>

        <Link to={`/topUpBalance`}>
          <button className="default-button">
            {SetWord("Top up balance")}
          </button>
        </Link>

        <Link to={`/paymentHistory`}>
          <button className="default-button">
            {SetWord("Transaction history")}
          </button>
        </Link>

      </Form>
    )
  }
}

function availableEmployees() {
  if (getCookie('role') === 'admin') {
    return (
      <div className="default-div">
        <Form >

          <h4>{SetWord("Employees")}</h4>

          <Link to={`/employeesOfTheInstitution`}>
            <button className="default-button">
              {SetWord("View employees")}
            </button>
          </Link>

          <Link to={`/addAnEmployee`}>
            <button className="default-button">
              {SetWord("Add an employee")}
            </button>
          </Link>

        </Form>
      </div>
    )
  }
}
export default InstitutionProfileComponent;
