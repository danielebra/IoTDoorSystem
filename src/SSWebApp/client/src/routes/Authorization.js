import React, { Component } from 'react';
const axios = require('axios');
// THIS FILE CAN BE DELETED
class Authorization extends Component {
	componentDidMount()
	{
		//put axios.get here
		console.log("Making API request");
		axios.get('/api/authorizeDoor/' + this.props.match.params.room + '/' + this.props.match.params.card ).then((response) => {
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