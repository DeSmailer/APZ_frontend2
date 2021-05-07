import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl, getCookie } from '../baseUrl';
import { SetWord } from '../Translations/Translate';

class PaymentHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Id: 'Id',
            columns: [
                { field: 'transactionId', headerName: SetWord('TransactionId'), width: 300 },
                { field: 'date', headerName: SetWord('Date'), type: 'dateTime', width: 300 },
                { field: 'moneyTransaction', headerName: SetWord('MoneyTransaction'), width: 300 },
                { field: 'remainder', headerName: SetWord('Remainder'), width: 300 },
            ],
            rows: [],
            currentRow: {
                id: -1
            }
        }

        this.dataGridDemo = this.dataGridDemo.bind(this);
    }

    dataGridDemo(state) {
        return (
            <div>
                <div style={{ height: 620, width: '100%' }}>
                    <DataGrid rows={state.rows} columns={state.columns} pageSize={10} />
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
                transactionId: element.id,
                date: element.date,
                moneyTransaction: " " + element.moneyTransaction,
                remainder: element.remainder,
            };
            i++;
        });
        return res;
    }

    componentDidMount() {
        const body = {
            Token: getCookie('token')
        }
        fetch(baseUrl + `/PaymentHistory/GetByInstitutionId`, {
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

export default PaymentHistory;