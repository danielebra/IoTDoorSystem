import React, { Component } from 'react';
import utsDoor from './images/utsDoor.jpg'

class Card extends Component {
    render() {
        return (
            <div className="card" style={{width: "18rem", textAlign:"center"}}>
                <img width="100" className="card-img-top" src={utsDoor} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">UTS</h5>
                    {/* <button onClick={this.Component.UTSDoor} className="btn btn-primary">Go somewhere</button> */}
                </div>
            </div>)

    }
}












export default Card;
