import React from 'react'
import { Grid, Image, Card, Icon } from 'semantic-ui-react'

const HomePage = () =>
<>
<div className="mt-md">&nbsp;</div>
    <Grid >
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card>
                <Card.Content header="COMP3120" />
                <Card.Content description={'Advanced Web Development'} />
                <Card.Content extra>
                    <Icon name="user" />5 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card>
                <Card.Content header="COMP3010" />
                <Card.Content description={'Algorithm Theory and Design'} />
                <Card.Content extra>
                    <Icon name="user" />10 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card>
                <Card.Content header="COMP2050" />
                <Card.Content description={'Software Engineering'} />
                <Card.Content extra>
                    <Icon name="user" />3 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card>
                <Card.Content header="COMP1010" />
                <Card.Content description={'Fundamentals of Computer Science'} />
                <Card.Content extra>
                    <Icon name="user" />105 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <Card>
                <Card.Content header="COMP4060" />
                <Card.Content description={'Advanced Software Engineering'} />
                <Card.Content extra>
                    <Icon name="user" />5 Ratings
                </Card.Content>
            </Card>
        </Grid.Column>
    </Grid>
    </>

export default HomePage