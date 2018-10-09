import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import { Col } from 'reactstrap';
const axios = require('axios');

class AddCard extends Component {

    constructor(props)
    {
        super(props)
        this.state = {cardNumber: ''}
        this.makeCard = this.makeCard.bind(this)
        this.setCardNumberState = this.setCardNumberState.bind(this)
    }

    componentDidMount()
    {
        this.setState({cardNumber:""})   
    }
    makeCard() {
        axios.post('/api/cards/create/' + this.state.cardNumber).then(res =>
            {
                console.log("Card created")
            })
    }
    setCardNumberState(val)
    {
        this.setState({cardNumber: val.target.value})
    }
    render() {
        return (
            
            <div style={{marginRight: 50}}>
            <center><div><h1>Add Card</h1></div></center>
            <div>
                <Form>
                    
                            <FormControl
                            type="text"
                            placeholder="Card Number"
                            value={this.state.cardNumber}
                            
                            onChange={this.setCardNumberState}
                            />
                        <Button onClick={this.makeCard} bsStyle="primary">Add Card</Button>
                
                </Form>
                
            </div>
           

            </div>
            )
    }
}

export default AddCard;
