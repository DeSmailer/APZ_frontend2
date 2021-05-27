import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl, getCookie } from '../baseUrl';
import { Link } from 'react-router-dom';
import { SetWord } from '../Translations/Translate';
import Cookies from "js-cookie";

class MyChatsComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Id: 'Id',
            columns: [
                { field: 'chatId', headerName: 'ChatId', width: 160 },
                { field: 'initiatorId', headerName: 'InitiatorId', width: 160 },
                { field: 'initiatorName', headerName: 'InitiatorName', width: 160 },
                { field: 'initiatorSurname', headerName: 'InitiatorSurname', width: 160 },
                { field: 'recipientId', headerName: 'RecipientId', width: 160 },
                { field: 'recipienName', headerName: 'RecipienName', width: 160 },
                { field: 'recipienSurname', headerName: 'RecipienSurname', width: 160 },
                { field: 'institutionId', headerName: 'InstitutionId', width: 160 },
                //{ field: 'time', headerName: 'Time', width:260 }
            ],
            rows: [],
            selectionRowId: "",
            currentRow: "",
            canRedirect: false
        }

        this.dataGridDemo = this.dataGridDemo.bind(this);
    }

    setSelection(row) {
        this.setState({ currentRow: row });
        if (this.state.currentRow !== "" && this.state.currentRow !== undefined) {
            this.getChatToken();
        }
        console.log(row)
        this.forceUpdate();
    }

    writeID() {
        return "ID=" + Cookies.get('chatId');
    }

    renderViewButton() {
        if (this.state.canRedirect) {
            return (
                <Link to={`/institutionProfile`}>
                    <button className="default-button" >
                        {SetWord("Go to chat")} {this.writeID()}
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

    getChatToken() {
        console.log("getChatToken")
        const body = {
            Id: this.state.currentRow.chatId,
            InitiatorId: this.state.currentRow.initiatorId,
            RecipientId: this.state.currentRow.recipientId,
            InstitutionId: this.state.currentRow.institutionId
        }
        fetch(baseUrl + `/Chat/GetChatToken`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'same-origin'
        })
            .then(response => response.json())
            .then(
                (response) => {
                    Cookies.set('chatToken', response.chatToken);
                    Cookies.set('chatId', response.chatId);
                    this.setState({
                        canRedirect: true
                    });
                    this.forceUpdate();
                },
                (error) => {
                    console.log('Post account ', error);
                    alert(error);
                }
            )
    }

    dataGridDemo(state) {
        return (
            <div>
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
            res[i] = {
                id: i,
                chatId: element.id,
                initiatorId: element.initiatorId,
                initiatorName: element.initiatorName,
                initiatorSurname: element.initiatorSurname,
                recipientId: element.recipientId,
                recipienName: element.recipienName,
                recipienSurname: element.recipienSurname,
                institutionId: element.institutionId,
            };
            i++;
        });
        return res;
    }

    componentDidMount() {
        Cookies.remove('token', { path: '/myChats' });
        Cookies.remove('institutionId', { path: '/myChats' });
        Cookies.remove('role', { path: '/myChats' });
        Cookies.remove('lang', { path: '/myChats' });
        const body = {
            Token: getCookie('token'),
            Role: this.state.currentRow.role,
            InstitutionId: getCookie('institutionId'),
        }
        fetch(baseUrl + `/Chat/UserChats`, {
            method: "POST",
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

export default MyChatsComponent;