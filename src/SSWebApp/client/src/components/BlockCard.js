import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import { Col } from 'reactstrap';
const axios = require('axios');

class BlockCard extends Component {

    constructor(props)
    {
        super(props)
        this.state = {cardNumber: ''}
        this.blockCard = this.blockCard.bind(this)
        this.setCardNumberState = this.setCardNumberState.bind(this)
    }

    componentDidMount()
    {
        this.setState({cardNumber:""})   
    }
    blockCard() {
        axios.get('/api/cards/blockCard/' + this.state.cardNumber).then(res =>
            {
                console.log("Card blocked")
            })
    }
    setCardNumberState(val)
    {
        this.setState({cardNumber: val.target.value})
    }
    render() {
        return (
            
            <div style={{marginRight: 50}}>
            <center><div><h1>Block Card</h1></div></center>
            <div>
                <Form>
                    
                            <FormControl
                            type="text"
                            placeholder="Card Number"
                            value={this.state.cardNumber}
                            
                            onChange={this.setCardNumberState}
                            />
                        <Button onClick={this.blockCard} bsStyle="danger">Block Card</Button>
                
                </Form>
                
            </div>
           

            </div>
            )
    }
}

export default BlockCard;
