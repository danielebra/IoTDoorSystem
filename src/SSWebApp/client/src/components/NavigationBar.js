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
        isOpen: false
    }

    //Custom method that allows closing and opening the navigation bar
    toggle = () => {
        this.setState({
            isOpen: !this.isOpen
        })
    }

    render() {
        return (
            // <div>
            // <Navbar color="dark" dark expand="sm">
            //     <Container>
            //         <NavbarBrand href="/">Savage Security</NavbarBrand>
            //         <NavbarToggler onClick={this.toggle} />
            //         <Collapse isOpen={this.state.isOpen} navbar>
            //             <Nav className="ml-auto" navbar>
            //                 <NavLink href="https://www.google.com">Google</NavLink>
            //             </Nav>
            //         </Collapse>
            //     </Container>

            // </Navbar>
            // </div>
            <nav class="navbar navbar-expand-sm navbar-dark dark" style={{background:"#2c3e50"}}>
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavigationBar;
