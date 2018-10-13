import React, { Component } from 'react';
import { Link } from "react-router-dom";
import  BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Dirent } from 'fs';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
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
        console.log("correctpage")
        super(props)
        this.state = {
                        cards: [], 
                        modalIsOpen: false,
                        cardNumber: '',
                        cardAction: ''
                    }

        this.performCardAction = this.performCardAction.bind(this)
        this.setCardNumberState = this.setCardNumberState.bind(this)
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
                dataField: 'userId',
                text: 'User ID',
                sort: true
            }
        ];
    }
    closeModal()
    {
        this.setState({modalIsOpen:false})
    }
    componentDidMount()
    {
        axios.get('/api/cards/')
        .then(resp => 
            {
                console.log(resp.data)
                this.setState({
                cards: resp.data
                })
            })
    }
    openCardActionModal(action) {
        this.setState({
                            modalIsOpen: true,
                            cardAction: action
                        });
    }

    performCardAction() {
        switch (this.state.cardAction)
        {
            case "Add Card":
                console.log("Add Card action was chosen")
                axios.post('/api/cards/create/' + this.state.cardNumber).then(res => {
                        console.log("Card created")
                    })
                break;
            case "Block Card":
                axios.get('/api/cards/blockCard/' + this.state.cardNumber).then(res => {
                        console.log("Card blocked")
                    })
                break;
            case "Unblock Card":
                    
                break;
            case "Delete Card":
                    break;
            default:
                console.log("Unknown action")
        }
        this.closeModal()

        
    }
    setCardNumberState(val)
    {
        this.setState({cardNumber: val.target.value})
    }
    render() {
        return (
            
            <div style={{marginRight: 50}}>
            <center><div><h1>Card Management</h1></div></center>
            <BootstrapTable keyField='_id' data={ this.state.cards } columns={ this.columns } />
            <div style={{display: "flex", justifyContent:"space-around", flexWrap: "wrap"}}>
            <Button onClick={this.openCardActionModal.bind(this, 'Add Card')}  bsStyle="primary">Add Card</Button>
            <Button onClick={this.openCardActionModal.bind(this, 'Block Card')} bsStyle="primary">Block Card</Button>
            <Button onClick={this.openCardActionModal.bind(this, 'Unblock Card')} bsStyle="primary">Unblock Card</Button>
            <Button onClick={this.openCardActionModal.bind(this, 'Delete Card')} bsStyle="primary">Delete Card</Button>
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
                            <Button onClick={this.performCardAction} bsStyle="primary">{this.state.cardAction}</Button>
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
