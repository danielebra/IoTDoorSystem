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
        value: 0
    },
    {
        name: "Today's Entries",
        value: 0
    },
    {
        name: "Yesterday's Entries",
        value: 0
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
                dataField: 'roomName',
                text: 'Room Name',
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
        axios.get('/api/get/accessRequests/' + this.props.match.params.room + '/today').then(
            resp => resp.data
        ).then(data => {
            todaysEntries = data.length
            // TODO: This needs to properly make a deep copy
            let metricsCopy = [...this.state.metrics]
            let isolatedEntries = []
            for (const ent of data) {
                ent.timestamp = new Date(ent.timestamp).toLocaleTimeString('en-AU')
                isolatedEntries.push(ent['cardNumber'])
            }
            let uniques = [...new Set(isolatedEntries)]
            metricsCopy[1].value = String(todaysEntries)
            metricsCopy[0].value = String(uniques.length)
            this.setState({entries:data, metrics: metricsCopy})

        }).catch((err) => {
            console.log(err);
        })
        // Get yesterdays statse
        let yesterdaysEntries = 0;
        axios.get('/api/get/accessRequests/' + this.props.match.params.room + '/yesterday').then(
            resp => resp.data
        ).then(data => {
            yesterdaysEntries = data.length
            // TODO: This needs to properly make a deep copy
            // Data of timestamp needs to be normalized to a human readable format
            let metricsCopy = [...this.state.metrics]
            metricsCopy[2].value = String(yesterdaysEntries)
            this.setState({metrics: metricsCopy})
        }).catch((err) => {
            console.log(err);
        })
        

    }
    generateStyle(item, index) {
        // Check that we are on the Todays Entries
        if (item.name == this.state.metrics[1].name)
        {
            // Check that todays stats are better than yesterdays
            if (item.value > this.state.metrics[2].value)
            {

                return {path: {stroke: "rgba(0, 200, 0, 150)" }}
            }
            else
            {
                return {path: {stroke: "rgba(200, 0, 0, 150)" }}
            }
        }
        return {}
    }
    render() {
        return (
            <div>

            <center><div><h3>Day Summary for {this.props.match.params.room}</h3></div></center>
                <div style={{display: "flex", justifyContent: "space-around"}}> {
                        this.state.metrics.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div style={{maxHeight:200, maxWidth: 200}}>
                                        <CircularProgressbar percentage={100} text={item.value} styles={this.generateStyle(item, index)}/>
                                    </div>
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
                {/* MarginRight is set to 50 because the persistant left side navigation bar is 50px and has a 100px margin
                    Therefore, 100 - 50 = 50  */}
                <div style={{marginRight: 50}}>
                <BootstrapTable keyField='cardNumber' data={ this.state.entries } columns={ this.columns } />
                </div>
            </div>
            )
    }
}

export default RoomDashboard;
