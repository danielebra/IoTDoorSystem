import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import paginationFactory from 'react-bootstrap-table2-paginator';
// THIS PAGE IS REDUNDANT DUE TO UserManagement

const axios = require('axios');

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
        data: []
        // {userId:'hadsfdasdsa',firstName:'asdf',lastName:'asdffa'}
        }
        this.columns = [{
            dataField: '_id',
            text: 'User ID',
            sort: true
        }, {
            dataField: 'firstName',
            text: 'First Name',
            sort: true
        }, {
            dataField: 'lastName',
            text: 'Last Name',
            sort: true
        }];
    }

    


    componentDidMount() {
        axios.get('/api/users')
            .then(
                response => response.data,
            )
            .then(data => this.setState({ data }))
            .catch((err) => {
                console.log(err);
            })
    }

    

    render() {

        return (
            <BootstrapTable keyField='_id' data={ this.state.data } columns={ this.columns } pagination={ paginationFactory() }/>
        )
    }

}

export default Users;