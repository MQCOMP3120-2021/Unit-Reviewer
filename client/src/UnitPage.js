import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header, Icon, Image, Divider, Grid, Segment, List, Table, Label, Accordion } from 'semantic-ui-react'

const UnitPage = ({ units }) => {
    const id = useParams().id
    const unit = units.find(u => u._id === id)
    const [activeIndex, setActiveIndex] = useState(-1)

    return (!unit ? (<h1>Error: Unit does not exist</h1>) : (
        <>
            <Header as='h1' icon textAlign='center'>
                <Icon name='chart bar' circular />
                <Header.Content>{unit.code}: {unit.title}</Header.Content>
            </Header>
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <p>
                            {unit.description}
                        </p>
                    </Grid.Column>
                    <Grid.Column>
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
                                        idx === unit.nccw.length - 1 ? <>{u}</> : <>{u},</>)}</List.Content>
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
                        <Table celled>
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
                        </Table>

                        <Header as='h4'>Non-Scheduled</Header>
                        <Table celled>
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
                        </Table>
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

        </>
    ))
}

export default UnitPage;