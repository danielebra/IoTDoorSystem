import React, { Component } from 'react';
// THIS FILE CAN BE DELETED
class Rush extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                {/* HELLO */}
                {JSON.stringify(this.props.match.params)}
            </div>
        );
    }
}

export default Rush;