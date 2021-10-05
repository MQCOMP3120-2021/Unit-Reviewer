import React from 'react'
import { Grid, Image, Card, Icon } from 'semantic-ui-react'

const HomePage = () =>
    <Grid columns={4}>
        <Grid.Row>
        <Grid.Column>
            <Card>
                <Card.Content header="COMP3120" />
                <Card.Content description={'Advanced Web Development'} />
                <Card.Content extra>
                    <Icon name="user" />5 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column>
            <Card>
                <Card.Content header="COMP3010" />
                <Card.Content description={'Algorithm Theory and Design'} />
                <Card.Content extra>
                    <Icon name="user" />10 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column>
            <Card>
                <Card.Content header="COMP2050" />
                <Card.Content description={'Software Engineering'} />
                <Card.Content extra>
                    <Icon name="user" />3 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column>
            <Card>
                <Card.Content header="COMP1010" />
                <Card.Content description={'Fundamentals of Computer Science'} />
                <Card.Content extra>
                    <Icon name="user" />105 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
        </Grid.Row>
    </Grid>

export default HomePage