import React, { Component } from 'react';
import Card from './Card';
const utsImage = require("./images/uts.jpg")
const unswImage = require("./images/unsw.jpg")

const cards = [
    {
        name: "UTS",
        image: utsImage
    },
    {
        name: "UNSW",
        image: unswImage
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
        this.setState({
            locations: cards
        })
    }
    render() {
        return (
            <div>
            <center><div><h1>Sites</h1></div></center>
            <div style={{display: "flex", justifyContent:"space-around", flexWrap: "wrap"}}>
                {this.state.locations.map((item, index) => {
                    return <Card key={index} name={item.name} image={item.image} />
                    })
                }
            </div>
            </div>
            )
    }
}

export default SiteGenerator;
