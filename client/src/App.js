import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid } from "semantic-ui-react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import unitsService from './services/units'
import authService from './services/auth'
import HomePage from './HomePage'
import AddUnit from './AddUnit'
import LoginForm from './userAuth/LoginForm'
import RegisterForm from "./userAuth/RegisterForm"
import NavBar from "./NavBar"
import About from "./About"
import Profile from "./UserProfile"

import './styles/custom.css'
import UnitPage from './UnitPage'

const App = () => {

  const [units, setUnits] = useState([])
  const [user, setUser] = useState(null)

    const getUnits = () => {
        unitsService.getAllUnits()
        .then(data => {
            setUnits(data)
          })
          .catch(() => {
              alert("There was an error!")
            }
          )
    }

    const getUser = () => {
      authService
        .getUser()
        .then((data) => {console.log(data);setUser(data)})
        .catch(() => {
          alert('There was an error!');
        });
    };

    const reviewDelete = (revId, unitId, setServerIssue) => {
      setServerIssue("")
      console.log(revId)
      console.log(unitId)
      if (!user) {
          return setServerIssue("User not signed in")
      }
      unitsService.deleteReview(revId, unitId, user.data.username)
      .then(data => {
          console.log(data.status)
          getUnits()
          getUser()
      })
      .catch((error) => {
          console.log(error.response.data.error)
          setServerIssue("Error! " + error.response.data.error)
      })
    }

    const unitDelete = (unitId, setServerIssue) => {
      setServerIssue("")
      console.log(unitId)
      if (!user) {
          return setServerIssue("User not signed in")
      }
      if (user && !user.data.admin) {
        return setServerIssue("User does not have permission to delete unit")
      }
      unitsService.deleteUnit(unitId, user)
      .then(data => {
          console.log(data.status)
          getUnits()
          getUser()
      })
      .catch((error) => {
          console.log(error)
          setServerIssue("Error! " + error)
      })
    }

    useEffect(async () => {
      getUnits()
      getUser()
    }, [])

  return (
    <Router>
      <Container>
        <NavBar user={user} setUser={setUser} units={units}/>
        <Route exact path="/about" render={() => <About />}/>
        <Route exact path="/addunit" render={() => <AddUnit getUnits={getUnits} user={user} />}/>
        <Route exact path="/login" render={() => <LoginForm getUser={getUser}/>}/>
        <Route exact path="/register" render={() => <RegisterForm getUser={getUser} />}/>
        <Route exact path="/unit/:id" render={() => <UnitPage unitDelete={unitDelete} reviewDelete={reviewDelete} getUnits={getUnits} units={units} user={user}/>}/>
        <Route exact path="/user/:author" render={() => <Profile reviewDelete={reviewDelete} getUser={getUser} units={units} user={user}/>}/>
        <Route exact path="/" render={() => <HomePage units={units} />}/>
      </Container>
    </Router>
  );
}

export default App;