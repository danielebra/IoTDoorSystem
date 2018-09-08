import React, { Component } from 'react';
import utsDoor from './images/utsDoor.jpg'
import { Link } from "react-router-dom";

class Card extends Component {
    render() {
        return (
            
            <div className="card" style={{width: "18rem", marginTop: 10, marginBottom: 10, textAlign:"center"}}>
                <Link to={`/sites/${this.props.name}`}>
                    <img width="100" className="card-img-top" src={this.props.image} alt={this.props.name}/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.name}</h5>
                        {/* <button onClick={this.Component.UTSDoor} className="btn btn-primary">Go somewhere</button> */}
                    </div>
                </Link>
            </div>
            )
    }
}

export default Card;
