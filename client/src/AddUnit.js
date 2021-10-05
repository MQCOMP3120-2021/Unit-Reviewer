import { Grid, Header, Image, Form, Segment, Button, Message } from "semantic-ui-react";
import logo from './img/logo.png'

const AddUnit = () => {
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={logo} /> New Unit
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='code' iconPosition='left' placeholder='Code' />
              <Form.Input fluid icon='bookmark outline' iconPosition='left' placeholder='Name' />
              <Form.TextArea rows={8} fluid icon='user' iconPosition='left' placeholder='Description' />
              <Form.Input fluid icon='coffee' iconPosition='left' placeholder='Offerings (separated by commas such as S1, S2, S3)' />
    
              <Button color='teal' fluid size='large'>
                Add new unit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
}

export default AddUnit;