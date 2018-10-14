import React, { Component } from 'react';

class NavigationBar extends Component {
    state = {
        isOpen: false
    }

    // Custom method that allows closing and opening the navigation bar
    toggle = () => {
        this.setState({
            isOpen: !this.isOpen
        })
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark dark" style={{background:"#212F3C" , justifyContent:"center"}}>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href='/'>Savage Security</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavigationBar;
