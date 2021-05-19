import React, { Component } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { baseUrl, getCookie } from '../baseUrl';
import { SetWord } from '../Translations/Translate';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

class AllInstitutionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.handleSortColumn = this.handleSortColumn.bind(this);
    }

    getData() {
        const { data, sortColumn, sortType } = this.state;

        if (sortColumn && sortType) {
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return data;
    }

    handleSortColumn(sortColumn, sortType) {
        this.setState({
            loading: true
        });

        setTimeout(() => {
            this.setState({
                sortColumn,
                sortType,
                loading: false
            });
        }, 500);
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
                        data: result
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
            <div>
                <div style={{ height: '100%'}}>
                    <Table
                        height={640}
                        data={this.getData()}
                        sortColumn={this.state.sortColumn}
                        sortType={this.state.sortType}
                        onSortColumn={this.handleSortColumn}
                        loading={this.state.loading}
                        onRowClick={data => {
                            console.log(data);
                        }}
                    >
                        <Column width={300} align="left" resizable sortable>
                            <HeaderCell>{SetWord('InstitutionName')}</HeaderCell>
                            <Cell dataKey="name" />
                        </Column>

                        <Column width={300} align="left" sortable>
                            <HeaderCell>{SetWord('Location')}</HeaderCell>
                            <Cell dataKey="location" />
                        </Column>

                    </Table>
                </div>
                
            </div>
        );
    }
}

export default AllInstitutionComponent;