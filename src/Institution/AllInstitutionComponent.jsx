import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl, getCookie } from '../baseUrl';
import { SetWord } from '../Translations/Translate';

class AllInstitutionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Id: 'Id',
            columns: [
                { field: 'name', headerName: SetWord('InstitutionName'), width: 400 },
                { field: 'location', headerName: SetWord('Location'), width: 900 }
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
                name: element.name,
                location: element.location,
            };
            i++;
        });
        return res;
    }

    componentDidMount() {

        fetch(baseUrl + `/Institution/Get`, {
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

export default AllInstitutionComponent;