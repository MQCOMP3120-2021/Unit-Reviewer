import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, Card, Rating, Pagination,
} from 'semantic-ui-react';
import Loading from './Loading';

const HomePage = ({ appLoaded, unitsLength, getUnits }) => {
  const [actPage, setActPage] = useState(1);
  const [homeUnits, setHomeUnits] = useState([]);
  const [loaded, setLoaded] = useState(appLoaded);
  const [loading, setLoading] = useState();
  console.log(Math.ceil(unitsLength / 10));

  const getHomeUnits = async () => {
    console.log('hi');
    console.log('active Page: ', actPage);
    let info = [];
    if (loaded.length < 1) {
      console.log('new load');
      setLoading(true);
      info = await getUnits(actPage, true);
    } else {
      setLoading(true);
      info = await getUnits(actPage);
    }
    // console.log("info: ",info)
    const allUnits = info[0];
    const pages = info[1];
    // console.log('loaded: ', pages);
    // console.log('allUnits: ', allUnits);
    // console.log("allUnits last: ",allUnits[allUnits.length-1])
    setLoaded(pages);
    setHomeUnits(allUnits);
    setLoading(false);
  };

  useEffect(() => {
    console.log('active page is: ', actPage);
    setHomeUnits([]);
    getHomeUnits();
  }, [actPage]);

  return (
    <>
      <Grid padded centered>
        <Grid.Row>
          {loading ? (
            <>
              {[...Array(10).keys()].map(() => (
                <div>
                  <Loading />
                </div>
              ))}
            </>
          ) : (
            homeUnits
              .filter((elem, idx) => {
                const c = loaded.indexOf(actPage) * 10;
                return idx >= c && idx < c + 10;
              })
              .map((item) => (
                <Link key={item._id} to={`unit/${item._id}`}>
                  <Card
                    style={{ marginBottom: 10, marginTop: 10, marginRight: 10 }}
                  >
                    <Card.Content header={item.code} />
                    <Card.Content description={item.title} />
                    <Card.Content extra>
                      <Rating
                        icon="star"
                        defaultRating={
                          item.reviews.length > 0
                          && item.reviews
                            .map((rev) => rev.rating)
                            .reduce((a, b) => a + b) / item.reviews.length
                        }
                        disabled
                        maxRating={5}
                      />
                      {' '}
                      (
                      {item.reviews.length === 1
                        ? `${item.reviews.length} Rating`
                        : `${item.reviews.length} Ratings`}
                      )
                    </Card.Content>
                  </Card>
                </Link>
              ))
          )}
        </Grid.Row>
        <Grid.Row>
          <Pagination
            onPageChange={(e, { activePage }) => {
              setActPage(activePage);
            }}
            size="mini"
            activePage={actPage}
            totalPages={Math.ceil(unitsLength / 10)}
          />
        </Grid.Row>
      </Grid>
    </>
  );
};

export default HomePage;
