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
            //             <Nav classNameName="ml-auto" navbar>
            //                 <NavLink href="https://www.google.com">Google</NavLink>
            //             </Nav>
            //         </Collapse>
            //     </Container>

            // </Navbar>
            // </div>
            <nav className="navbar navbar-expand-sm navbar-dark dark" style={{background:"#2c3e50"}}>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavigationBar;
