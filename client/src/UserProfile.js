import { useState, useEffect } from "react";
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { Image, Label, Header, Grid, Segment, Rating, Button, Modal, Loader, Dimmer, Icon, Message, Accordion, Item } from 'semantic-ui-react'
import authService from './services/auth'
import unitsService from './services/units'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const Profile = ({ reviewDelete, units, user, getUser }) => {
    const history = useHistory()
    const author = useParams().author

    const [open, setOpen] = useState(false)
    const [load, setLoad] = useState(false)
    const [serverIssue, setServerIssue] = useState("")
    const [activeIndex, setActiveIndex] = useState(-1)
    const [color, setColor] = useColor("hex", getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-picked'));
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

    useEffect(() => {
        document.body.style.setProperty('--color-picked', color.hex);
    }, [color])

    return (
        <>
            <Dimmer active={load} inverted><Loader active={load} /></Dimmer>
            {serverIssue && <Message onDismiss={e => setServerIssue("")} negative>
                <Message.Header>{serverIssue}</Message.Header>
            </Message>}
            <Image src={`https://robohash.org/${author}`} centered circular size="small" />
            <Header size='huge' icon textAlign='center'>

                <Header as="h2">{author.charAt(0).toUpperCase() + author.slice(1)}</Header>
                {/*<Label padded size="medium">{reviews.length} Reviews</Label>*/}
                <Grid.Row textAlign="center">
                    {user && user.data.username === author && (user.data.admin ? <Button size="small" onClick={e => setOpen(true)}>Revoke administrator privileges</Button> :
                        <Button size="small" onClick={e => setOpen(true)}>Add administrator privileges</Button>)}
                </Grid.Row>

            </Header>

            <Accordion fluid styled>
                <Accordion.Title active={activeIndex === 0} onClick={e => setActiveIndex(activeIndex === 0 ? -1 : 0)}>
                    <Header as='h3'> <Icon name='dropdown' />Change Theme</Header>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                <Grid.Row textAlign='center'>
                    <ColorPicker width={456} height={228}
                        color={color}
                        onChange={setColor} hideHSV dark />
                        </Grid.Row>
                </Accordion.Content>
            </Accordion>

            {user && user.data.reviews && user.data.reviews.length > 0 ? <Segment.Group>
                <Segment>
                    <Grid columns={3} stackable>
                    </Grid>
                </Segment>
                <Segment.Group>
                    {user.data.reviews.map(rev => (<Segment key={rev._id}>
                        <Grid stackable container columns={2}>
                            <Grid.Column width={12}>
                                <Header as='h5'><Link to={`/unit/${rev.unitId}`} as={NavLink}>Unit<Icon name='arrow circle right'></Icon></Link></Header>
                                <Rating icon='star' defaultRating={rev.rating} disabled maxRating={5} />
                                <p>{rev.semester}</p>
                                <p>{rev.content}</p>
                                <p>{rev.year}</p>
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
                <Segment>{user && user.data.username === author ? <Header as='h3' icon textAlign='center'>User's reviews will show up here once at least one is submitted</Header>
                    : <Header as='h3' icon textAlign='center'>You do not have permission to see other reviews from user</Header>}</Segment>
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