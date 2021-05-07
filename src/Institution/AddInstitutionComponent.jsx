import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { SetWord } from '../Translations/Translate';
import { baseUrl, getCookie } from '../baseUrl';

class AddInstitutionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      Location: "",
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


  createInstitution() {
    const body = {
      Name: this.state.Name,
      Location: this.state.Location,
      OwnerToken: getCookie('token'),
    }
    fetch(baseUrl + `/Institution/Add`, {
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
    if (this.validateName() && this.validateLocation()) {
      this.createInstitution();
      event.preventDefault();
    } else {
      alert("не всі поля заповнені вірно");
    }

  }

  render() {
    return (
      <div className="default-div">

        <Form >
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

    );
  }
}
export default AddInstitutionComponent;