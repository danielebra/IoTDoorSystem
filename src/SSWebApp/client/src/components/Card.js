import React, { Component } from 'react';
import utsDoor from './images/utsDoor.jpg'

class Card extends Component {
    render() {
        return (
            <div class="card" style={{width: "18rem", textAlign:"center"}}>
                <img width="100" class="card-img-top" src={utsDoor} alt="Card image cap"/>
                <div class="card-body">
                    <h5 class="card-title">UTS</h5>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>)

    }
}












export default Card;
