import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon, Image, Divider, Grid, Segment, List, Table, Label, Accordion, Rating, Form, Button, Input } from 'semantic-ui-react'
import unitsService from './services/units'

const UnitPage = ({ getUnits, units, user }) => {

    const id = useParams().id
    const unit = units.find(u => u._id === id)
    const [activeIndex, setActiveIndex] = useState(-1)
    const [newReview, setNewReview] = useState({ content: "", rating: 0})

    const addReview = () => {
        if(user) {
            if(newReview.content === "") {
                alert("ERROR: comment not entered.")
                return
            }
            if(newReview.rating === 0) {
                alert("ERROR: review not rated.")
                return
            }
            console.log(newReview)
            unitsService.submitReview({...newReview, author: user.data.username, user: user, unitId: unit._id})
            .then(data => {
                console.log(data)
                getUnits()
              })
              .catch(() => {
                alert("There was an error!")
              })

        } else {
            alert("ERROR: user not signed in.")
            return
        }
    }

    return (!unit ? (<h1>Error: Unit does not exist</h1>) : (
        <>
            <Header as='h1' icon textAlign='center'>
                <Icon name='chart bar' circular />
                <Header.Content>{unit.code}: {unit.title}</Header.Content>
            </Header>
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <Header as='h4' icon>Description</Header>
                        <p>
                            {unit.description}
                        </p>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h4' icon>Details</Header>
                        <List>
                            <List.Item>
                                <List.Icon name='code' />
                                <List.Content>Unit : {unit.code} - {unit.title} </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='level up alternate' />
                                <List.Content>Level : {unit.level}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='money bill alternate' />
                                <List.Content>Credits : {unit.credits}</List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='warehouse' />
                                <List.Content>
                                    <List.Content>Department : {unit.department}</List.Content>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='group' />
                                <List.Content>
                                    <List.Content>Group : {unit.group}</List.Content>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='warning circle' />
                                <List.Content>
                                    <List.Content>NCCW : {unit.nccw.map((u, idx) =>
                                        idx === unit.nccw.length - 1 ? <>{u}</> : <>{u}, </>)}</List.Content>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Icon name='edit' />
                                <List.Content>
                                    <List.Content>Pre-requisites : {unit.prerequisites.map((u, idx) =>
                                        idx === unit.prerequisites.length - 1 ? <>{u}</> : <>{u}, </>)}</List.Content>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Grid.Column>
                </Grid>

                <Divider vertical>Info</Divider>
            </Segment>
            <Segment>
                <Accordion fluid styled>
                    <Accordion.Title active={activeIndex === 0} onClick={e => setActiveIndex(activeIndex === 0 ? -1 : 0)}>
                        <Header as='h3'><Icon name='dropdown' /> Offerings</Header>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Attendance</Table.HeaderCell>
                                    <Table.HeaderCell>Location</Table.HeaderCell>
                                    <Table.HeaderCell>Period</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {unit.offerings.map(off => (
                                    <Table.Row key={off._id}>
                                        <Table.Cell>{off.attendance}</Table.Cell>
                                        <Table.Cell>{off.location}</Table.Cell>
                                        <Table.Cell>{off.period}</Table.Cell>
                                    </Table.Row>))}
                            </Table.Body>
                        </Table>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} onClick={e => setActiveIndex(activeIndex === 1 ? -1 : 1)}>
                        <Header as='h3'><Icon name='dropdown' />Activities</Header>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <Header as='h4'>Scheduled</Header>
                        {unit.activities.scheduled.length > 0 ? <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Offerings</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {unit.activities.scheduled.map(act => (
                                    <Table.Row key={act._id}>
                                        <Table.Cell>{act.name}</Table.Cell>
                                        <Table.Cell>{act.description}</Table.Cell>
                                        <Table.Cell>{act.offerings.map((a, idx) =>
                                            idx === act.offerings.length - 1 ? <>{a}</> : <>{a}, </>)}</Table.Cell>
                                    </Table.Row>))}
                            </Table.Body>
                        </Table> : <Header as='h5'>No Scheduled Activities</Header>}

                        <Header as='h4'>Non-Scheduled</Header>
                        {unit.activities.nonScheduled.length > 0 ? <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Offerings</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {unit.activities.nonScheduled.map(act => (
                                    <Table.Row key={act._id}>
                                        <Table.Cell>{act.name}</Table.Cell>
                                        <Table.Cell>{act.description}</Table.Cell>
                                        <Table.Cell>{act.offerings.map((a, idx) =>
                                            idx === act.offerings.length - 1 ? <>{a}</> : <>{a}, </>)}</Table.Cell>
                                    </Table.Row>))}
                            </Table.Body>
                        </Table> : <Header as='h5'>No Non-scheduled Activities</Header>}
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 2} onClick={e => setActiveIndex(activeIndex === 2 ? -1 : 2)}>
                        <Header as='h3'><Icon name='dropdown' />Assessments</Header>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Title</Table.HeaderCell>
                                    <Table.HeaderCell>Type</Table.HeaderCell>
                                    <Table.HeaderCell>Hurdle</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Weighting</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {unit.assessments.map(assess => (
                                    <Table.Row key={assess._id}>
                                        <Table.Cell>{assess.title}</Table.Cell>
                                        <Table.Cell>{assess.type}</Table.Cell>
                                        <Table.Cell>{assess.hurdle ? <>Yes</> : <>No</>}</Table.Cell>
                                        <Table.Cell>{assess.description}</Table.Cell>
                                        <Table.Cell>{assess.weighting}%</Table.Cell>
                                    </Table.Row>))}
                            </Table.Body>
                        </Table>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 3} onClick={e => setActiveIndex(activeIndex === 3 ? -1 : 3)}>
                        <Header as='h3'><Icon name='dropdown' />Outcomes</Header>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 3}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Learning Outcome ID</Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {unit.outcomes.map((out, idx) => (
                                    <Table.Row key={idx}>
                                        <Table.Cell>ULO{idx + 1}</Table.Cell>
                                        <Table.Cell>{out}</Table.Cell>
                                    </Table.Row>))}
                            </Table.Body>
                        </Table>
                    </Accordion.Content>
                </Accordion>
            </Segment>
            <Segment.Group>
                <Segment>
                    <Form size='large'>
                        {user && unit.reviews.find(rev => rev.author === user.data.username) ?
                        (<Header as='h3'>You have submitted a review (see below)</Header>)
                        : (<><Header as='h3'>Add Review</Header>
                        <Form.Field>Rate Unit: <Rating icon='star' defaultRating={newReview.rating} maxRating={5} onRate={(e,data) => setNewReview({ ...newReview, rating: data.rating })} /></Form.Field>
                        <Form.TextArea rows={5} fluid placeholder='Comment...'
                            value={newReview.content} onChange={e => setNewReview({ ...newReview, content: e.target.value })} />
                        <Button onClick={addReview} color='green' size='small'>
                            Submit Review
                        </Button></>)}
                    </Form>
                </Segment>
                <Segment>
                <Grid columns={2} stackable>
                    <Grid.Row verticalAlign="middle">
                <Grid.Column><Header as='h3'>Reviews ({unit.reviews.length})</Header></Grid.Column>
                <Grid.Column textAlign="right"><Input icon='search' placeholder='Search for review...' /></Grid.Column>
                </Grid.Row>
                </Grid>
                </Segment>
                 <Segment.Group>
                    {unit.reviews.map(rev => (<Segment key={rev._id}>
                        <Header as='h5'><Icon name='user' />{rev.author}</Header>
                        <Rating icon='star' defaultRating={rev.rating} disabled maxRating={5} />
                        <p>{rev.content}</p>
                    </Segment>))}

                </Segment.Group>
            </Segment.Group>
        </>
    ))
}

export default UnitPage;