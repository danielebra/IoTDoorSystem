import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar'

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar /> 
      </div>
    );
  }
}

export default App;
