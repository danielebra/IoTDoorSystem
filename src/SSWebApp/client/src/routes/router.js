import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import SideNavigationBar from '../components/SideNavigationBar'
import Card from '../components/Card'
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import Rush from './Rush'
import UTSDoor from './UTSDoor'
import Authorization from './Authorization'
import SiteGenerator from '../components/SiteGenerator';
import RoomGenerator from '../components/RoomGenerator';
import RoomDashboard from '../components/RoomDashboard';
class router extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <SideNavigationBar />

                <div style={{ marginLeft: 100, marginTop: 50 }}>
                    <Switch>

                        <Route exact path="/"/>
                        <Route exact path="/sites" component={SiteGenerator} /> {/* Select a physical location */}
                            <Route exact path="/sites/:location" component={RoomGenerator} /> {/* Select a room within that location*/}
                                <Route path="/sites/:location/:room" component={RoomDashboard} /> {/* Force dashboard on invalid path*/}
                                    <Route exact path="/sites/:location/:room/settings" component={SiteGenerator} /> {/* Modify something for the room */}

                    {/* <load 404></load> */}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default router;