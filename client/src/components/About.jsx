import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

const About = () => (
  <Segment className="custom-padding-class">
    <Header as="h1">About MQ&apos;s Unit Review</Header>
    <p>
      This is a unit review website. The website displays unit
      information similar to Macquarie University’s unit guide
      (e.g., learning outcomes, description,assessment breakdowns),
      as well as allow users to rate and comment on units. It allows
      future students to see previous student’s opinions on certain units
      over time, rather than relying on word-of-mouth. Future students can
      now make informed decisions on what units to take. Obviously, the
      target audience would obviously is students as well as upcoming students.
    </p>
  </Segment>
);

export default About;
