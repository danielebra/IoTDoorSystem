import React, { Component } from 'react';
import Card from './Card';
const room1 = require("../resources/images/rooms/room1.jpg")
const axios = require('axios');

class RoomGenerator extends Component {
    constructor(props)
    {
        super(props)
        this.state = {rooms: []}
    }
    componentDidMount()
    {
        axios.get('/api/rooms/allRoomsByLocation/' + this.props.match.params.location)
        .then(resp => 
            {
                this.setState({
                rooms: resp.data
                })
            })
    }
    render() {
        return (
            <div style={{display: "flex", justifyContent:"space-around", flexWrap: "wrap"}}>
                {this.state.rooms.map((item, index) => {
                    
                    return <Card key={index} room={item.name} name={item.name} image={room1} />
                    })
                }
            </div>
            )
    }
}

export default RoomGenerator;
