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
            <table style="border: 3px solid black;">
               {Object.keys(userList).map((item) => (
                     <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                    </tr>
                 ))} 
                 {/* value = {this.state.userList}*/} */}
        </table>
        )
    }
}

export default Users;