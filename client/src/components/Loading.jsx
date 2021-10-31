import React from 'react';
import { Card, Placeholder } from 'semantic-ui-react';

const Loading = () => (
  <Card style={{ marginBottom: 10, marginTop: 10, marginRight: 10 }}>
    <Card.Content>
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line length="medium" />
        </Placeholder.Header>
      </Placeholder>
    </Card.Content>
    <Card.Content>
      <Placeholder>
        <Placeholder.Paragraph>
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Card.Content>
    <Card.Content extra>
      <Placeholder>
        <Placeholder.Paragraph>
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Card.Content>
  </Card>
);

export default Loading;
