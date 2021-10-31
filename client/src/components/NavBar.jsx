import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink, useHistory } from 'react-router-dom';
import UnitSearch from './UnitSearch';
import * as authService from '../services/auth';
import logo from '../img/urLogo.png';

const NavBar = ({ user, setUser }) => {
  const history = useHistory();

  return (
    <>
      <Menu stackable size="massive">
        <Menu.Item
          as={NavLink}
          exact
          to="/"
          name="home"
        >
          <img alt="logo" src={logo} />
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          exact
          to="/"
          name="home"
        />
        <Menu.Item
          as={NavLink}
          to="/about"
          name="about"
        />
        {user && user.data.admin && (
        <Menu.Item
          as={NavLink}
          to="/addunit"
          name="add unit"
        />
        )}
        <Menu.Menu position="right">
          {user ? (
            <>
              <Menu.Item
                as={NavLink}
                to={`/user/${user.data.username}`}
                name={`Hello ${user.data.username}`}
              />
              <Menu.Item
                name="logout"
                onClick={() => { authService.logout().then(() => { setUser(null); history.push('/'); }); }}
              />
            </>
          ) : (
            <Menu.Item
              as={NavLink}
              to="/login"
              name="login"
            />
          )}
          <Menu.Item>
            <UnitSearch />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default NavBar;
