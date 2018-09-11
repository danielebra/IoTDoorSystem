import React, { Component } from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { Link } from "react-router-dom";
//specify the base color/background of the parent container if needed
class SideNavigationBar extends Component {
    render() {
        return (
            <div style={{ background: '#2c3e50', color: '#FFF', width: 50, position: "fixed", height: "100%" }}>
                <SideNav highlightBgColor='#333745' defaultSelected='dashboard' height="100%">
                    <Link to={'/'}>
                        <Nav id='dashboard'>
                            <NavIcon><SvgIcon size={20} icon={ic_aspect_ratio} /></NavIcon>
                            {/* <NavText>Dashboard</NavText>   */}
                        </Nav>
                    </Link>
                    <Link to={'/sites'}>
                        <Nav id='sites'>
                            <NavIcon><SvgIcon size={20} icon={ic_business} /></NavIcon>
                            {/* <NavText>Sites</NavText> */}
                        </Nav>
                    </Link>
                </SideNav>
            </div>)
    }
}

export default SideNavigationBar;