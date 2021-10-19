import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image, Card, Icon, Rating, Pagination } from 'semantic-ui-react'

const HomePage = ({ units, unitsLength, getUnits, activePage, setActivePage }) => {
    console.log(Math.ceil(unitsLength / 10))

    useEffect(() => {
        getUnits(activePage)
    }, [activePage])

    return (<>
        <Grid padded centered>
            <Grid.Row>
                {units.map(item => (
                    <Link key={item._id} to={`unit/${item._id}`}><Card style={{ marginBottom: 10, marginTop: 10, marginRight: 10 }}>
                        <Card.Content header={item.code} />
                        <Card.Content description={item.title} />
                        <Card.Content extra>
                            <Rating icon='star'
                                defaultRating={item.reviews.length > 0 && item.reviews.map(rev => rev.rating).reduce((a, b) => (a + b)) / item.reviews.length}
                                disabled maxRating={5} /> ({item.reviews.length} Ratings)
                        </Card.Content>
                    </Card></Link>
                ))}
            </Grid.Row>
            <Grid.Row>
                <Pagination
                    onPageChange={(e, { activePage }) => setActivePage(activePage)}
                    size='mini'
                    activePage={activePage}
                    totalPages={Math.ceil(unitsLength / 10)} />
            </Grid.Row>
        </Grid>

    </>)
}

export default HomePage