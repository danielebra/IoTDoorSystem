import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from './routes/Main'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Main} />
      </Router>
    );
  }
}

export default App;
