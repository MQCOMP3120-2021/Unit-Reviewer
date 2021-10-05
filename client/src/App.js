import React from "react"
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid } from "semantic-ui-react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from './HomePage'
import AddUnit from './AddUnit'
import LoginForm from './userAuth/LoginForm'
import RegisterForm from "./userAuth/RegisterForm"
import NavBar from "./NavBar"
import About from "./About"

import './styles/custom.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        
        <Container>
        <NavBar/>
              <Route
                exact path="/about"

                render={() =>
                  <About />}
              />

              <Route
                exact path="/addunit"
                render={() =>
                  <AddUnit />}
              />

              <Route
                exact path="/login"
                render={() =>
                  <LoginForm />}
              />
              <Route
                exact path="/register"
                render={() =>
                  <RegisterForm />}
              />
              <Route
                exact path="/"
                render={() =>
                  <HomePage />}
              />
        </Container>
      </Router>
    );
  }
}

export default App;