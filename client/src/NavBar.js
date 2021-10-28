import React, { Component } from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { NavLink, withRouter, useHistory } from 'react-router-dom'
import UnitSearch from './UnitSearch'
import authService from './services/auth'

const NavBar = ({user, setUser, units}) => {
  const history = useHistory()

  return (
    <>
      <Menu stackable size="massive">
        <Menu.Item width="100">
          <img src='https://via.placeholder.com/150' />
        </Menu.Item>
        <Menu.Item
          as={NavLink} exact to="/"
          name="home"
        />
        {user && user.data.admin && <Menu.Item
          as={NavLink} to="/addunit"
          name="add unit"
        />}
        <Menu.Item
          as={NavLink} to="/about"
          name="about"
        />
        <Menu.Menu position='right'>
          {user ? (
          <>
          <Menu.Item
            as={NavLink}
            to={`/user/${user.data.username}`}
            name={`Hello ${user.data.username}`}
          />
          <Menu.Item
            name="logout"
            onClick={(e) => {authService.logout().then(() => {setUser(null);history.push("/")})}}
          />
          </>) : (
          <Menu.Item
            as={NavLink} to="/login"
            name="login"
          />)}
          <Menu.Item>
            <UnitSearch/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default NavBar;