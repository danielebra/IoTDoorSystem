import React, { Component } from 'react';
import { Link } from "react-router-dom";
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { set } from 'mongoose';

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
        this.columns = [
            {
                dataField: 'cardNumber',
                text: 'Card Number',
                sort: true
            }, 
            {
                dataField: 'roomNumber',
                text: 'Room Number',
                sort: true
            }, 
            {
                dataField: 'outcome',
                text: 'Outcome',
                sort: true
            },
            {
                dataField: 'timestamp',
                text: 'Time',
                sort: true
            }
        ];
    }
    componentDidMount()
    {
        this.setState({
            metrics: localMetrics
        })
        // TODO: This needs to be done in a more optimized way
        // Get todaysEntries
        let todaysEntries;
        axios.get('/api/get/accessRequests/72/today').then(
            resp => resp.data
        ).then(data => {
            todaysEntries = data.length
            // TODO: This needs to properly make a deep copy
            // Data of timestamp needs to be normalized to a human readable format
            let newArray = [...this.state.metrics]
            let isolatedEntries = []
            for (const ent of data) {
                isolatedEntries.push(ent['cardNumber'])
            }
            let foo = [...new Set(isolatedEntries)]
            newArray[1].value = todaysEntries
            newArray[0].value = foo.length
            this.setState({entries:data, metrics: newArray})
            console.log(this.state.entries)
            
            console.log(foo)

        }).catch((err) => {
            console.log(err);
        })
        // Get yesterdays statse
        let yesterdaysEntries;
        axios.get('/api/get/accessRequests/72/yesterday').then(
            resp => resp.data
        ).then(data => {
            yesterdaysEntries = data.length
            // TODO: This needs to properly make a deep copy
            // Data of timestamp needs to be normalized to a human readable format
            let newArray = [...this.state.metrics]
            newArray[2].value =yesterdaysEntries 
            this.setState({metrics: newArray})
        }).catch((err) => {
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
