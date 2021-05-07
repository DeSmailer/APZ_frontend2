import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {  getCookie } from '../baseUrl';
import { SetWord } from '../Translations/Translate';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.setLanguageUA = this.setLanguageUA.bind(this);
    this.setLanguageEN = this.setLanguageEN.bind(this);
  }
  setLanguageUA() {
    document.cookie = "lang=UA";
    window.location.reload(); 
  }
  setLanguageEN() {
    document.cookie = "lang=EN";
    window.location.reload();
  }
  render() {
    if (getCookie('role') === 'admin' || getCookie('role') === 'employee' || getCookie('role') === 'user') {
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/homePage">{SetWord("Home")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mr-auto">
              <Nav.Link href="/allInstitution">{SetWord("All institutions")}</Nav.Link>
            </Nav>

            <Nav>
              <button onClick={this.setLanguageUA} className="language-button">
                UA
              </button>
              <button onClick={this.setLanguageEN} className="language-button">
                EN
              </button>
              <Nav.Link href="/userProfile">{SetWord("Profile")}</Nav.Link>
            </Nav>

          </Navbar.Collapse>

        </Navbar>
      );
    }

    else {
      return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/homePage">{SetWord("Home")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mr-auto">
              <Nav.Link href="/allInstitution">{SetWord("All institutions")}</Nav.Link>
            </Nav>

            <Nav>
              <button onClick={this.setLanguageUA} className="language-button">
                UA
              </button>
              <button onClick={this.setLanguageEN} className="language-button">
                EN
              </button>
              <Nav.Link href="/signUp">{SetWord("SignUp")}</Nav.Link>
              <Nav.Link href="/signIn">{SetWord("SignIn")}</Nav.Link>
            </Nav>

          </Navbar.Collapse>

        </Navbar>
      );

    }
  }
}
export default HeaderComponent;