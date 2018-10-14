import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import Card from './Card';
import Modal from 'react-modal';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Button from 'react-bootstrap/lib/Button';

import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
const room1 = require("../resources/images/rooms/room1.jpg")
const room2 = require("../resources/images/rooms/room2.jpg")
const room3 = require("../resources/images/rooms/room3.jpg")
const room4 = require("../resources/images/rooms/room4.jpg")
const room5 = require("../resources/images/rooms/room5.jpg")
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
class AccessManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allowedCards: [],
            modalIsOpen: false,
            cardNumber: '',
            modalAction: '',
            accessManager:'',
        }
        this.columns = [
            {
                dataField: 'cardNumber',
                text: "Card Number",
                sort: true
            },
            {
                dataField: 'isActive',
                text: "isActive",
                sort: true
            },
            {
                dataField: 'userId',
                text: 'User ID',
                sort: true
            }
        ]
        this.closeModal = this.closeModal.bind(this)
        this.setCardNumberState = this.setCardNumberState.bind(this)
        this.performCardAction = this.performCardAction.bind(this)
    }
    closeModal() {
        this.setState({ modalIsOpen: false })
    }
    openModal(action) {
        this.setState({
            modalIsOpen: true,
            modalAction: action
        })

    }

    performCardAction() {
        switch (this.state.modalAction) {
            case "Add Card":
                // TODO: Add card to AccessManager
                console.log('fuck you')
                console.log(this.state.accessManager._id)
                axios.post('/api/accessManager/addAllowCard/' + this.state.accessManager._id + '/' + this.state.cardNumber)
                    .then(res => {
                        console.log('card Added')
                    })
                break;
            case "Remove Card":
                // TODO: Remove card from AccessManager
                
                break;

            default:
                console.log("Unknown action")
                break;
        }
        this.closeModal()
        setTimeout(this.updateTableData.bind(this), 1000);

    }
    componentDidMount() {
        this.updateTableData()
    }
    updateTableData() {

        axios.get('/api/accessManager/findAccessManagerByRoomName/' + this.props.match.params.room)
            .then((resp) => {
                if (resp.data.accessManagerId != undefined)
                    this.setState({
                        accessManager: resp.data.accessManagerId,
                        allowedCards: resp.data.accessManagerId.allowedCards,
                        
                    })

            })
    }
    setCardNumberState(val) {
        this.setState({ cardNumber: val.target.value })
    }
    render() {
        return (
            <div>
                <center><div><h1>Room Management for {this.props.match.params.room}</h1></div></center>
                <div style={{ marginRight: 50 }}>

                    <BootstrapTable keyField='_id' data={this.state.allowedCards} columns={this.columns} pagination={paginationFactory()} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                    <Button onClick={this.openModal.bind(this, 'Add Card')} bsStyle="primary">Add Card</Button>
                    <Button onClick={this.openModal.bind(this, 'Remove Card')} bsStyle="danger">Remove Card</Button>
                </div>

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
                            <center style={{ marginTop: 10 }}>
                                <Button onClick={this.performCardAction} bsStyle="primary">{this.state.modalAction}</Button>
                            </center>
                        </div>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default AccessManager;
