import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar'
import SideNavigationBar from './components/SideNavigationBar'
import Card from './components/Card'

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar /> 
        <SideNavigationBar />

        <div style={{marginLeft:100, marginTop: 50}}>
        <Card />
        </div>


      </div>
    );
  }
}

export default App;
