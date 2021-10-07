import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import authService from '../services/auth'
import { Link, useHistory } from 'react-router-dom'

const RegisterForm = ({setUser}) => {

  const history = useHistory()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const register = () => {
    if(password !== password2) {
      alert("passwords don't match, please check your passwords match")
    } else {
      authService.register({username, password})
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
            value={username} />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Re-enter password'
            type='password'
            onChange={(e) => setPassword2(e.target.value)} 
            value={password2}
          />

          <Button color='teal' fluid size='large' onClick={register}>
            Sign up
          </Button>
        </Segment>
      </Form>
      <Message>
        Already have an account? <Link to="/login">Sign In</Link>
      </Message>
    </Grid.Column>
  </Grid>
  </>)
}

export default RegisterForm