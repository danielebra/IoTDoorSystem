import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { set } from 'mongoose';

import { Button } from 'react-bootstrap';

const axios = require('axios');

class UserManagement extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            users: []
        }
        
        this.columns = [
            {dataField:'firstName', text:'First Name',sort: true},
            {dataField:'emailAddress', text:'Email Address', sort: true},
            {dataField:'cardId', text:'Card Id', sort: true}
        ] 
    }
    
    componentDidMount() {
        axios.get('/api/users/')
        .then(res => {
            console.log(res.data)
            this.setState({
                users: res.data
            })
        })
    }
    render() {
        return (
            <div style={{marginRight: 50}}>
            <center><div><h1>User Management</h1></div></center>
            <BootstrapTable keyField='_id' data={ this.state.users } columns={ this.columns } />
            
            <Button bsStyle="primary" href='/AddNewUser'>Add New User</Button>
            </div>

            
        )
    }
}

export default UserManagement;