import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

const axios = require('axios')
const globalMetrics = [
  {
      name: "Today's Unique Requests",
      value: 0
  },
  {
    name: "Today's Requests",
    value: 0
  },
  {
    name: "Yesterday's Requests",
    value: 0
  }

]
export default class Home extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
        metrics: [],
        entries: []
    }
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
    ]
  }
  componentDidMount()
  {
    this.setState({
      metrics: globalMetrics
    })
    let todaysEntries;
        axios.get('/api/get/accessRequests/').then(
            resp => resp.data
        ).then(data => {
            todaysEntries = data.length
            let metricsCopy = [...this.state.metrics]
            let isolatedEntries = []
            for (const ent of data) {
                let date = new Date(ent.timestamp)
                ent.timestamp = date.toLocaleDateString("en-AU") + " " + date.toLocaleTimeString("en-AU")//new Date(ent.timestamp).toUTCString('en-AU')
                isolatedEntries.push(ent['cardNumber'])
            }
            let uniques = [...new Set(isolatedEntries)]
            metricsCopy[1].value = String(todaysEntries)
            metricsCopy[0].value = String(uniques.length)
            this.setState({entries:data, metrics: metricsCopy})

        }).catch((err) => {
            console.log(err);
        })

  }

  render() {
    return (
      <div>
        This is the home screen.
        <div style={{marginRight: 50}}>
                <BootstrapTable keyField='cardNumber' data={ this.state.entries } columns={ this.columns } pagination={ paginationFactory() }/>
                </div>
      </div>
    )
  }
}
