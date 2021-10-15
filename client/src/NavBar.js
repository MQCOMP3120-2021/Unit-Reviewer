import React, { Component } from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import { Menu, Segment, Input } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'
import UnitSearch from './UnitSearch'

const NavBar = ({user, setUser, units}) => {

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
        {user && <Menu.Item
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
            name={`Hello ${user.data.username}`}
          />
          <Menu.Item
            name="logout"
            onClick={(e) => {setUser(null)}}
          />
          </>) : (
          <Menu.Item
            as={NavLink} to="/login"
            name="login"
          />)}
          <Menu.Item>
            <UnitSearch units={units}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default NavBar;