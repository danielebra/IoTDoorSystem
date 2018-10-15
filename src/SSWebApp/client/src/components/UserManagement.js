import React, { Component } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-modal';
import FlashMassage from 'react-flash-message'

import { Button} from 'react-bootstrap';

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
            message: '',
            cardNumber: '',
            alertIsOpen: false,
            alertStyle: 'alert alert-success'
        }
        this.performCardAction = this.performCardAction.bind(this)
        this.setUserNumberState = this.setUserNumberState.bind(this)
        this.setFirstNameState = this.setFirstNameState.bind(this)
        this.setLastNameState = this.setLastNameState.bind(this)
        this.setEmailAddressState = this.setEmailAddressState.bind(this)
        this.setPhoneNumberState = this.setPhoneNumberState.bind(this)

        this.setCardNumberState = this.setCardNumberState.bind(this)
        this.setUserNumberState = this.setUserNumberState.bind(this)
        this.validateAndExecute = this.validateAndExecute.bind(this)

        this.openCardActionModal = this.openCardActionModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

        this.columns = [
            { dataField: 'userNumber', text: 'User Number', sort: true },
            { dataField: 'firstName', text: 'First Name', sort: true },
            { dataField: 'lastName', text: 'Last Name', sort: true },
            { dataField: 'emailAddress', text: 'Email Address', sort: true },
            { dataField: 'cardId.cardNumber', text: 'Card Number', sort: true }
        ]
    }
    showAlert(msg, isSuccess) {
        this.setState({
            alertIsOpen: true,
            message: msg,
            alertStyle: isSuccess ? 'alert alert-success' : 'alert alert-warning'
        })
        setTimeout(this.closeAlert.bind(this), 2000);

    }
    validateAndExecute = (validateArray, executionFunction) => {
        let invalidFields = []
        validateArray.forEach((item) => {
            if (this.state[item] == "" || this.state[item] == undefined) {
                invalidFields.push(item)
            }
        })
        if (invalidFields.length > 1) {
            this.setState({modalIsOpen:false})
            this.showAlert("The Fields " + invalidFields.toString() + " is required",false)
        } else {
            executionFunction()
        }
    }

    closeAlert() {
        this.setState({
            alertIsOpen: false
        })
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
                axios.post('/api/users/addUser/', { userNumber: this.state.userNumber, firstName: this.state.firstName, lastName: this.state.lastName, emailAddress: this.state.emailAddress, phoneNumber: this.state.phoneNumber })
                    .then((res, err) => {
                        console.log(res)
                        if (err) {
                            console(err)
                            this.showAlert(err)
                        } if (res) {
                            if (res.data.success === undefined) {
                                console.log('New Card is Added')
                                this.showAlert("New Card Added", true)
                            }
                            else {
                                this.showAlert("Card Not Added", false)
                            }
                        } else {
                            this.showAlert("Card not added", false)
                            console.log('New Card is Added')
                        }
                    })
                break;
            case "Assign Card To User":
                console.log("Assign Card To User to User was Assigned")
                axios.post('/api/addOwnership/' + this.state.cardNumber + '/' + this.state.userNumber).then((res, err) => {
                    console.log("Inside assign card to user")
                    if (err) {
                        console.log("INSIDE")
                        this.showAlert(err, false)
                        console(err)
                    } if (res) {
                        console.log(res)
                        if (res.data.success === false || res.data === "No User Number Found") {
                            this.showAlert("Failed to assign card to user", false)
                        }
                        else {
                            this.showAlert("Assigned card to user", true)
                        }
                        console.log('Card is assigned to user')
                    } else {
                        console.log('Fail to assign card to user')
                        this.showAlert("Failed to assign card to user", false)
                    }
                }).catch((err) => {
                    this.showAlert("Failed to assign card to user", false)
                })
                break;
            case "Delete User":
                console.log(this.state.userNumber)
                console.log("Remove User was chosen")
                axios.post('/api/users/removeUser/' + this.state.userNumber).then((res, err) => {
                    if (err) {
                        console(err)
                        this.showAlert(err, false)
                    } if (res) {
                        console.log('User is removed')
                        this.showAlert("User successfully removed", true)
                    } else {
                        console.log('Fail to remove user')
                        this.showAlert("Failed to remove user", false)
                    }
                }).catch((err) => {
                    this.showAlert("User not found. Unable to delete user", false)
                })
                break;

            default:
                console.log("Unknown action")
                break;
        }
        this.closeModal()
        console.log("Updating table")
        setTimeout(this.updateTableData.bind(this), 3000);

    }

    setUserNumberState(val) {
        this.setState({ userNumber: val.target.value })
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
    setCardNumberState(val) {
        this.setState({ cardNumber: val.target.value })
    }
    render() {
        return (
            <div style={{ marginRight: 50 }}>
                {this.state.alertIsOpen &&
                    <FlashMassage persistOnHover={true} >
                        <div class={this.state.alertStyle} role="alert">{this.state.message}</div>
                    </FlashMassage>}

                <center><div><h1>User Management</h1></div></center>
                <p>Amount of Users: {this.state.users.length}</p>
                <BootstrapTable keyField='_id' data={this.state.users} columns={this.columns} />
                <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                    <Button onClick={this.openCardActionModal.bind(this, 'Add User')} bsStyle="primary">Add User</Button>
                    <Button onClick={this.openCardActionModal.bind(this, 'Assign Card To User')} bsStyle="primary">Assign Card To User</Button>
                    <Button onClick={this.openCardActionModal.bind(this, 'Delete User')} bsStyle="danger">Delete User</Button>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen && this.state.cardAction === 'Add User'}
                    contentLabel="Example"
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={true}>

                    <p>Add user</p>
                    <Form>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">User Number</label>
                            <FormControl
                                type="text"
                                ref="userNumber"
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
                                <Button onClick={()=>this.validateAndExecute(['userNumber','firstName','lastName','emailAddress', 'phoneNumber'],this.performCardAction)} bsStyle="primary">{this.state.cardAction}</Button>
                            </center>
                        </div>
                    </Form>

                </Modal>

                <Modal
                    isOpen={this.state.modalIsOpen && this.state.cardAction === 'Assign Card To User'}
                    contentLabel="Example"
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <p>Assign Card To User</p>
                    <Form>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">User Number</label>
                            <FormControl
                                type="text"
                                placeholder="User Number"
                                value={this.state.userNumber}
                                onChange={this.setUserNumberState}
                            />
                        </div>

                        <div class="form-group">
                            <label for="exampleFormControlInput1">Card Number</label>
                            <FormControl
                                type="text"
                                placeholder="Card Number"
                                value={this.state.cardNumber}
                                onChange={this.setCardNumberState} />
                        </div>

                        <div>
                            <center style={{ marginTop: 10 }}>
                                <Button onClick={()=>this.validateAndExecute(['userNumber', 'cardNumber'],this.performCardAction)} bsStyle="primary">{this.state.cardAction}</Button>
                            </center>
                        </div>
                    </Form>

                </Modal>
                <Modal
                    isOpen={this.state.modalIsOpen && this.state.cardAction === "Delete User"}
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={true}
                >
                    <Form>
                        <p>Delete User</p>
                        <div class="form-group">
                            <label for="exampleFormControlInput1">User Number</label>
                            <FormControl
                                type="text"
                                placeholder="User Number"
                                value={this.state.userNumber}
                                onChange={this.setUserNumberState} />
                        </div>

                        <div>
                            <center style={{ marginTop: 10 }}>
                                <Button onClick={()=>this.validateAndExecute(['userNumber',],this.performCardAction)} bsStyle="danger">{this.state.cardAction}</Button>
                            </center>
                        </div>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default UserManagement;