import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import SideNavigationBar from '../components/SideNavigationBar'
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import SiteGenerator from '../components/SiteGenerator';
import RoomGenerator from '../components/RoomGenerator';
import RoomDashboard from '../components/RoomDashboard';
import UserManagement from '../components/UserManagement'
import CardManagement from '../components/CardManagement';
import Home from '../components/Home';
import Users from './Users';
import RoomManagement from '../components/RoomManagement';
import AccessManager from '../components/AccessManager';

class router extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <SideNavigationBar />

                <div style={{ marginLeft: 100, marginTop: 50 }}>
                    <Switch>

                        <Route exact path="/" component={Home}/>
                        <Route exact path="/CardManagement" component={CardManagement} />
                        <Route exact path="/sites" component={SiteGenerator} /> {/* Select a physical location */}
                            <Route exact path="/sites/:location" component={RoomGenerator} /> {/* Select a room within that location*/}
                                <Route path="/sites/:location/:room" component={RoomDashboard} /> {/* Force dashboard on invalid path*/}
                                    <Route exact path="/sites/:location/:room/settings" component={SiteGenerator} /> {/* Modify something for the room */}
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/UserManagement" component= {UserManagement}/>
                        <Route exact path="/RoomManagement" component={RoomManagement} />
                            <Route path="/RoomManagement/:room" component={AccessManager} />
                    {/* <load 404></load> */}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default router;