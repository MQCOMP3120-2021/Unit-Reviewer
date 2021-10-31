import React from 'react';
import {
  Header, Button, Modal, Loader, Dimmer, Form,
} from 'semantic-ui-react';

const AdminModal = ({
  setOpen,
  makeAdmin,
  setUsername,
  username,
  changeAdmin,
  load,
}) => (
  <Modal
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open
    size="small"
    centered={false}
  >
    <Header>Are you sure?</Header>
    <Modal.Content>
      <p>
        If you are not a lecturer and/or tutor, making changes to this will have
        serious consequences.
      </p>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Field>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button color="green" onClick={() => changeAdmin(username)}>
        {makeAdmin ? 'Make Admin' : 'Revoke Admin'}
        <Dimmer active={load} inverted>
          <Loader active={load} />
        </Dimmer>
      </Button>
    </Modal.Actions>
  </Modal>
);

export default AdminModal;
