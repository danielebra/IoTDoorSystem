import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import Card from './Card';
const room1 = require("../resources/images/rooms/room1.jpg")
const room2 = require("../resources/images/rooms/room2.jpg")
const room3 = require("../resources/images/rooms/room3.jpg")
const room4 = require("../resources/images/rooms/room4.jpg")
const room5 = require("../resources/images/rooms/room5.jpg")
const axios = require('axios');

class AccessManager extends Component {
    constructor(props)
    {
        super(props)
        this.state = {allowedCards: []}//{allowedCards:["faooo"]}} 
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
                dataField: 'userID',
                text: 'User ID',
                sort: true
            }
        ]
        console.log(this.props)
    }
    componentDidMount()
    {
        axios.get('/api/accessManager/findAccessManagerByRoomName/' + this.props.match.params.room)
        .then(resp => 
            {
                console.log(resp)
                // var pair = []
                // for (const x of resp.data.accessManagerId.allowedCards)
                // {
                //     pair.push({"Card": x })
                // }
                this.setState({
                allowedCards: resp.data.accessManagerId.allowedCards
                })
                console.log(this.state.allowedCards);
            })
    }
    render() {
        return (
            <div>
                <center><div><h1>Room Management for {this.props.match.params.room}</h1></div></center>
                <div style={{marginRight: 50}}>

                <BootstrapTable keyField='_id' data={ this.state.allowedCards} columns={ this.columns } />
                </div>
                <div style={{display: "flex", justifyContent:"space-around", flexWrap: "wrap"}}/>
            </div>
            )
    }
}

export default AccessManager;
