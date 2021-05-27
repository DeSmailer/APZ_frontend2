import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SetWord } from '../Translations/Translate';
import { baseUrl, getCookie } from '../baseUrl';
import { DataGrid } from "@material-ui/data-grid"
import Cookies from "js-cookie";

class UserInstitutionsComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {

      columns: [
        { field: 'institutionId', headerName: SetWord('InstitutionId'), width: 160 },
        { field: 'institutionName', headerName: SetWord('InstitutionName'), width: 360 },
        { field: 'role', headerName: SetWord('Role'), width: 160 },
        { field: 'isWorking', headerName: SetWord('IsWorking'), width: 160 }
      ],
      rows: [],
      selectionRowId: "",
      currentRow: "",
      canRedirect: false
    }

    this.dataGridDemo = this.dataGridDemo.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.signInLikeEmployee = this.signInLikeEmployee.bind(this);
    this.renderViewButton = this.renderViewButton.bind(this);
  }

  setSelection(row) {
    this.setState({ currentRow: row });
    if (this.state.currentRow !== "" && this.state.currentRow !== undefined) {
      this.signInLikeEmployee()
    }
    console.log(row)
    this.forceUpdate();
  }

  signInLikeEmployee() {
    console.log("signInLikeEmployee")
    const body = {
      Token: getCookie('token'),
      Role: this.state.currentRow.role,
      InstitutionId: "" + this.state.currentRow.institutionId
    }
    fetch(baseUrl + `/User/LoginLikeEmployee`, {
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
      .then(response => response.json())
      .then(
        (response) => {

          Cookies.set('token', response.token);
          Cookies.set('institutionId', response.institutionId);
          Cookies.set('role', response.role);
          this.setState({
            canRedirect: true
          });
          this.forceUpdate();
        },
        (error) => {
          console.log('Post account ', error);
          alert('Your account could not be posted\nError: ' + error);
          alert('мейл' + body.Mail +
            'пароль ' + body.Password);
        }
      )
  }

  writeID() {
    return "ID=" + Cookies.get('institutionId');
  }

  renderViewButton() {
    if (this.state.canRedirect) {
      return (
        <Link to={`/institutionProfile`}>
          <button className="default-button" >
            {SetWord("View institution")} {this.writeID()}
          </button>
        </Link>
      );
    } else {
      return (
        <button className="default-button" >
          {SetWord("Double click on the line")}
        </button>
      )
    }

  }

  dataGridDemo(state) {
    return (
      <div>
        <div>

        </div>
        <div style={{ height: 620, width: '100%' }}>
          <DataGrid
            rows={state.rows}
            columns={state.columns}
            pageSize={10}
            onSelectionModelChange={(newSelection) => {
              this.setState({ selectionRowId: newSelection.selectionModel });
              this.setSelection(this.state.rows[newSelection.selectionModel]);

              console.log(newSelection)
            }}
          />

        </div>
        <div >
          <Link to={`/addInstitution`}>
            <button className="default-button" >
              {SetWord("New institution")}
            </button>
          </Link>
          {this.renderViewButton()}
        </div>
      </div >
    );
  }



  fillRows(result) {
    var res = [];
    var i = 0;
    result.forEach(element => {
      res[i] = {
        id: i,
        institutionId: element.institutionId,
        institutionName: element.institutionName,
        role: element.role,
        isWorking: SetWord("Working")
      };
      i++;
    });
    return res;
  }

  componentDidMount() {
    Cookies.remove('token', { path: '/userInstitutions' });
    Cookies.remove('institutionId', { path: '/userInstitutions' });
    Cookies.remove('role', { path: '/userInstitutions' });
    Cookies.remove('lang', { path: '/userInstitutions' });
    const body = {
      Token: getCookie('token'),
    }
    fetch(baseUrl + `/InstitutionEmployee/GetUserJobs`, {
      method: "POST",
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
      .then(result => result.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            rows: this.fillRows(result)
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }



  render() {
    return (
      this.dataGridDemo(this.state)
    );
  }
}

export default UserInstitutionsComponent;