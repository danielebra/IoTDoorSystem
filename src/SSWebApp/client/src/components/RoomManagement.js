
import React, { Component } from 'react';
import Card from './Card';
const room = require("../resources/images/rooms/room1.jpg")
const axios = require('axios');

class RoomManagement extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
                        rooms: [],
                        location: 'UTS' // We are going to only show UTS rooms
                    }
    }
    componentDidMount()
    {
        axios.get('/api/rooms/allRoomsByLocation/' + this.state.location)
        .then(resp => 
            {
                this.setState({
                rooms: resp.data
                })
            })
    }
    render() {
        return (
            <div>
                <center><div><h1>Room Management</h1></div></center>
                <div style={{display: "flex", justifyContent:"space-around", flexWrap: "wrap"}}>
                    {this.state.rooms.map((item, index) => {
                        
                        return <Card key={index} room={item.name} name={item.name} image={room} />
                        })
                    }
                </div>
            </div>
            )
    }
}

export default RoomManagement;
