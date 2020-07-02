import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Stocks from "./components/Stocks"
import Hero from "./components/Hero"
import LoginForm from "./components/LoginForm"
import SignupForm from "./components/SignupForm"
import Toolbar from "./components/Toolbar"
import Home from "./components/Home"
import Stock from "./components/Stock"

function App() {
  return (
    <div className="App">
      <Router>
        <Hero />
        <Toolbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/stocks">
            <Stocks />
          </Route>
          <Route exact path="/LoginForm">
            <LoginForm />
          </Route>
          <Route exact path="/signupForm">
            <SignupForm />
          </Route>
          <Route path="/price">
            <Stock />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}



export default App;
