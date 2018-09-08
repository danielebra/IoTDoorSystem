import React, { Component } from 'react';
import { Link } from "react-router-dom";


class SiteDashboard extends Component {
    constructor(props)
    {
        super(props)
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
            <div>
                {this.state.locations.map((item, index) => {
                    
                    return <Card key={index} name={item.name} image={item.image} />
                    })
                }
            </div>
            )
    }
}

export default SiteDashboard;
