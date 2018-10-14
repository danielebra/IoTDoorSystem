import React, { Component } from 'react';
import  BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import paginationFactory from 'react-bootstrap-table2-paginator';
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
                dataField: 'userId.userNumber',
                text: 'User Number',
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
                axios.get('/api/cards/unblockCard/' + this.state.cardNumber).then(res => {
                        console.log("Card unblocked")
                    })
                break;
            case "Delete Card":
                    // TODO: The api doesnt support cardNumber.. ffs dalley
                axios.get('/api/cards/deleteCard/' + this.state.cardNumber).then(res => {
                        console.log("Card deleted")
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
