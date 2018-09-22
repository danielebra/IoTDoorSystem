import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table-next';



const axios = require('axios');

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        console.log("Making API request");
        axios.get('/api/users')
            .then(
                // const users = response.data.map(obj => obj.data);
                // const users = response.data;
                response => response.data,
                // console.log(response)
            )
            .then(data => this.setState({ firstName: data.firstName, lastName: data.lastName }))
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        //TODO: Get this .map thing working, then the json data could be shown in a table foraat

        // const data = this.state.userList.Data;

        return (
            <div>
                <ul>
                    {
                        this.state.data.map(function (user) {
                            return (
                                // <table className={table}>
                                // <tr>

                                //     <td>{user.firstName}</td>
                                //     <td>{user.lastName}</td>
                                //     <td>{user.phoneNumber}</td>
                                // </tr></table>
                                // <BootstrapTable data={data} striped hover>
                                //     <TableHeaderColumn isKey dataField='userId'>User ID</TableHeaderColumn>
                                //     <TableHeaderColumn dataField='firstName'>Fist Name</TableHeaderColumn>
                                //     <TableHeaderColumn dataField='lastName'>Last Price</TableHeaderColumn>
                                // </BootstrapTable> ,
                                // document.getElementById('basic')
                                <div></div>

                            );
                        })
                    }
                </ul>
            </div>
        )
    }
    
}

export default Users;