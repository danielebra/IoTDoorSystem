import React, { Component } from 'react';
import { Link } from "react-router-dom";


class RoomDashboard extends Component {
    constructor(props)
    {
        super(props)
    }
    componentDidMount()
    {
    }
    render() {
        return (
            <div>
                {this.props.match.params.room}
            </div>
            )
    }
}

export default RoomDashboard;
