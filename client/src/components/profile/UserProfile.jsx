import { React, useState, useEffect } from 'react';
import { BrowserRouter as NavLink, Link, useParams } from 'react-router-dom';
import {
  Image,
  Header,
  Grid,
  Segment,
  Rating,
  Button,
  Loader,
  Dimmer,
  Icon,
  Message,
  Accordion,
  Search,
} from 'semantic-ui-react';
import { ColorPicker } from 'react-color-palette';
import * as authService from '../../services/auth';
import AdminModal from './AdminModal';
import 'react-color-palette/lib/css/styles.css';

const Profile = ({
  reviewDelete, user, getUser, color, setColor,
}) => {
  const { author } = useParams();

  const [modalOpen, setModalOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [serverIssue, setServerIssue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const [formUsername, setFormUsername] = useState('');
  const [makeAdmin, setMakeAdmin] = useState(false);
  const [reviews, setReviews] = useState([]);

  const changeAdmin = (usrname) => {
    setLoad(true);
    if (!makeAdmin) {
      authService
        .revokeAdmin(usrname)
        .then((data) => {
          console.log('Success: ', data);
          getUser();
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    } else {
      authService
        .makeAdmin(usrname)
        .then((data) => {
          console.log('Success: ', data);
          getUser();
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
    setLoad(false);
    setModalOpen(false);
  };

  const searchReview = (qry) => {
    console.log(qry);
    if (qry !== '') {
      const revSearch = user.data.reviews.filter(
        (rev) => rev.author.toLowerCase().search(qry.toLowerCase()) !== -1
          || rev.content.toLowerCase().search(qry.toLowerCase()) !== -1
          || rev.rating.toString().toLowerCase().search(qry.toLowerCase()) !== -1,
      );
      console.log(revSearch);
      setReviews(revSearch);
    } else {
      setReviews(user ? user.data.reviews : []);
    }
  };

  useEffect(() => {
    document.body.style.setProperty('--color-picked', color.hex);
  }, [color]);

  useEffect(() => {
    if (user && user.data.username === author) {
      setReviews(user.data.reviews);
    } else if (!user) {
      getUser();
    }
    console.log('change');
  }, [user]);

  return (
    <>
      <Dimmer active={load} inverted>
        <Loader active={load} />
      </Dimmer>
      {serverIssue && (
        <Message onDismiss={() => setServerIssue('')} negative>
          <Message.Header>{serverIssue}</Message.Header>
        </Message>
      )}
      <Image
        src={`https://robohash.org/${author}`}
        centered
        circular
        size="small"
      />
      <Header size="huge" icon textAlign="center">
        <Header as="h2">
          {author.charAt(0).toUpperCase() + author.slice(1)}
        </Header>
        {/* <Label padded size="medium">{reviews.length} Reviews</Label> */}
        <Grid.Row textAlign="center">
          {user && user.data.username === author && user.data.admin && (
            <>
              <Button
                size="small"
                onClick={() => {
                  setMakeAdmin(true);
                  setModalOpen(true);
                }}
              >
                Add administrator privileges
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setMakeAdmin(false);
                  setModalOpen(true);
                }}
              >
                Revoke administrator privileges
              </Button>
            </>
          )}
        </Grid.Row>
      </Header>

      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 0}
          onClick={() => setActiveIndex(activeIndex === 0 ? -1 : 0)}
        >
          <Header as="h3">
            {' '}
            <Icon name="dropdown" />
            Change Theme
          </Header>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Grid.Row textAlign="center">
            <ColorPicker
              width={456}
              height={228}
              color={color}
              onChange={setColor}
              hideHSV
              dark
            />
          </Grid.Row>
        </Accordion.Content>
      </Accordion>

      {user && user.data.username === author ? (
        <Segment.Group>
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
            {reviews.map((rev) => (
              <Segment key={rev._id}>
                <Grid stackable container columns={2}>
                  <Grid.Column width={12}>
                    <Header as="h5">
                      <Link to={`/unit/${rev.unitId}`} as={NavLink}>
                        Unit
                        <Icon name="arrow circle right" />
                      </Link>
                    </Header>
                    <Rating
                      icon="star"
                      defaultRating={rev.rating}
                      disabled
                      maxRating={5}
                    />
                    <p>{rev.content}</p>
                  </Grid.Column>
                  <Grid.Column width={4} verticalAlign="middle">
                    {user && rev.author === user.data.username && (
                      <Button
                        fluid
                        color="red"
                        onClick={() => reviewDelete(
                          rev._id,
                          rev.unitId,
                          setServerIssue,
                          setLoad,
                        )}
                      >
                        <Icon name="trash alternate" />
                        {' '}
                        Delete
                      </Button>
                    )}
                  </Grid.Column>
                </Grid>
              </Segment>
            ))}
          </Segment.Group>
        </Segment.Group>
      ) : (
        <Segment>
          {user && user.data.username === author ? (
            <Header as="h3" icon textAlign="center">
              User&apos;s reviews will show up here once at least one is submitted
            </Header>
          ) : (
            <Header as="h3" icon textAlign="center">
              You do not have permission to see other reviews from user
            </Header>
          )}
        </Segment>
      )}
      {modalOpen && (
        <AdminModal
          setOpen={setModalOpen}
          makeAdmin={makeAdmin}
          username={formUsername}
          setUsername={setFormUsername}
          changeAdmin={changeAdmin}
          load={load}
        />
      )}
    </>
  );
};

export default Profile;
