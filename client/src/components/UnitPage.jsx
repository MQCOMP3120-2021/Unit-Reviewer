import { React, useState, useEffect } from 'react';
import { useParams, BrowserRouter as NavLink, Link } from 'react-router-dom';
import {
  Header,
  Icon,
  Image,
  Grid,
  Segment,
  List,
  Table,
  Accordion,
  Rating,
  Form,
  Button,
  Message,
  Loader,
  Search,
  Dimmer,
} from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import * as unitsService from '../services/units';
import Error from './Error';

const UnitPage = ({ getUser, reviewDelete, user }) => {
  const { id } = useParams();
  const [unit, setUnit] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [newReview, setNewReview] = useState({ content: '', rating: 0 });

  const [errors, setErrors] = useState({
    content: { error: false, message: '' },
    rating: { error: false, message: '' },
  });
  const [serverIssue, setServerIssue] = useState('');
  const [load, setLoad] = useState(false);

  const [reviews, setReviews] = useState(unit ? unit.reviews : []);

  const retrieveUnit = () => {
    unitsService
      .getUnit(id)
      .then((data) => {
        console.log(data);
        setUnit(data.data);
        console.log('reviews: ', data.data.reviews);
        setReviews(data.data.reviews);
        setLoad(false);
      })
      .catch((error) => {
        setServerIssue(`Error! ${error}`);
        setLoad(false);
      });
  };

  const unitDelete = () => {
    setServerIssue('');
    setLoad(true);
    console.log(unit._id);
    if (!user) {
      return setServerIssue('User not signed in');
    }
    if (user && !user.data.admin) {
      return setServerIssue('User does not have permission to delete unit');
    }
    return unitsService
      .deleteUnit(unit._id, user)
      .then((data) => {
        console.log(data.status);
        setUnit(null);
        retrieveUnit();
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
        setServerIssue(`Error! ${error}`);
      });
  };

  const searchReview = (qry) => {
    console.log(qry);
    if (qry !== '') {
      const revSearch = unit.reviews.filter(
        (rev) => rev.author.toLowerCase().search(qry.toLowerCase()) !== -1
          || rev.content.toLowerCase().search(qry.toLowerCase()) !== -1
          || rev.rating.toString().toLowerCase().search(qry.toLowerCase()) !== -1,
      );
      console.log(revSearch);
      setReviews(revSearch);
    } else {
      setReviews(unit ? unit.reviews : []);
    }
  };

  const addReview = () => {
    if (user) {
      const err = {
        content: { error: false, message: '' },
        rating: { error: false, message: '' },
      };
      let issue = false;
      if (newReview.content === '') {
        err.content = {
          error: true,
          message: 'comment field for review is empty',
        };
        issue = true;
      }
      if (newReview.rating === 0) {
        err.rating = {
          error: true,
          message: 'please rate review using the stars',
        };
        issue = true;
      }
      setErrors(err);
      if (issue) {
        return;
      }
      setLoad(true);
      console.log(newReview);
      unitsService
        .submitReview({
          ...newReview,
          author: user.data.username,
          user,
          unitId: unit._id,
        })
        .then((data) => {
          console.log(data);
          getUser();
          retrieveUnit();
          setNewReview({ content: '', rating: 0 });
        })
        .catch((error) => {
          setServerIssue(`Error! ${error.response.data.error}`);
          setLoad(false);
        });
    } else {
      alert('ERROR: User not signed in.');
    }
  };

  useEffect(() => {
    setLoad(true);
    retrieveUnit();
  }, [id]);

  // eslint-disable-next-line no-nested-ternary
  return load ? (
    <Dimmer inverted active={load}>
      <Loader active={load} />
    </Dimmer>
  ) : !unit ? (
    <Error />
  ) : (
    <>
      <Header as="h1" icon textAlign="center">
        <Icon
          name="chart bar"
          circular
          inverted
          color={(() => {
            if (unit.level <= 1999) {
              return 'blue';
            } if (unit.level <= 2999) {
              return 'green';
            }
            return 'red';
          })()}
        />
        <Header.Content>
          {unit.code}
          :
          {' '}
          {unit.title}
        </Header.Content>
      </Header>
      <Segment>
        <Grid columns={2} relaxed="very">
          <Grid.Column>
            <Header as="h4" icon>
              Description
            </Header>
            <p>{renderHTML(unit.description)}</p>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4" icon>
              Details
            </Header>
            <List>
              <List.Item>
                <List.Icon name="code" />
                <List.Content>
                  Unit :
                  {' '}
                  {unit.code}
                  {' '}
                  -
                  {' '}
                  {unit.title}
                  {' '}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="level up alternate" />
                <List.Content>
                  Level :
                  {' '}
                  {unit.level}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="money bill alternate" />
                <List.Content>
                  Credits :
                  {' '}
                  {unit.credits}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="warehouse" />
                <List.Content>
                  <List.Content>
                    Department :
                    {' '}
                    {unit.department}
                  </List.Content>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="group" />
                <List.Content>
                  <List.Content>
                    Group :
                    {' '}
                    {unit.group}
                  </List.Content>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="warning circle" />
                <List.Content>
                  <List.Content>
                    NCCW :
                    {' '}
                    {unit.nccw.map((u, idx) => (idx === unit.nccw.length - 1 ? <>{u}</> : (
                      <>
                        {u}
                        ,
                        {' '}
                      </>
                    )))}
                  </List.Content>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="edit" />
                <List.Content>
                  <List.Content>
                    Pre-requisites :
                    {' '}
                    {unit.prerequisites.map((u, idx) => (idx === unit.prerequisites.length - 1 ? (
                      <>{u}</>
                    ) : (
                      <>
                        {u}
                        ,
                        {' '}
                      </>
                    )))}
                  </List.Content>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Accordion fluid styled>
          <Accordion.Title
            active={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}
          >
            <Header as="h3">
              <Icon name="dropdown" />
              {' '}
              Offerings
            </Header>
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
                {unit.offerings.map((off) => (
                  <Table.Row key={off._id}>
                    <Table.Cell>{off.attendance}</Table.Cell>
                    <Table.Cell>{off.location}</Table.Cell>
                    <Table.Cell>{off.period}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 1}
            onClick={() => setActiveIndex(activeIndex === 1 ? -1 : 1)}
          >
            <Header as="h3">
              <Icon name="dropdown" />
              Activities
            </Header>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <Header as="h4">Scheduled</Header>
            {unit.activities.scheduled.length > 0 ? (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Offerings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {unit.activities.scheduled.map((act) => (
                    <Table.Row key={act._id}>
                      <Table.Cell>{act.name}</Table.Cell>
                      <Table.Cell>{renderHTML(act.description)}</Table.Cell>
                      <Table.Cell>
                        {act.offerings.map((a, idx) => (idx === act.offerings.length - 1 ? (
                          <>{a}</>
                        ) : (
                          <>
                            {a}
                            ,
                            {' '}
                          </>
                        )))}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <Header as="h5">No Scheduled Activities</Header>
            )}

            <Header as="h4">Non-Scheduled</Header>
            {unit.activities.nonScheduled.length > 0 ? (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Offerings</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {unit.activities.nonScheduled.map((act) => (
                    <Table.Row key={act._id}>
                      <Table.Cell>{act.name}</Table.Cell>
                      <Table.Cell>{act.description}</Table.Cell>
                      <Table.Cell>
                        {act.offerings.map((a, idx) => (idx === act.offerings.length - 1 ? (
                          <>{a}</>
                        ) : (
                          <>
                            {a}
                            ,
                            {' '}
                          </>
                        )))}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : (
              <Header as="h5">No Non-scheduled Activities</Header>
            )}
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 2}
            onClick={() => setActiveIndex(activeIndex === 2 ? -1 : 2)}
          >
            <Header as="h3">
              <Icon name="dropdown" />
              Assessments
            </Header>
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
                {unit.assessments.map((assess) => (
                  <Table.Row key={assess._id}>
                    <Table.Cell>{assess.title}</Table.Cell>
                    <Table.Cell>{assess.type}</Table.Cell>
                    <Table.Cell>
                      {assess.hurdle ? <font color="red">Yes</font> : <>No</>}
                    </Table.Cell>
                    <Table.Cell>{renderHTML(assess.description)}</Table.Cell>
                    <Table.Cell>
                      {assess.weighting}
                      %
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Accordion.Content>

          <Accordion.Title
            active={activeIndex === 3}
            onClick={() => setActiveIndex(activeIndex === 3 ? -1 : 3)}
          >
            <Header as="h3">
              <Icon name="dropdown" />
              Outcomes
            </Header>
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
                  // eslint-disable-next-line react/no-array-index-key
                  <Table.Row key={idx}>
                    <Table.Cell>
                      ULO
                      {idx + 1}
                    </Table.Cell>
                    <Table.Cell>{renderHTML(out)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Accordion.Content>
        </Accordion>
      </Segment>
      <Segment.Group>
        <Segment>
          <Form size="large">
            {!user && (
              <Header as="h3" textAlign="center">
                Login or create an account to add a review
              </Header>
            )}
            { user && unit.reviews.find(
              (rev) => rev.author === user.data.username,
            ) ? (
              <Header as="h3">You have submitted a review (see below)</Header>
              ) : (
                <>
                  <Header as="h3">Add Review</Header>
                  <Form.Field>
                    Rate Unit:
                    <Rating
                      icon="star"
                      defaultRating={newReview.rating}
                      maxRating={5}
                      onRate={(e, data) => setNewReview({ ...newReview, rating: data.rating })}
                    />
                    {errors.rating.error && (
                    <Message size="mini" negative>
                      <Message.Header>{errors.rating.message}</Message.Header>
                    </Message>
                    )}
                  </Form.Field>
                  <Form.TextArea
                    error={errors.content.error && errors.content.message}
                    rows={5}
                    fluid
                    placeholder="Comment..."
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  />
                  <Button onClick={addReview} color="green" size="small">
                    Submit Review
                  </Button>
                </>
              )}
          </Form>
          {serverIssue && (
            <Message
              onDismiss={() => setServerIssue('')}
              size="large"
              negative
            >
              <Message.Header>{serverIssue}</Message.Header>
            </Message>
          )}
        </Segment>
        <Segment>
          <Grid columns={3} stackable>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header as="h3">
                  Reviews (
                  {reviews.length}
                  )
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Search
                  onSearchChange={(e, data) => searchReview(data.value)}
                  input={{ fluid: true }}
                  showNoResults={false}
                  fluid
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment.Group>
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <Segment key={rev._id}>
                <Header as="h5">
                  <Image
                    src={`https://robohash.org/${rev.author}`}
                    centered
                    circular
                    size="small"
                  />
                  <Link to={`/user/${rev.author}`} as={NavLink}>
                    {rev.author.charAt(0).toUpperCase() + rev.author.slice(1)}
                  </Link>
                </Header>
                <Rating
                  icon="star"
                  defaultRating={rev.rating}
                  disabled
                  maxRating={5}
                />
                <p>{rev.content}</p>
                {user && rev.author === user.data.username && (
                  <Button
                    onClick={() => reviewDelete(
                      rev._id,
                      unit._id,
                      setServerIssue,
                      setLoad,
                      retrieveUnit,
                    )}
                    icon="trash alternate"
                    color="red"
                  />
                )}
              </Segment>
            ))
          ) : (
            <Header as="h3" align="center">
              No Reviews Found
            </Header>
          )}
        </Segment.Group>
      </Segment.Group>
      {user && user.data.admin && (
        <Button fluid onClick={() => unitDelete()} color="red">
          <Icon name="trash alternate" />
          {' '}
          DELETE UNIT
        </Button>
      )}
    </>
  );
};

export default UnitPage;
