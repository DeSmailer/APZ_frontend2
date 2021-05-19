import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SetWord } from '../Translations/Translate';
import { baseUrl, getCookie } from '../baseUrl';
import { DataGrid } from "@material-ui/data-grid"


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
      currentRow:""
    }

    this.dataGridDemo = this.dataGridDemo.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.setSelection = this.setSelection.bind(this);
  }

  setSelection(row) {
    this.setState({ currentRow: row });
    console.log(this.state.currentRow)
  }

  signInLikeEmployee() {
    console.log(this.state.currentRow.role)
    console.log(this.state.currentRow.institutionId)
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
            this.setState({ selectionRowId: newSelection.selectionModel});
            this.setSelection(this.state.rows[this.state.selectionRowId]);
            
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
          <Link to={`/institutionProfile`}>
          <button className="default-button" onClick={this.signInLikeEmployee}>
            {SetWord("View institution")}
          </button>
          </Link>
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
    fetch(baseUrl + `/InstitutionEmployee/GetUserJobs`, {
      method: "GET",
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