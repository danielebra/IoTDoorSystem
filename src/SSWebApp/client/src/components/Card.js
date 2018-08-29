import React, { Component } from 'react';
import utsDoor from './images/utsDoor.jpg'
import { Link } from "react-router-dom";

class Card extends Component {
    render() {
        return (
            
            <div className="card" style={{width: "18rem", textAlign:"center"}}>
            <Link to={'/utsdoor'}>
                <img width="100" className="card-img-top" src={utsDoor} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">UTS</h5>
                    {/* <button onClick={this.Component.UTSDoor} className="btn btn-primary">Go somewhere</button> */}
                </div>
                </Link>
            </div>
            )
    }
}

export default Card;
