import { Header, Button, Modal, Loader, Dimmer, Form } from "semantic-ui-react";

const AdminModal = ({setOpen, makeAdmin, setUsername, username, changeAdmin, load}) => {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={true}
      size="small"
      centered={false}
    >
      <Header>Are you sure?</Header>
      <Modal.Content>
        <p>
          If you are not a lecturer and/or tutor, making changes to this will
          have serious consequences.
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
        <Button color="red" onClick={(e) => setOpen(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={(e) => changeAdmin(username)}>
          {makeAdmin ? "Make Admin" : "Revoke Admin"}
          <Dimmer active={load} inverted>
            <Loader active={load} />
          </Dimmer>
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AdminModal;
