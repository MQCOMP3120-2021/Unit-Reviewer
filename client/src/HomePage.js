import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Image, Card, Icon } from 'semantic-ui-react'

const HomePage = ({units}) => {
return(<>
<Grid padded centered>
  {units.map(item => (
                <Link to={`unit/${item._id}`}><Card key={item._id} style={{ marginBottom: 10, marginTop: 10, marginRight: 10}}>
                    <Card.Content header={item.code} />
                    <Card.Content description={item.title} />
                    <Card.Content extra>
                        <Icon name="user" />{item.rating} Ratings
                    </Card.Content>
                </Card></Link>
            ))}
    </Grid>
    </>)
}

export default HomePage