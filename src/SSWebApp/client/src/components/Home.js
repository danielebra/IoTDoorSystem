import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import 'react-circular-progressbar/dist/styles.css';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

const axios = require('axios')
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
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
Modal.setAppElement('body')
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            metrics: [],
            modalIsOpen: false,
            queryCard: '',
            queryRoom:'',
            queryOutcome:'',
            entries: []
        }
        this.openFilterModal = this.openFilterModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.setQueryCard=this.setQueryCard.bind(this)
        this.setQueryRoom=this.setQueryRoom.bind(this)
        this.setQueryOutcome=this.setQueryOutcome.bind(this)
        this.performFilter=this.performFilter.bind(this)
        this.queryBuilder=this.queryBuilder.bind(this)
        this.updateTableData=this.updateTableData.bind(this) 
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
    componentDidMount() {
        this.updateTableData("")
    }
    setQueryCard(val)
    {
        this.setState({queryCard: val.target.value})
    }
    setQueryRoom(val)
    {
        this.setState({queryRoom: val.target.value})
    }
    setQueryOutcome(val)
    {
        this.setState({queryOutcome: val.target.value})
    }
    openFilterModal() {
        this.setState({
            modalIsOpen: true,
        });
    }
    performFilter() {
        this.updateTableData(this.queryBuilder())
        this.closeModal()
        //setTimeout(this.updateTableData('').bind(this), 1000);    
    }
    queryBuilder(){
        let query=''
        let qlist=[]
        if (this.state.queryCard!=''){
            qlist.push("cardNumber="+this.state.queryCard)  
        }
        if (this.state.queryRoom!=''){
            qlist.push("roomName="+this.state.queryRoom)  
        }
        if (this.state.queryOutcome!=''){
            qlist.push("outcome="+this.state.queryOutcome)  
        }
        query=qlist.join("&")
        if (query !=''){
            query="?"+query
        }
        return query
    }
    closeModal() {
        this.setState({ modalIsOpen: false })
    }
    updateTableData(query) {
        console.log("Updating table data")
        this.setState({
            metrics: globalMetrics
        })
        axios.get('/api/filter/' + query).then(
            resp => resp.data
        ).then(data => {
            let len = data.length
            let metricsCopy = [...this.state.metrics]
            let isolatedEntries = []
            for (const ent of data) {
                let date = new Date(ent.timestamp)
                ent.timestamp = date.toLocaleDateString("en-AU") + " " + date.toLocaleTimeString("en-AU")//new Date(ent.timestamp).toUTCString('en-AU')
                isolatedEntries.push(ent['cardNumber'])
            }
            let uniques = [...new Set(isolatedEntries)]
            metricsCopy[1].value = String(len)
            metricsCopy[0].value = String(uniques.length)
            this.setState({ entries: data, metrics: metricsCopy })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.openFilterModal.bind(this, 'Filter')} bsStyle="primary">Filter</Button>
                <div style={{ marginRight: 50 }}>
                    <BootstrapTable keyField='cardNumber' data={this.state.entries} columns={this.columns} pagination={paginationFactory()} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                    
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        contentLabel="Filter"
                        style={customStyles}
                        onRequestClose={this.closeModal}
                        shouldCloseOnOverlayClick={true}
                    >
                        <p>Filter</p>
                        <Form>
                            <div>
                                <FormControl
                                    type="text"
                                    placeholder="Card Number"
                                    value={this.state.queryCard}
                                    onChange={this.setQueryCard}
                                />
                                
                                <FormControl
                                    type="text"
                                    placeholder="Room Name"
                                    value={this.state.queryRoom}
                                    onChange={this.setQueryRoom}
                                />
                                
                                <FormControl
                                    type="text"
                                    placeholder="Outcome"
                                    value={this.state.queryOutcome}
                                    onChange={this.setQueryOutcome}
                                />
                                <center style={{ marginTop: 10 }}>
                                    <Button onClick={this.performFilter} bsStyle="primary">Filter</Button>
                                </center>
                            </div>
                        </Form>
                    </Modal>

                </div>
            </div>
        )
    }
}
