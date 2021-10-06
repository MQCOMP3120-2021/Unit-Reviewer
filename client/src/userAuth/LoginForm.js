import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import authService from '../services/auth'
import { Link, useHistory } from 'react-router-dom'

  const LoginForm = ({ setUser }) => {

  const history = useHistory()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    authService.login({username, password})
    .then(data => {
      console.log("Success: ",data)
      setUser(data)
      history.push("/")
    })
    .catch((error) => {
        console.log(error.response.data.error)
        alert("Error! " + error.response.data.error)
    })
  }

  return (<>
    <Grid padded centered>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large'>
          <Segment stacked>
            <Form.Input 
              fluid 
              icon='user' 
              iconPosition='left' 
              placeholder='E-mail address' 
              onChange={(e) => setUsername(e.target.value)} 
              value={username}/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
            />

            <Button color='teal' fluid size='large' onClick={login}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </>)
}

export default LoginForm