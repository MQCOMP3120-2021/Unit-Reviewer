import React, { Component } from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import { Menu, Segment, Input } from 'semantic-ui-react'
import { NavLink, withRouter } from 'react-router-dom'

const NavBar = ({user, setUser}) => {

  return (
    <div>
      <Menu className="menCol" pointing secondary>
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
          {user ? (<Menu.Item
            name="logout"
            onClick={(e) => {setUser(null)}}
          />) : (<Menu.Item
            as={NavLink} to="/login"
            name="login"
          />)}
          <Menu.Item>
            <Input icon='search' placeholder='Search for unit...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export default NavBar;