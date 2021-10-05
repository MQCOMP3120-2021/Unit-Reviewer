import React from 'react'
import { Grid, Image, Card, Icon } from 'semantic-ui-react'

//a comment
const HomePage = ({units}) => {

    return (<>
        <div className="mt-md">&nbsp;</div>
        <Grid>
            {units.map(item => (
                <Grid.Column key={item._id} mobile={16} tablet={8} computer={4}>
                <Card>
                    <Card.Content header={item.code} />
                    <Card.Content description={item.name} />
                    <Card.Content extra>
                        <Icon name="user" />{item.rating} Ratings
                    </Card.Content>
                </Card>
                </Grid.Column>
            ))}
            <Grid.Column mobile={16} tablet={8} computer={4}>
                <Card>
                    <Card.Content header="COMP3000" />
                    <Card.Content description={'Programming Languages'} />
                    <Card.Content extra>
                        <Icon name="user" />5 Ratings
                    </Card.Content>
                </Card>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
                <Card>
                    <Card.Content header="COMP1000" />
                    <Card.Content description={'Introduction to Programming'} />
                    <Card.Content extra>
                        <Icon name="user" />101 Ratings
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
    </>)
}

export default HomePage