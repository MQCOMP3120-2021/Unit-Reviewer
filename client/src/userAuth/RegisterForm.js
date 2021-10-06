import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'

const RegisterForm = () => (
  <>
  <Grid padded centered>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Re-enter password'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Sign up
          </Button>
        </Segment>
      </Form>
      <Message>
        Already have an account? <Link to="/login">Sign In</Link>
      </Message>
    </Grid.Column>
  </Grid>
  </>
)

export default RegisterForm