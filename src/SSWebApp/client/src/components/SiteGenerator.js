import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Card from './Card';
const utsImage = require("./images/utsDoor.jpg")

const cards = [
    {
        name: "UTS",
        image: utsImage
    },
    {
        name: "UNSW",
        image: utsImage
    }
]


class SiteGenerator extends Component {
    constructor(props)
    {
        super(props)
        this.state = {locations: []}
    }
    componentDidMount()
    {
        // TODO:
        // Populate card information from database

        this.setState({
            locations: cards
        })
    }
    render() {
        return (
            <div style={{display: "flex", "justify-content":"space-around", flexWrap: "wrap"}}>
                {this.state.locations.map((item) => {
                    
                    return <Card name={item.name} image={item.image} />
                    })
                }
            </div>
            )
    }
}

export default SiteGenerator;
