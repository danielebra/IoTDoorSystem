import React, { Component } from 'react';

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