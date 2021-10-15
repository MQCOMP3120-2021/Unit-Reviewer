import { BrowserRouter as Router, NavLink, Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import {Image, Label, Header, Grid, Segment, Rating} from 'semantic-ui-react'

const Profile = ({units}) => {
    const author = useParams().author
    const reviews = []
    for(let i = 0; i < units.length; i++){
        for(let j = 0; j < units[i].reviews.length; j++){
            if(units[i].reviews[j].author === author){
                reviews.push(units[i].reviews[j])
                reviews[reviews.length-1].unitName = units[i].title
                reviews[reviews.length-1].unitId = units[i]._id
            }
        }
    }
    return(
        <>
        <Image src={`https://robohash.org/${author}`} centered circular size="small"/>
            <Header size='huge' icon textAlign='center'>
                
                <Header as="h2">{author.charAt(0).toUpperCase() + author.slice(1)}</Header>
                <Label padded size="medium">{reviews.length} Reviews</Label>
                
        </Header>
        <Segment.Group>
                <Segment>
                <Grid columns={3} stackable>
                </Grid>
                </Segment>
                 <Segment.Group>
                    {reviews.map(rev => (<Segment key={rev._id}>
                        <Header as='h5'><Link to={`/unit/${rev.unitId}`} as={NavLink}>{rev.unitName}</Link></Header>
                        <Rating icon='star' defaultRating={rev.rating} disabled maxRating={5} />
                        <p>{rev.content}</p>
                    </Segment>))}

                </Segment.Group>
            </Segment.Group>
        </>
    )
}

export default Profile