import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card from './Card';
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
                console.log(resp.data)
                this.setState({
                rooms: resp.data
                })
            })
    }
    render() {
        return (
            <div style={{display: "flex", justifyContent:"space-around", flexWrap: "wrap"}}>
                {this.state.rooms.map((item, index) => {
                    
                    return <Card key={index} roomID={item._id} room={item._id} name={item.name} image={room1} />
                    })
                }
            </div>
            )
    }
}

export default RoomGenerator;
