import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Loader } from 'semantic-ui-react'
import authService from '../services/auth'
import { Link, useHistory } from 'react-router-dom'

  const LoginForm = ({ setUser }) => {

  const history = useHistory()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState({
    username: {error: false, message: ""},
    password: {error: false, message: ""},
  })

  const [serverIssue, setServerIssue] = useState("")
  const [load, setLoad] = useState(false)

  const login = () => {
    setServerIssue("")
    let err = {
      username: {error: false, message: ""},
      password: {error: false, message: ""},
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
    setErrors(err)
    if(issue) {
      return
    }
    setLoad(true)
    authService.login({username, password})
    .then(data => {
      console.log("Success: ",data)
      setUser(data)
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
              fluid 
              icon='user' 
              iconPosition='left' 
              placeholder='E-mail address' 
              onChange={(e) => setUsername(e.target.value)} 
              value={username}
              error={errors.username.error && errors.username.message}
              />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              error={errors.password.error && errors.password.message}
            />

            <Button color='teal' fluid size='large' onClick={login}>
              Login <Loader active={load}/>
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