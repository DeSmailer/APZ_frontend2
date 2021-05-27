import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { SetWord } from '../Translations/Translate';
import { baseUrl } from '../baseUrl';
import Cookies from 'js-cookie';


class AddAnEmployeeComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      UserId: "",
      Role: "employee",

    }

    this.changeUserId = this.changeUserId.bind(this);
    this.changeRole = this.changeRole.bind(this);


    this.validateUserId = this.validateUserId.bind(this);
    this.validateRole = this.validateRole.bind(this);

  }

  changeUserId(event) {
    this.setState({ UserId: event.target.value });
    console.log(this.state.UserId)
  }
  changeRole(event) {
    this.setState({ Role: event.target.value });
  }


  validateUserId() {
    return this.state.UserId.length > 0;
  }
  validateRole() {
    return this.state.Role.length > 0;
  }

  AddAnEmployee() {
    const body = {
      UserId: this.state.UserId - 0,
      Role: this.state.Role,
    }
    fetch(baseUrl + `/InstitutionEmployee/Add`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Token': Cookies.get('token'),
        'InstitutionId': Cookies.get('institutionId'),
        'Role': Cookies.get('role'),
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
          alert("Помилочка");
        }
      );
  }

  handleSubmit = event => {
    if (this.validateUserId() === true && this.validateRole()) {
      this.AddAnEmployee();
      event.preventDefault();
    } else {
      alert("не всі поля заповнені вірно");
    }
  }

  render() {
    return (
      <div className="default-div">

        <Form >
          <Form.Group controlId="formBasicUserId">
            <Form.Label>{SetWord("UserId")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={SetWord("Enter UserId")}
              value={this.state.UserId}
              onChange={this.changeUserId} />
          </Form.Group>

          <Form.Group controlId="formBasicRole">
            <Form.Label>{SetWord("Role")}</Form.Label>
            <Form.Control as="select"
              onChange={this.changeRole}
              value={this.state.Role}            >
              <option>employee</option>
              <option>admin</option>
            </Form.Control>

          </Form.Group>

          <button className="default-button" onClick={this.handleSubmit}>
          {SetWord("Confirm")}
          </button>
        </Form>
      </div>

    );
  }
}
export default AddAnEmployeeComponent;
