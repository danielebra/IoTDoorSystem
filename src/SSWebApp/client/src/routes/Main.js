import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar'
import SideNavigationBar from '../components/SideNavigationBar'
import Card from '../components/Card'
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import Rush from './Rush'
import UTSDoor from './UTSDoor'
import Authorization from './Authorization'
class Main extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <SideNavigationBar />

                <div style={{ marginLeft: 100, marginTop: 50 }}>
                    {/* <Card /> */}
                    <Switch>
                    <Route exact path="/"  component={Card} />
                    <Route path="/rush/:password/:username/:creditcard"  component={Rush} />
                    <Route path="/utsdoor" component={UTSDoor}/>
                    <Route path="/authorize/:card/:room" component={Authorization}/>

                    {/* <load 404></load> */}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Main;