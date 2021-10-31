import React from 'react';
import { BrowserRouter as NavLink } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

const Error = () => (
  <div>
    <center>
      <Header as="h1">404 Page Not Found</Header>
      <Button primary as={NavLink} to="/">Home</Button>
    </center>
  </div>
);

export default Error;
