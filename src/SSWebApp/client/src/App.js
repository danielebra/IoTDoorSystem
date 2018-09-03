import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import router from './routes/router'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={router} />
      </Router>
    );
  }
}

export default App;
