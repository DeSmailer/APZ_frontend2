import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { baseUrl, getCookie } from '../baseUrl';
import { Link } from 'react-router-dom';
import { SetWord } from '../Translations/Translate';
import moment from "moment";
import Cookies from 'js-cookie';

class UserProfileComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Id: "",
      Name: "",
      Surname: "",
      Feature: "",
    }

    this.changeName = this.changeName.bind(this);
    this.changeSurname = this.changeSurname.bind(this);
    this.changeFeature = this.changeFeature.bind(this);

    this.validateName = this.validateName.bind(this);
    this.validateSurname = this.validateSurname.bind(this);
    this.validateFeature = this.validateFeature.bind(this);


    this.setLanguageUA = this.setLanguageUA.bind(this);
    this.setLanguageEN = this.setLanguageEN.bind(this);

    this.exportExcel = this.exportExcel.bind(this);
  }

  changeName(event) {
    this.setState({ Name: event.target.value });
    console.log(this.state.Name)
  }
  changeSurname(event) {
    this.setState({ Surname: event.target.value });
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
  validateFeature() {
    return this.state.Feature.length > 0;
  }

  setLanguageUA() {
    document.cookie = "lang=UA";
    window.location.reload();
  }
  setLanguageEN() {
    document.cookie = "lang=EN";
    window.location.reload();
  }

  updateProfile() {
    const body = {
      Id: this.state.Id,
      Name: this.state.Name,
      Surname: this.state.Surname,
      Feature: this.state.Feature,
    }
    fetch(baseUrl + `/User/UpdateProfile`, {
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
      .then(
        (response) => {
          alert("Ok")
        },
      );
  }

  handleSubmit = event => {
    if (this.validateName() === true && this.validateSurname() && this.validateFeature()) {
      this.updateProfile();
      event.preventDefault();
    } else {
      alert("не всі поля заповнені вірно");
    }

  }

  componentDidMount() {
    const body = {
      Token: getCookie('token')
    }
    fetch(baseUrl + "/User/GetByToken",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          /*'Token': getCookie('token'),
        'InstitutionId': getCookie('institutionId'),
        'Role': getCookie('role'),*/
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
            Surname: result.surname,
            Feature: result.feature,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  logOut() {
    Cookies.remove('token');
    Cookies.remove('institutionId');
    Cookies.remove('role');
    Cookies.remove('chatToken');
    Cookies.remove('chatId');
  }

  exportExcel() {
    fetch(baseUrl + "/ExportImport/Export", {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      credentials: 'same-origin'
    })
      .then(response => response.blob())
      .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "db" + moment().format("DD-MM-YYYY hh:mm:ss") + ".xlsx";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();  //afterwards we remove the element again
      });

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

            <Form.Group controlId="formGridFeature">
              <Form.Label>{SetWord("Feature")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={SetWord("Enter feature")}
                value={this.state.Feature}
                onChange={this.changeFeature} />
            </Form.Group>

            <button onClick={this.handleSubmit} className="default-button">
              {SetWord("Confirm")}
            </button>

            <Link to={`/signIn`}>
            <button onClick={this.logOut} className="default-button">
              {SetWord("LogOut")}
            </button>
          </Link>
            
          </Form>


        </div>
        <div className="default-div">
          <h3>{SetWord("Interface language")}</h3>
          <button onClick={this.setLanguageUA} className="language-button">
            UA
          </button>
          <button onClick={this.setLanguageEN} className="language-button">
            EN
          </button>
        </div>

        <div className="default-div">
          <h3>{SetWord("My institutions")}</h3>
          <Link to={`/userInstitutions/`}>
            <button className="default-button">
              {SetWord("View")}
            </button>
          </Link>
        </div>

        <div className="default-div">
          <h3>{SetWord("Export/Import")}</h3>
          <button onClick={this.exportExcel} className="language-button">
            {SetWord("Export")}
          </button>
        </div>
      </div>


    );
  }
}
export default UserProfileComponent;
