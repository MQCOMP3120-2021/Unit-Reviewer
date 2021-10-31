import React, { useState } from 'react'
import { Button, Form, Grid, Message, Segment, Loader } from 'semantic-ui-react'
import * as authService from '../services/auth'
import { Link, useHistory } from 'react-router-dom'

const RegisterForm = ({ getUser }) => {

  const history = useHistory()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const [errors, setErrors] = useState({
    username: {error: false, message: ""},
    password: {error: false, message: ""},
    password2: {error: false, message: ""},
  })
  const [serverIssue, setServerIssue] = useState("")
  const [load, setLoad] = useState(false)

  const register = () => {
    setServerIssue("")
    let err = {
      username: {error: false, message: ""},
      password: {error: false, message: ""},
      password2: {error: false, message: ""},
    }
    let issue = false
    if (username === "") {
      err.username = {error: true, message: "username field is empty"}
      issue = true
    }
    if (password === "") {
      err.password = {error: true, message: "password field is empty"}
      issue = true
    }
    if (password2 === "") {
      err.password2 = {error: true, message: "password field is empty"}
      issue = true
    }
    if(password !== password2) {
        err.password = {error: true, message: "password fields do not match"}
        err.password2 = {error: true, message: "password fields do not match"}
        issue = true
    }
    setErrors(err)
    if(issue) {
      return
    }
    setLoad(true)
    authService.register({username, password})
      .then(data => {
          console.log("Success: ",data)
          getUser()
          history.push("/")
        })
        .catch((error) => {
            console.log(error.response.data.error)
            setServerIssue("Error! " + error.response.data.error)
            setLoad(false)
        })
  }
  return (<>
  <Grid padded centered>
    <Grid.Column style={{ maxWidth: 450 }}>
    {serverIssue && <Message negative>
    <Message.Header>{serverIssue}</Message.Header>
    </Message>}
      <Form size='large'>
        <Segment stacked>
          <Form.Input 
            data-testid="username"
            fluid 
            icon='user' 
            iconPosition='left' 
            placeholder='Username' 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
            id='form-input-control-error-email'
            error={errors.username.error && errors.username.message}
            />
          <Form.Input
            data-testid="password"
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            error={errors.password.error && errors.password.message}
          />
          <Form.Input
            data-testid="password2"
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Re-enter password'
            type='password'
            onChange={(e) => setPassword2(e.target.value)} 
            value={password2}
            error={errors.password2.error && errors.password2.message}
          />

          <Button data-testid="buttonSubmit" color='teal' fluid size='large' onClick={register}>
            Sign up <Loader active={load}/>
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
