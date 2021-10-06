import React, { Component } from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import { Menu, Segment, Input } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

const NavBar = () => {

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
        <Menu.Item
          as={NavLink} to="/addunit"
          name="add unit"
        />
        <Menu.Item
          as={NavLink} to="/about"
          name="about"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            as={NavLink} to="/login"
            name="login"
          />
          <Menu.Item>
            <Input icon='search' placeholder='Search for unit...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default NavBar;