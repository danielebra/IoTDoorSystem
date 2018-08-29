import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar'
import SideNavigationBar from './components/SideNavigationBar'

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar /> 
        <SideNavigationBar />
      </div>
    );
  }
}

export default App;
