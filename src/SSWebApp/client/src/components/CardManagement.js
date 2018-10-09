import React, { Component } from 'react';
import { Link } from "react-router-dom";
import  BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Dirent } from 'fs';
const axios = require('axios');




class CardManagement extends Component {
    constructor(props)
    {
        console.log("correctpage")
        super(props)
        this.state = {cards: []}
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
    render() {
        return (
            
            <div style={{marginRight: 50}}>
            <center><div><h1>Card Management</h1></div></center>
            <BootstrapTable keyField='_id' data={ this.state.cards } columns={ this.columns } />
            <div style={{display: "flex", justifyContent:"space-around", flexWrap: "wrap"}}>
            <button onclick="/CardManagement/AddCard">Add Card</button>
            <button>Block Card</button>
            <button>Unblock Card</button>
            <button>Delete Card</button>
            </div>
            </div>
            )
    }
}

export default CardManagement;
