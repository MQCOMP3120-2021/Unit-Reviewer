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
  const [unitsLength, setUnitsLength] = useState(-1)
  const [loaded, setLoaded] = useState([])

    const getUnitNums = () => {
    unitsService.getNumUnits()
    .then(data => {
        setUnitsLength(data.data.numUnits)
      })
      .catch(() => {
          alert("There was an error!")
          return
        }
      )
    }

    const getUnits = async (count) => {
        if(!count) count = 0
        if(count != 0) count = count - 1 
        
        for(let i = 1; i < 4; i++) {
          console.log("start Count:", count+i)
          if(loaded.includes(count+i) || (unitsLength !== -1 && Math.ceil(unitsLength/10) < count+i)) continue
          await unitsService.getAllUnits((count+i-1)*10)
          .then(data => {
              data.map((u,idx) => units.splice((count+i-1)*10+idx,0,u))
              loaded.push(count+i)
              loaded.sort()
              //console.log(units)
            })
            .catch(() => {
                alert("There was an error!")
                return
              }
            )
        }
        return [units,loaded]
    }

    const getUser = () => {
      authService
        .getUser()
        .then((data) => {console.log(data);setUser(data)})
        .catch(() => {
          alert('There was an error!');
        });
    };

    const reviewDelete = (revId, unitId, setServerIssue, setLoad, retrieveUnit) => {
      setServerIssue("")
      setLoad(true)
      console.log(revId)
      console.log(unitId)
      if (!user) {
          return setServerIssue("User not signed in")
      }
      unitsService.deleteReview(revId, unitId, user.data.username)
      .then(data => {
          console.log(data.status)
          if (window.location.pathname !== `/user/${user.data.username}`) {
            retrieveUnit()
            getUser()
          }
          setLoad(false)
      })
      .catch((error) => {
          console.log(error.response.data.error)
          setLoad(false)
          setServerIssue("Error! " + error.response.data.error)
      })
    }

    useEffect(() => {
      getUser()
      getUnitNums()
    }, [])

  return (
    <Router>
      <Container>
        <NavBar user={user} setUser={setUser} units={units}/>
        <Route exact path="/about" render={() => <About />}/>
        <Route exact path="/addunit" render={() => <AddUnit getUnits={getUnits} user={user} />}/>
        <Route exact path="/login" render={() => <LoginForm getUser={getUser}/>}/>
        <Route exact path="/register" render={() => <RegisterForm getUser={getUser} />}/>
        <Route exact path="/unit/:id" render={() => <UnitPage reviewDelete={reviewDelete} user={user}/>}/>
        <Route exact path="/user/:author" render={() => <Profile reviewDelete={reviewDelete} getUser={getUser} units={units} user={user}/>}/>
        <Route exact path="/" render={() => <HomePage units={units} getUnits={getUnits} unitsLength={unitsLength} />}/>
      </Container>
    </Router>
  );
}

export default App;