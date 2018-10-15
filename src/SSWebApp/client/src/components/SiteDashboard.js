import React, { Component } from 'react';

class SiteDashboard extends Component {
    constructor(props)
    {
        super(props)
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
                {this.state.locations.map((item, index) => {
                    
                    return <Card key={index} name={item.name} image={item.image} />
                    })
                }
            </div>
            )
    }
}

export default SiteDashboard;
