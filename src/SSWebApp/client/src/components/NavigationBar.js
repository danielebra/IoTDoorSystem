import React, { Component } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container
} from 'reactstrap';

class NavigationBar extends Component {
    state = {
        isOpen:false
    }

    //Custom method that allows closing and opening the navigation bar
    toggle = () => {
        this.setState({
            isOpen: !this.isOpen
        })
    }

    render() {
        return (
        <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">Savage Security</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavLink href="www.google.com"></NavLink>
                    </Nav>
                </Collapse>
            </Container>

        </Navbar>
        </div>
        );
    }
}




export default NavigationBar;
