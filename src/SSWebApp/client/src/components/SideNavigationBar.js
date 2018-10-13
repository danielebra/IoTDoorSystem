import React, { Component } from 'react';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import SvgIcon from 'react-icons-kit';
import {userPlus} from 'react-icons-kit/icomoon/userPlus'
import {addressCardO} from 'react-icons-kit/fa/addressCardO'
import {users} from 'react-icons-kit/icomoon/users'
import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import { Link } from "react-router-dom";
//specify the base color/background of the parent container if needed
class SideNavigationBar extends Component {
    render() {
        return (
            <div style={{ background: '#212F3C', color: '#FFF', width: 50, position: "absolute", flex:1, height:"150%"}}>
                <SideNav highlightBgColor='#333745' defaultSelected='dashboard' position="fixed" style={{flex:1}}>
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
                    <Link to={'/CardManagement'}>
                        <Nav id='CardManagement'>
                            <NavIcon>
                                <SvgIcon size={20} icon={addressCardO} />
                            </NavIcon>
                        </Nav>
                    </Link>
                    <Link to={'/UserManagement'}>
                        <Nav id='UserManagement'>
                            <NavIcon>
                                <SvgIcon size={20} icon={users} />
                            </NavIcon>
                        </Nav>
                    </Link>
                    <Link to={'/RoomManagement'}>
                        <Nav id="RoomManagement">
                            <NavIcon>
                                <SvgIcon size={20} icon={userPlus} />
                            </NavIcon>

                        </Nav>
                    </Link>
                </SideNav>
            </div>)
    }
}

export default SideNavigationBar;