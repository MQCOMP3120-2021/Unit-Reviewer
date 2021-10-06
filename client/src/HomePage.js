import React from 'react'
import { Grid, Image, Card, Icon } from 'semantic-ui-react'

const HomePage = ({units}) => {
<>
<Grid padded centered>
  {units.map(item => (
                <Card style={{ marginBottom: 10, marginTop: 10, marginRight: 10}}>
                    <Card.Content header={item.code} />
                    <Card.Content description={item.name} />
                    <Card.Content extra>
                        <Icon name="user" />{item.rating} Ratings
                    </Card.Content>
                </Card>
            ))}
        
            <Card style={{ marginBottom: 10, marginTop: 10, marginRight: 10}}>
                <Card.Content header="COMP3120" />
                <Card.Content description={'Advanced Web Development'} />
                <Card.Content extra>
                    <Icon name="user" />5 Ratings
                </Card.Content>
            </Card>
            <Card style={{ marginBottom: 10, marginTop: 10, marginRight: 10}}>
                <Card.Content header="COMP3010" />
                <Card.Content description={'Algorithm Theory and Design'} />
                <Card.Content extra>
                    <Icon name="user" />10 Ratings
                </Card.Content>
            </Card>
            <Card style={{ marginBottom: 10, marginTop: 10, marginRight: 10}}>
                <Card.Content header="COMP2050" />
                <Card.Content description={'Software Engineering'} />
                <Card.Content extra>
                    <Icon name="user" />3 Ratings
                </Card.Content>
            </Card>
            <Card style={{ marginBottom: 10, marginTop: 10, marginRight: 10}}>
                <Card.Content header="COMP1010" />
                <Card.Content description={'Fundamentals of Computer Science'} />
                <Card.Content extra>
                    <Icon name="user" />105 Ratings
                </Card.Content>
            </Card>
            <Card style={{ marginBottom: 10, marginTop: 10, marginRight: 10}}>
                <Card.Content header="COMP4060" />
                <Card.Content description={'Advanced Software Engineering'} />
                <Card.Content extra>
                    <Icon name="user" />5 Ratings
                </Card.Content>
            </Card>
    </Grid>
    </>

export default HomePage