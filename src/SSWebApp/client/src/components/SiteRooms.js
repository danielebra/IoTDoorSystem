import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card from './Card';
const room1 = require("../resources/images/rooms/room1.jpg")
const room2 = require("../resources/images/rooms/room2.jpg")
const room3 = require("../resources/images/rooms/room3.jpg")
const room4 = require("../resources/images/rooms/room4.jpg")
const room5 = require("../resources/images/rooms/room5.jpg")


const existingRooms = [
    {
        name: "Small Classroom",
        image: room1
    },
    {
        name: "Large Classroom",
        image: room2
    },
    {
        name: "Dorm",
        image: room3
    },
    {
        name: "Very Small Classroom",
        image: room4
    },
    {
        name: "Lecture Hall",
        image: room5
    }
]


class SiteRooms extends Component {
    constructor(props)
    {
        super(props)
        this.state = {rooms: []}
    }
    componentDidMount()
    {
        this.setState({
            rooms: existingRooms
        })
    }
    render() {
        return (
            <div style={{display: "flex", "justify-content":"space-around", flexWrap: "wrap"}}>
                {this.state.rooms.map((item) => {
                    
                    return <Card name={item.name} image={item.image} />
                    })
                }
            </div>
            )
    }
}

export default SiteRooms;
