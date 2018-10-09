import React, { Component } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { FormControl, FormGroup, ControlLabel, FieldGroup, Button } from 'react-bootstrap'

const axios = require('axios');


class AddNewUser extends Component {
    constructor(props) {
        super(props)

        this.setState = {firstName:"First Name"}
        
    }

    handleFirstNameChange (e) {
        this.setState({firstName: e.target.value});
    }

    handleSubmit() {
        console.log('hello');
    }

    componentDidMount() {
        axios.post('/api/users')
            .then(res => {
                console.log(res.data)
                this.setState({
                    users: res.data
                })
            })
    };

    


    render() {
        return (
            <div>
                <form>
                    <input type="text" name="firstName" value={this.state.firstName} onChange= {this.handleFirstNameChange} />
                    <button type="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    };

}

export default AddNewUser;