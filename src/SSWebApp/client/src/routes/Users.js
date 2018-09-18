import React, { Component } from 'react';
const axios = require('axios');


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        console.log("Making API request");
        axios.get('/api/users')
            .then(function (response) {
                // const users = response.data.map(obj => obj.data);
                const users = response.data;
                this.setState({ userList: users });
                console.log(response);
                console.log(users);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        //TODO: Get this .map thing working, then the json data could be shown in a table foraat

        // const data = this.state.userList.Data;

        return (
            <div>
               {/* {Object.keys(data).map((key) => (
                     return(<div>
                         </div>)
                 ))} 
                 value = {this.state.userList}*/}
        </div>
        )
    }
}

export default Users;