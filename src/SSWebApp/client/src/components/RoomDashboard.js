import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const localMetrics = [
    {
        name: "Today's Unique Entries",
        value: 20
    },
    {
        name: "Today's Entries",
        value: 200
    },
    {
        name: "Yesterday's Entries",
        value: 325
    }
]
class RoomDashboard extends Component {
    constructor(props)
    {
        super(props)
        this.state = { metrics: [] }
    }
    componentDidMount()
    {
        this.setState({
            metrics: localMetrics
        })
    }
    render() {
        return (
            <div>
                <div style={{display: "flex", justifyContent: "space-around"}}> {
                        this.state.metrics.map((item, index) => {
                            return (
                                <div>
                                    <CircularProgressbar percentage={100} text={item.value}/>
                                    <center>
                                        <p style={{marginTop: 10}}>
                                            {item.name}
                                        </p>
                                    </center>
                                </div>
                            )
                        })
                    }
                
                </div>
                {this.props.match.params.room}
            </div>
            )
    }
}

export default RoomDashboard;
