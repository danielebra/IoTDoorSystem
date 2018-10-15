import React, { Component } from 'react';
import  BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import paginationFactory from 'react-bootstrap-table2-paginator';
import FlashMassage from 'react-flash-message'

const axios = require('axios');

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('body')
class CardManagement extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
                        cards: [], 
                        modalIsOpen: false,
                        cardNumber: '',
                        cardAction: '',
                        message: '',
                        alertIsOpen: false,
                        alertStyle: 'alert alert-success'

                    }

        this.performCardAction = this.performCardAction.bind(this)
        this.setCardNumberState = this.setCardNumberState.bind(this)
        this.validateAndExecute = this.validateAndExecute.bind(this)
        this.openCardActionModal = this.openCardActionModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.columns = [
            {
                dataField: 'cardNumber',
                text: 'Card Number',
                sort: true
            }, 
            {
                dataField: 'isActive',
                text: 'Enabled',
                sort: true
            },
            {
                dataField: 'userId.userNumber',
                text: 'User Number',
                sort: true
            }
        ];
    }
    validateAndExecute = (validateArray, executionFunction) => {
        let invalidFields = []
        validateArray.forEach((item) => {
            if (this.state[item] === "") {
                invalidFields.push(item)
            }
        })
        if (invalidFields.length > 0) {
            this.setState({modalIsOpen:false})
            this.showAlert("The Fields " + invalidFields.toString() + " is required",false)
        } else {
            executionFunction()
        }
    }
    showAlert(msg, isSuccess)
    {
        this.setState({
            alertIsOpen: true,
            message: msg,
            alertStyle: isSuccess ? 'alert alert-success' : 'alert alert-warning'
        })
        setTimeout(this.closeAlert.bind(this), 5000);

    }
    closeAlert()
    {
        this.setState({
            alertIsOpen: false
        })
    }
    closeModal()
    {
        this.setState({modalIsOpen:false})
    }
    componentDidMount()
    {
        this.updateTableData()
    }
    openCardActionModal(action) {
        this.setState({
                            modalIsOpen: true,
                            cardAction: action
                        });
    }
    updateTableData()
    {
        console.log("Updating table data")
        axios.get('/api/cards/')
        .then(resp => 
            {
                console.log(resp.data)
                this.setState({
                cards: resp.data
                })
            })
    }
    performCardAction() {
        switch (this.state.cardAction)
        {
            case "Add Card":
                console.log("Add Card action was chosen")
                axios.post('/api/cards/create/' + this.state.cardNumber).then((res, err) => {
                    if (err) {
                        console(err)
                        this.setState({
                            message: err
                        })
                    } if (res) {
                        this.showAlert("Card successfully added", true)
                    } else {
                        console.log('Fail')
                        this.showAlert("Failed to add card", false)
                    }
                }).catch((err) => {
                    this.showAlert("Failed to add card", false)
                })
                break;
            case "Block Card":
                axios.get('/api/cards/blockCard/' + this.state.cardNumber).then((res, err) => {
                    if (err) {
                        console(err)
                        this.showAlert(err, false)
                    } if (res) {
                        console.log(res)
                        console.log('Success')
                        this.showAlert(res.data, true)
                    } else {
                        console.log('Fail')
                        this.showAlert("Failed to block card")
                    }
                }).catch((err) => {
                    this.showAlert("Failed to block card", false)
                })
                break;
            case "Unblock Card":
                axios.get('/api/cards/unblockCard/' + this.state.cardNumber).then((res, err) => {
                    if (err) {
                        console(err)
                        this.showAlert(err, false)
                    } if (res) {
                        this.showAlert(res.data, true)
                        console.log('Success')
                    } else {
                        console.log('Fail')
                        this.showAlert("Failed to unblock card", false)
                    }
                }).catch((err) =>
                {
                    this.showAlert("Failed to unblock card. Does the card exist?")
                })
                break;
            case "Delete Card":
                axios.get('/api/cards/deleteCard/' + this.state.cardNumber).then((res, err) => {
                    if (err) {
                        console(err)
                        this.showAlert(err, false)
                    } if (res) {
                        console.log(res)
                        this.showAlert(res.data.message, true)
                    } else {
                        console.log('Fail')
                        this.showAlert("Failed to delete card", false)
                    }
                }).catch((err) =>
                {
                    this.showAlert("Failed to delete card. Does the card exist?")
                })
                    break;
            default:
                console.log("Unknown action")
                break;
        }
        this.closeModal()
        setTimeout(this.updateTableData.bind(this), 1000);
        
    }
    setCardNumberState(val)
    {
        this.setState({cardNumber: val.target.value})
    }
    render() {
        return (
            
            <div style={{marginRight: 50}}>
            {this.state.alertIsOpen &&
            <FlashMassage persistOnHover={true} >
                <div class={this.state.alertStyle} role="alert">{this.state.message}</div>
                </FlashMassage>}

            <center><div><h1>Card Management</h1></div></center>
            <p>Amount of Cards: {this.state.cards.length}</p>
            <BootstrapTable keyField='_id' data={ this.state.cards } columns={ this.columns } pagination={ paginationFactory() }/>
            <div style={{display: "flex", justifyContent:"space-around", flexWrap: "wrap"}}>
            <Button onClick={this.openCardActionModal.bind(this, 'Add Card')}  bsStyle="primary">Add Card</Button>
            <Button onClick={this.openCardActionModal.bind(this, 'Block Card')} bsStyle="primary">Block Card</Button>
            <Button onClick={this.openCardActionModal.bind(this, 'Unblock Card')} bsStyle="primary">Unblock Card</Button>
            <Button onClick={this.openCardActionModal.bind(this, 'Delete Card')} bsStyle="danger">Delete Card</Button>
            <Modal
                isOpen={this.state.modalIsOpen}
                contentLabel="Example"
                style={customStyles}
                onRequestClose={this.closeModal}
                shouldCloseOnOverlayClick={true} 
                >
                <p>Perform Action</p>
                <Form>
                   <div> 
                            <FormControl
                            type="text"
                            placeholder="Card Number"
                            value={this.state.cardNumber}
                            onChange={this.setCardNumberState}
                            />
                        <center style={{marginTop:10}}>
                            <Button onClick={()=>this.validateAndExecute(['cardNumber'],this.performCardAction)} bsStyle="primary">{this.state.cardAction}</Button>
                        </center>
                        </div>
                </Form>
                </Modal>
                
            </div>
            </div>
            )
    }
}

export default CardManagement;
