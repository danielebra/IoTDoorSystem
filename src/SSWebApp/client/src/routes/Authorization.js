import React, { Component } from 'react';
const axios = require('axios');
// THIS FILE CAN BE DELETED
class Authorization extends Component {
	componentDidMount()
	{
		//put axios.get here
		console.log("Making API request");
		axios.get('/api/authorizeDoor/' + this.props.match.params.card + '/' + this.props.match.params.room ).then((response) => {
			console.log(response);
			this.setState(
			{
				approve_value: response.data
			});
		});
	}
	constructor(props)
	{
		super(props);
		/*let approve_value = "-1"
		
		if (this.props.match.params.card == 729)
			approve_value = "1"
		else
			approve_value = "0"*/

		this.state = {
            approve_value: ""
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