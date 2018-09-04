import React, { Component } from 'react';

class Authorization extends Component {
	constructor(props)
	{
		super(props);
		console.log('the state is');
		console.log(this.state);
		let approve_value = "-1"

		if (this.props.match.params.card == 729)
			approve_value = "1"
		else
			approve_value = "0"

		this.state = {
            approve_value: approve_value
        };
	}
    render() {
        return (
        	<div>
            {this.state.approve_value}
            </div>
        );
    }
}

export default Authorization;