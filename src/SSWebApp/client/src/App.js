import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import router from './routes/router'
import Authorization from "./routes/Authorization.js"

class App extends Component {

  render() {
    return (
      <Router>
      	<Switch>
	        <Route exact path="/authorization/:card/:room" component={Authorization} />
	        <Route path="/" component={router} />
      	</Switch>
      </Router>
    );
  }
}

export default App;
