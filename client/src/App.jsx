import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { toColor, useColor } from 'react-color-palette';
import * as unitsService from './services/units';
import * as authService from './services/auth';
import HomePage from './components/HomePage';
import AddUnit from './components/AddUnit';
import LoginForm from './userAuth/LoginForm';
import RegisterForm from './userAuth/RegisterForm';
import NavBar from './components/NavBar';
import About from './components/About';
import Profile from './components/profile/UserProfile';

import './styles/custom.css';
import UnitPage from './components/UnitPage';

const App = () => {
  const [units, setUnits] = useState([]);
  const [user, setUser] = useState(null);
  const [unitsLength, setUnitsLength] = useState(-1);
  const [loaded, setLoaded] = useState([]);
  const [color, _setColor] = useColor(
    'hex',
    localStorage.getItem('color')
      || getComputedStyle(document.querySelector(':root')).getPropertyValue(
        '--color-picked',
      ),
  );

  const setColor = (_color) => {
    if (typeof _color === 'string') {
      localStorage.setItem('color', _color);
      _setColor(toColor('hex', _color));
    } else {
      localStorage.setItem('color', _color.hex);
      _setColor(_color);
    }
  };

  const getUnitNums = () => {
    unitsService
      .getNumUnits()
      .then((data) => {
        setUnitsLength(data.data.numUnits);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUnits = async (count, clearData) => {
    if (clearData) {
      // console.log('it is working!');
      setLoaded([]);
      setUnits([]);
      await getUnitNums([]);
    }
    // console.log('actual loaded: ', loaded);
    // eslint-disable-next-line no-param-reassign
    if (!count) count = 0;
    // eslint-disable-next-line no-param-reassign
    if (count !== 0) count -= 1;

    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < 4; i++) {
      // console.log('start Count:', count + i);
      if (
        loaded.includes(count + i)
        || (unitsLength !== -1 && Math.ceil(unitsLength / 10) < count + i)
      // eslint-disable-next-line no-continue
      ) { continue; }
      // eslint-disable-next-line no-await-in-loop
      await unitsService
        .getAllUnits((count + i - 1) * 10)
        .then((data) => {
          data.map((u, idx) => units.splice((count + i - 1) * 10 + idx, 0, u));
          loaded.push(count + i);
          loaded.sort();
          setLoaded(loaded);
          setUnits(units);
          console.log(units);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    return [units, loaded];
  };

  const getUser = () => {
    authService
      .getUser()
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const reviewDelete = (
    revId,
    unitId,
    setServerIssue,
    setLoad,
    retrieveUnit,
  ) => {
    setServerIssue('');
    setLoad(true);
    // console.log(revId);
    // console.log(unitId);
    if (!user) {
      return setServerIssue('User not signed in');
    }
    return unitsService
      .deleteReview(revId, unitId, user)
      .then((data) => {
        console.log(data.status);
        if (window.location.pathname.indexOf('user') === -1) {
          retrieveUnit();
          setLoad(false);
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setLoad(false);
        setServerIssue(`Error! ${error.response.data.error}`);
      });
  };

  useEffect(() => {
    getUser();
    document.body.style.setProperty('--color-picked', color.hex);
  }, [color]);

  return (
    <Router>
      <Container>
        <NavBar user={user} setUser={setUser} units={units} />
        <Route exact path="/about" render={() => <About />} />
        <Route exact path="/addunit" render={() => <AddUnit user={user} />} />
        <Route exact path="/login" render={() => <LoginForm getUser={getUser} />} />
        <Route exact path="/register" render={() => <RegisterForm getUser={getUser} />} />
        <Route exact path="/unit/:id" render={() => <UnitPage getUser={getUser} reviewDelete={reviewDelete} user={user} />} />
        <Route exact path="/user/:author" render={() => <Profile reviewDelete={reviewDelete} getUser={getUser} units={units} user={user} color={color} setColor={setColor} />} />
        <Route exact path="/" render={() => <HomePage appLoaded={loaded} units={units} getUnits={getUnits} unitsLength={unitsLength} />} />
      </Container>
    </Router>
  );
};

export default App;
