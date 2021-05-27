import React, { Component } from 'react';
import { SetWord, ToEN } from '../Translations/Translate';
import { baseUrl, getCookie } from '../baseUrl';
import { DataGrid } from "@material-ui/data-grid"



class EmployeesOfTheInstitutionComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { field: 'institutionEmployeeId', headerName: SetWord(`InstitutionEmployeeId`), width: 160 },
        { field: 'institutionId', headerName: SetWord('InstitutionId'), width: 160 },
        { field: 'institutionName', headerName: SetWord('InstitutionName'), width: 260 },
        { field: 'userId', headerName: SetWord('UserId'), width: 160 },
        { field: 'userName', headerName: SetWord('UserName'), width: 200 },
        { field: 'userSurname', headerName: SetWord('UserSurname'), width: 200 },
        { field: 'role', headerName: SetWord('Role'), width: 160 },
        { field: 'isWorking', headerName: SetWord('IsWorking'), width: 160 }
      ],
      rows: [],
      currentRow: {
        id: -1
      },
      woring: "",
      selectionRowId: "",
      currentRow: "",
      isLoaded: false,
      canRedirect: false
    }

    this.dataGridDemo = this.dataGridDemo.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.reinstate = this.reinstate.bind(this);
    this.renderViewButton = this.renderViewButton.bind(this);
  }

  setSelection(row) {
    this.setState({ currentRow: row });
    if (this.state.currentRow !== "" && this.state.currentRow !== undefined) {
      this.setState({
        canRedirect: true
      });
    }
    console.log(row)
    this.componentDidMount()
  }

  renderViewButton() {
    if (this.state.canRedirect) {
      return (
        <div>
          <button className="default-button" onClick={this.dismiss}>
            {SetWord("Dismiss")}
          </button>
          <button className="default-button" onClick={this.reinstate}>
            {SetWord("Reinstate")}
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="default-button">
            {SetWord("Double click on the line")}
          </button>
          <button className="default-button">
            {SetWord("Double click on the line")}
          </button>
        </div>
      )
    }

  }

  dismiss() {
    const body = {
      InstitutionId: this.state.currentRow.institutionId - 0,
      UserId: this.state.currentRow.userId,
      Role: ToEN(this.state.currentRow.role),
    }
    fetch(baseUrl + `/InstitutionEmployee/Dismiss`, {
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
            this.setState({
              canRedirect: false
            });
            this.componentDidMount()

          }
        },
        (error) => {
          alert(error);
          this.setState({
            canRedirect: false
          });
        }
      );
    this.componentDidMount()
  }

  reinstate() {
    const body = {
      InstitutionId: this.state.currentRow.institutionId - 0,
      UserId: this.state.currentRow.userId,
      Role: ToEN(this.state.currentRow.role),
    }
    fetch(baseUrl + `/InstitutionEmployee/Reinstate`, {
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
            this.setState({
              canRedirect: false
            });
            this.componentDidMount()

          }
        },
        (error) => {
          alert(error);
          this.setState({
            canRedirect: false
          });
        }
      );
    this.componentDidMount()
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
          {this.renderViewButton()}
        </div>
      </div >
    );
  }

  fillRows(result) {
    var res = [];
    var i = 0;
    result.forEach(element => {

      if (element.isWorking) {
        this.setState({
          woring: 'Working'
        })
      } else {
        this.setState({
          woring: 'NotWorking'
        })
      }
      res[i] = {
        id: i,
        institutionEmployeeId: element.id,
        institutionId: element.institutionId,
        institutionName: element.institutionName,
        userId: element.userId,
        userName: element.userName,
        userSurname: element.userSurname,
        role: SetWord(element.role),
        isWorking: SetWord(this.state.woring)
      };
      i++;
    });
    return res;
  }
  componentDidMount() {
    const body = {
      Token: getCookie('token'),
    }
    fetch(baseUrl + `/InstitutionEmployee/GetEmployeesOfTheInstitution`, {
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

export default EmployeesOfTheInstitutionComponent;