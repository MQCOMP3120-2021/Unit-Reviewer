import { useState } from "react";
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { Image, Label, Header, Grid, Segment, Rating, Button, Modal, Loader, Dimmer, Icon, Message } from 'semantic-ui-react'
import authService from './services/auth'
import unitsService from './services/units'

const Profile = ({ reviewDelete, units, user, getUser }) => {
    const history = useHistory()
    const author = useParams().author
    const reviews = []
    let count = 0
    for (let i = 0; i < units.length; i++) {
        for (let j = 0; j < units[i].reviews.length; j++) {
            if (units[i].reviews[j].author === author) {
                reviews.push(units[i].reviews[j])
                reviews[reviews.length - 1].unitName = units[i].title
                reviews[reviews.length - 1].unitId = units[i]._id
                count++
            }
        }
    }
    const [open, setOpen] = useState(false)
    const [load, setLoad] = useState(false)
    const [serverIssue, setServerIssue] = useState("")
    const changeAdmin = () => {
        setLoad(true)
        let usrname = user.data.username
        let adminStat = user.data.admin
        if (adminStat) {
            authService.revokeAdmin(usrname)
                .then(data => {
                    console.log("Success: ", data)
                    getUser()
                    history.push("/")
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                    alert("Error! " + error.response.data.error)
                    setLoad(false)
                })
        } else {
            authService.makeAdmin(usrname)
                .then(data => {
                    console.log("Success: ", data)
                    getUser()
                    history.push("/")
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                    alert("Error! " + error.response.data.error)
                    setLoad(false)
                })
        }
    }

    return (
        <>
            <Dimmer active={load} inverted><Loader active={load} /></Dimmer>
            {serverIssue && <Message onDismiss={e => setServerIssue("")} negative>
                <Message.Header>{serverIssue}</Message.Header>
            </Message>}
            <Image src={`https://robohash.org/${author}`} centered circular size="small" />
            <Header size='huge' icon textAlign='center'>

                <Header as="h2">{author.charAt(0).toUpperCase() + author.slice(1)}</Header>
                <Label padded size="medium">{reviews.length} Reviews</Label>
                <Grid.Row textAlign="center">
                    {user && user.data.username === author && (user.data.admin ? <Button size="small" onClick={e => setOpen(true)}>Revoke administrator privileges</Button> :
                        <Button size="small" onClick={e => setOpen(true)}>Add administrator privileges</Button>)}
                </Grid.Row>

            </Header>

            {count > 0 ? <Segment.Group>
                <Segment>
                    <Grid columns={3} stackable>
                    </Grid>
                </Segment>
                <Segment.Group>
                    {reviews.map(rev => (<Segment key={rev._id}>
                        <Grid stackable container columns={2}>
                            <Grid.Column width={12}>
                                <Header as='h5'><Link to={`/unit/${rev.unitId}`} as={NavLink}>{rev.unitName}</Link></Header>
                                <Rating icon='star' defaultRating={rev.rating} disabled maxRating={5} />
                                <p>{rev.content}</p>
                            </Grid.Column>
                            <Grid.Column width={4} verticalAlign='middle'>
                                {user && rev.author === user.data.username && <Button fluid color='red' onClick={e => reviewDelete(rev._id, rev.unitId, setServerIssue, setLoad)}>
                                    <Icon name='trash alternate' /> Delete
                                </Button>}
                            </Grid.Column>
                        </Grid>
                    </Segment>))}
                </Segment.Group>
            </Segment.Group> :
                <Segment><Header as='h3' icon textAlign='center'>User's reviews will show up here once at least one is submitted</Header></Segment>
            }
            <Modal

                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                centered={false}
            >
                <Header>
                    Are you sure?
                </Header>
                <Modal.Content>
                    <p>
                        If you are not a lecturer and/or tutor,
                        making changes to this will have serious consequences.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={(e) => setOpen(false)}>No
                    </Button>
                    <Button color='green' onClick={(e) => changeAdmin()}>Yes
                        <Dimmer active={load} inverted><Loader active={load} /></Dimmer>
                    </Button>
                </Modal.Actions>
            </Modal>

        </>
    )

}

export default Profile