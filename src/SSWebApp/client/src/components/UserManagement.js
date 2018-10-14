import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { set } from 'mongoose';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-modal';

import { Button } from 'react-bootstrap';

const axios = require('axios');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('body')
class UserManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            modalIsOpen: false,
            userNumber: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            phoneNumber: '',
        }
        this.performCardAction = this.performCardAction.bind(this)
        this.setUserNumberState = this.setUserNumberState.bind(this)
        this.setFirstNameState = this.setFirstNameState.bind(this)
        this.setLastNameState = this.setLastNameState.bind(this)
        this.setEmailAddressState = this.setEmailAddressState.bind(this)
        this.setPhoneNumberState = this.setPhoneNumberState.bind(this)


        this.openCardActionModal = this.openCardActionModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

        this.columns = [
            { dataField: 'userNumber', text: 'User Number', sort: true },
            { dataField: 'firstName', text: 'First Name', sort: true },
            { dataField: 'emailAddress', text: 'Email Address', sort: true },
            { dataField: 'cardId.cardNumber', text: 'Card Number', sort: true }
        ]
    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }
    componentDidMount() {
        this.updateTableData()
    }
    openCardActionModal(action) {
        this.setState({
            modalIsOpen: true,
            cardAction: action
        });
    }
    updateTableData() {
        console.log("Updating table data")
        axios.get('/api/users/')
            .then(resp => {
                console.log(resp.data)
                this.setState({
                    users: resp.data
                })
            })
    }

    performCardAction() {
        switch (this.state.cardAction) {
            case "Add User":
                console.log("Add Card action was chosen")
                axios.post('/api/users/addUser/', { userNumber: this.state.userNumber, firstName: this.state.firstName, lastName: this.state.lastName, emailAddress: this.state.emailAddress, phoneNumber : this.state.phoneNumber })
                .then(res => {
                    console.log("Card created")
                })
                break;
            case "Assign Card To User": 
                console.log("Assign Card to User was Assigned")
                axios.post('/api/addOwnership')

            default:
                console.log("Unknown action")
                break;
            //setTimeout(f => function({ this.updateTableData(); console.log("Updating table data") }), 1500);
        }
        this.closeModal()
        // TODO: Update interface 
        //setTimeout(this.updateTableData, 3000);

    }

    setUserNumberState(val) {
        let hello = this.setState({userNumber: val.target.value})
        console.log('asdfsadfdsd' +hello)  
    }

    setFirstNameState(val) {
        this.setState({ firstName: val.target.value })
    }
    setLastNameState(val) {
        this.setState({ lastName: val.target.value })
    }
    setEmailAddressState(val) {
        this.setState({ emailAddress: val.target.value })
    }
    setPhoneNumberState(val) {
        this.setState({ phoneNumber: val.target.value })
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(res => {
                console.log(res.data)
                this.setState({
                    users: res.data
                })
            })
    }
    render() {
        return (
            <div style={{ marginRight: 50 }}>
                <center><div><h1>User Management</h1></div></center>
                <BootstrapTable keyField='_id' data={this.state.users} columns={this.columns} />

                <Button onClick={this.openCardActionModal.bind(this, 'Add User')} bsStyle="primary">Add User</Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Example"
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <p>Add user</p>
                    <Form>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">User Number</label>
                            <FormControl
                                type="text"
                                placeholder="User Number"
                                value={this.state.userNumber}
                                onChange={this.setUserNumberState} />
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlInput1">First Name</label>
                            <FormControl
                                type="text"
                                placeholder="First Name"
                                value={this.state.firstName}
                                onChange={this.setFirstNameState} />
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlInput1">Last Name</label>
                            <FormControl
                                type="text"
                                placeholder="Last Name"
                                value={this.state.lastName}
                                onChange={this.setLastNameState} />
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlInput1">Email Address</label>
                            <FormControl
                                type="text"
                                placeholder="Email Address"
                                value={this.state.emailAddress}
                                onChange={this.setEmailAddressState} />
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlInput1">Phone Number</label>
                            <FormControl
                                type="text"
                                placeholder="Phone Number"
                                value={this.state.phoneNumber}
                                onChange={this.setPhoneNumberState} />
                        </div>



                        <div>
                            <center style={{ marginTop: 10 }}>
                                <Button onClick={this.performCardAction} bsStyle="primary">{this.state.cardAction}</Button>
                            </center>
                        </div>
                    </Form>

                </Modal>
            </div>


        )
    }
}

export default UserManagement;