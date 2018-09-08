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
class router extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <SideNavigationBar />

                <div style={{ marginLeft: 100, marginTop: 50 }}>
                    {/* <Card /> */}
                    <Switch>

                        <Route exact path="/"/>
                        <Route exact path="/sites" component={SiteGenerator} />
                        <Route path="/utsdoor" component={UTSDoor}/>

                    {/* <load 404></load> */}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default router;