import React, { Component } from 'react';

class Authorization extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                {JSON.stringify(this.props.match.params)}
            </div>
        );
    }
}

export default Authorization;