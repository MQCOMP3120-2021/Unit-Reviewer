import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image, Card, Icon, Rating } from 'semantic-ui-react'

const HomePage = ({units}) => {
return(<>
<Grid padded centered>
  {units.map(item => (
                <Link to={`unit/${item._id}`}><Card key={item._id} style={{ marginBottom: 10, marginTop: 10, marginRight: 10}}>
                    <Card.Content header={item.code} />
                    <Card.Content description={item.title} />
                    <Card.Content extra>
                        <Rating icon='star' 
                        defaultRating={item.reviews.length > 0 && item.reviews.map(rev => rev.rating).reduce((a, b) => (a + b))/item.reviews.length} 
                        disabled maxRating={5} /> ({item.reviews.length} Ratings)
                    </Card.Content>
                </Card></Link>
            ))}
    </Grid>
    </>)
}

export default HomePage