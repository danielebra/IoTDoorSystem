import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';



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
        console.log("Making API request");
        axios.get('/api/users')
            .then(
                // const users = response.data.map(obj => obj.data);
                // const users = response.data;
                response => response.data,
                // console.log(response)
            )
            .then(data => this.setState({ data }))
            .catch((err) => {
                console.log(err);
            })
    }

    

    render() {
        //TODO: Get this .map thing working, then the json data could be shown in a table foraat

        // const data = this.state.userList.Data;

        return (
            // <div>asdfasdfd</div>
            <BootstrapTable keyField='_id' data={ this.state.data } columns={ this.columns } />
        )
    }

}

export default Users;