import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const axios = require('axios');

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
        this.state = { 
            metrics: [],
            entries: []
        }
        // This defines the columns in the table
        this.columns = [{
            dataField: '_id',
            text: 'User ID',
            sort: true
        }, {
            dataField: 'firstName',
            text: 'First Name',
            sort: true
        }, {
            dataField: 'lastName',
            text: 'Last Name',
            sort: true
        }];
    }
    componentDidMount()
    {
        this.setState({
            metrics: localMetrics
        })

        // This is getting the users... not the entries
        // Will change soon
        axios.get('/api/users').then(
            resp => resp.data
        ).then(data => this.setState({entries: data})).catch((err) => {
            console.log(err);
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
                <BootstrapTable keyField='_id' data={ this.state.entries } columns={ this.columns } />
                {this.props.match.params.room}
            </div>
            )
    }
}

export default RoomDashboard;
