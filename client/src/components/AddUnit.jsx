/* eslint-disable react/no-array-index-key */
import { React, useState } from 'react';
import {
  Grid,
  Header,
  Form,
  Segment,
  Button,
  Message,
  Dropdown,
  Modal,
  List,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import * as unitsService from '../services/units';

const AddUnit = ({ user }) => {
  const history = useHistory();
  const [formErrors, setFormErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [offering, setOffering] = useState({
    attendance: '',
    location: '',
    period: '',
  });
  const [assessment, setAssessment] = useState({
    description: '',
    hurdle: false,
    title: '',
    type: '',
    weighting: '',
  });
  const [outcome, setOutcome] = useState({
    description: '',
  });
  const [activity, setActivity] = useState({
    description: '',
    name: '',
    offerings: [],
    sched: '',
  });
  const [newUnit, setNewUnit] = useState({
    code: '',
    title: '',
    description: '',
    offerings: [],
    activities: { scheduled: [], nonScheduled: [] },
    assessments: [],
    credits: 10,
    department: '',
    faculty: '',
    group: '',
    level: '',
    prerequisites: [],
    nccw: [],
    outcomes: [],
  });

  const groupOptions = [
    { key: 'u', text: 'Undergraduate', value: 'Undergraduate' },
    { key: 'p', text: 'Postgraduate', value: 'Postgraduate' },
  ];

  const levelOptions = [
    { key: 'one', text: '1000', value: '1000' },
    { key: 'two', text: '2000', value: '2000' },
    { key: 'three', text: '3000', value: '3000' },
    { key: 'four', text: '4000', value: '4000' },
    { key: 'five', text: '5000', value: '5000' },
    { key: 'six', text: '6000', value: '6000' },
    { key: 'seven', text: '7000', value: '7000' },
    { key: 'eight', text: '8000', value: '8000' },
  ];

  const offeringOptions = {
    attendance: [
      { key: 'w', text: 'Weekday attendance', value: 'Weekday attendance' },
      { key: 'f', text: 'Fully online/virtual', value: 'Fully online/virtual' },
      {
        key: 's',
        text: 'Special circumstances',
        value: 'Special circumstances',
      },
    ],
    location: [
      { key: 'n', text: 'North Ryde', value: 'North Ryde' },
      { key: 'f', text: 'City', value: 'City' },
    ],
    period: [
      { key: 's1', text: 'Session 1', value: 'Session 1' },
      { key: 's2', text: 'Session 2', value: 'Session 2' },
      { key: 's3', text: 'Session 3', value: 'Session 3' },
    ],
  };
  const addOffering = () => {
    if (
      offering.attendance !== ''
      && offering.location !== ''
      && offering.period !== ''
    ) {
      const newOffs = newUnit.offerings;
      newOffs.push(offering);
      setNewUnit({ ...newUnit, offerings: newOffs });
      console.log(newOffs);
      setOffering({
        attendance: '',
        location: '',
        period: '',
      });
    }
  };

  const deleteOffering = (idx) => {
    const exOffs = newUnit.offerings;
    exOffs.splice(idx, 1);
    setNewUnit({ ...newUnit, offerings: exOffs });
    console.log(exOffs);
  };

  const assessmentOptions = {
    hurdle: [
      { key: 'n', text: 'No', value: 'No' },
      { key: 'y', text: 'Yes', value: 'Yes' },
    ],
    type: [
      { key: 'e', text: 'Essay', value: 'Essay' },
      { key: 'pr', text: 'Project', value: 'Project' },
      { key: 't', text: 'Quiz/Test', value: 'Quiz/Test' },
      { key: 'x', text: 'Examination', value: 'Examination' },
      { key: 'p', text: 'Problem set', value: 'Problem set' },
      {
        key: 'q',
        text: 'Quantitative analysis task',
        value: 'Quantitative analysis task',
      },
      { key: 'pt', text: 'Participatory task', value: 'Participatory task' },
    ],
  };
  const addAssessment = () => {
    if (
      assessment.description !== ''
      && assessment.title !== ''
      && assessment.type !== ''
      && assessment.type !== ''
      && Number(assessment.weighting) >= 0
    ) {
      const newAssess = newUnit.assessments;
      newAssess.push(assessment);
      setNewUnit({ ...newUnit, assessments: newAssess });
      console.log(newAssess);
      setAssessment({
        description: '',
        hurdle: false,
        title: '',
        type: '',
        weighting: -1,
      });
    }
  };
  const deleteAssessment = (idx) => {
    const exAssess = newUnit.assessments;
    exAssess.splice(idx, 1);
    setNewUnit({ ...newUnit, assessments: exAssess });
    console.log(exAssess);
  };

  const addOutcome = () => {
    if (outcome.description !== '') {
      const newOut = newUnit.outcomes;
      newOut.push(outcome.description);
      setNewUnit({ ...newUnit, outcomes: newOut });
      console.log(newOut);
      setOutcome({
        description: '',
      });
    }
  };
  const deleteOutcome = (idx) => {
    const exOut = newUnit.outcomes;
    exOut.splice(idx, 1);
    setNewUnit({ ...newUnit, outcomes: exOut });
    console.log(exOut);
  };

  const activityOptions = {
    scheduled: [
      { key: 'to', text: 'Tutorial (online)', value: 'Tutorial (online)' },
      {
        key: 'tc',
        text: 'Tutorial (on campus)',
        value: 'Tutorial (on campus)',
      },
      { key: 'lo', text: 'Lecture (online)', value: 'Lecture (online)' },
      { key: 'lc', text: 'Lecture (on campus)', value: 'Lecture (on campus)' },
      { key: 'fw', text: 'Fieldwork', value: 'Fieldwork' },
    ],
    nonScheduled: [
      { key: 'rd', text: 'Readings', value: 'Readings' },
      { key: 'rh', text: 'Research', value: 'Research' },
      { key: 'or', text: 'Online resources', value: 'Online resources' },
      { key: 'cp', text: 'Class preparation', value: 'Class preparation' },
    ],
    offerings: [
      {
        key: 's1n',
        text: 'Session 1-Weekday-North Ryde',
        value: 'Session 1-Weekday-North Ryde',
      },
      {
        key: 's2n',
        text: 'Session 2-Weekday-North Ryde',
        value: 'Session 2-Weekday-North Ryde',
      },
      { key: 's1o', text: 'Session 1-Online', value: 'Session 1-Online' },
      { key: 's2o', text: 'Session 2-Online', value: 'Session 2-Online' },
      { key: 's1p', text: 'Session 1-Special', value: 'Session 1-Special' },
      { key: 's2p', text: 'Session 2-Special', value: 'Session 2-Special' },
      {
        key: 's1in',
        text: 'Session 1-Infrequent-North Ryde',
        value: 'Session 1-Infrequent-North Ryde',
      },
      {
        key: 's2in',
        text: 'Session 2-Infrequent-North Ryde',
        value: 'Session 2-Infrequent-North Ryde',
      },
      {
        key: 's1c',
        text: 'Session 1-Weekday-City',
        value: 'Session 1-Weekday-City',
      },
      {
        key: 's2c',
        text: 'Session 2-Weekday-City',
        value: 'Session 2-Weekday-City',
      },
    ],
  };
  const addActivity = () => {
    if (
      activity.description !== ''
      && activity.name !== ''
      && activity.sched !== ''
      && activity.offerings.length !== 0
    ) {
      const newAct = newUnit.activities;
      if (activity.sched === 'Scheduled') {
        newAct.scheduled.push(activity);
        setNewUnit({ ...newUnit, activities: newAct });
      } else {
        newAct.nonScheduled.push(activity);
        setNewUnit({ ...newUnit, activities: newAct });
      }
      setActivity({
        description: '',
        name: '',
        offerings: [],
        sched: '',
      });
      console.log(newAct);
    }
  };
  const deleteSchedActivity = (idx) => {
    const exAct = newUnit.activities;
    exAct.scheduled.splice(idx, 1);
    setNewUnit({ ...newUnit, activities: exAct });
    console.log(exAct);
  };
  const deleteNonSchedActivity = (idx) => {
    const exAct = newUnit.activities;
    exAct.nonScheduled.splice(idx, 1);
    setNewUnit({ ...newUnit, activities: exAct });
    console.log(exAct);
  };

  const addUnit = () => {
    console.log(newUnit);
    setOpen(true);

    if (!user || !user.data.admin) {
      const frm = formErrors;
      frm.push('user is not signed in or does not have permission');
      setFormErrors(frm);
    }
    if (newUnit.code === '') {
      const frm = formErrors;
      frm.push('code field is empty');
      setFormErrors(frm);
    }
    if (newUnit.level === '') {
      const frm = formErrors;
      frm.push('level field is empty');
      setFormErrors(frm);
    }
    if (newUnit.title === '') {
      const frm = formErrors;
      frm.push('title field is empty');
      setFormErrors(frm);
    }
    if (Number(newUnit.credits) < 0 || newUnit.credits === '') {
      const frm = formErrors;
      frm.push('credits field is empty or invalid (i.e., less than 0)');
      setFormErrors(frm);
    }
    if (newUnit.department === '') {
      const frm = formErrors;
      frm.push('department field is empty');
      setFormErrors(frm);
    }
    if (newUnit.faculty === '') {
      const frm = formErrors;
      frm.push('faculty field is empty');
      setFormErrors(frm);
    }
    if (newUnit.description === '') {
      const frm = formErrors;
      frm.push('description field is empty');
      setFormErrors(frm);
    }
    if (newUnit.group === '') {
      const frm = formErrors;
      frm.push('group field is empty');
      setFormErrors(frm);
    }
    if (newUnit.offerings.length === 0) {
      const frm = formErrors;
      frm.push('No offerings for unit, please enter at least one offering');
      setFormErrors(frm);
    }
    if (
      newUnit.activities.scheduled.length === 0
      && newUnit.activities.nonScheduled.length === 0
    ) {
      const frm = formErrors;
      frm.push(
        'No activities for unit, please enter at least one scheduled or non-scheduled activity',
      );
      setFormErrors(frm);
    }
    if (newUnit.assessments.length === 0) {
      const frm = formErrors;
      frm.push('No assessments for unit, please enter at least one assessment');
      setFormErrors(frm);
    }
    if (newUnit.assessments.length > 0) {
      const percentages = newUnit.assessments.map((assess) => Number(assess.weighting));
      const sum = percentages.reduce((a, b) => a + b, 0);
      if (sum !== 100) {
        const frm = formErrors;
        frm.push(
          `Assessment weigthings do not add up to 100%, the current total is ${sum}%`,
        );
        setFormErrors(frm);
      }
    }
    if (newUnit.outcomes.length === 0) {
      const frm = formErrors;
      frm.push(
        'No unit learning outcomes for unit, please enter at least one unit learning outcome',
      );
      setFormErrors(frm);
    }

    if (formErrors.length > 0) {
      return;
    }

    const send = { ...newUnit, user };
    unitsService
      .createUnit(send)
      .then((data) => {
        console.log(data);
        history.push(`/unit/${data.data._id}`);
      })
      .catch((error) => {
        console.log(`Error! ${error}`);
      });
  };

  return (
    <>
      <Grid padded centered>
        <Grid.Column>
          <Form size="large">
            <Segment stacked>
              <Form.Field required>
                <Form.Input
                  fluid
                  icon="code"
                  iconPosition="left"
                  placeholder="Code"
                  value={newUnit.code}
                  onChange={(e) => setNewUnit({ ...newUnit, code: e.target.value })}
                />
              </Form.Field>
              <Form.Field required>
                <label>Level</label>
                <Form.Select
                  options={levelOptions}
                  placeholder="Level"
                  value={newUnit.level}
                  onChange={(e, { value }) => setNewUnit({ ...newUnit, level: value })}
                  search
                />
              </Form.Field>
              <Form.Field required>
                <label>Title</label>
                <Form.Input
                  fluid
                  icon="bookmark outline"
                  iconPosition="left"
                  placeholder="Title"
                  value={newUnit.title}
                  onChange={(e) => setNewUnit({ ...newUnit, title: e.target.value })}
                />
              </Form.Field>
              <Form.Field required>
                <label>Credits</label>
                <Form.Input
                  type="number"
                  fluid
                  icon="money bill alternate"
                  iconPosition="left"
                  placeholder="Credits"
                  value={newUnit.credits}
                  onChange={(e) => setNewUnit({ ...newUnit, credits: e.target.value })}
                />
              </Form.Field>
              <Form.Field required>
                <label>Department</label>
                <Form.Input
                  fluid
                  icon="warehouse"
                  iconPosition="left"
                  placeholder="Department"
                  value={newUnit.department}
                  onChange={(e) => setNewUnit({ ...newUnit, department: e.target.value })}
                />
              </Form.Field>
              <Form.Field required>
                <label>Faculty</label>
                <Form.Input
                  fluid
                  icon="plus square"
                  iconPosition="left"
                  placeholder="Faculty"
                  value={newUnit.faculty}
                  onChange={(e) => setNewUnit({ ...newUnit, faculty: e.target.value })}
                />
              </Form.Field>

              <Form.Field required>
                <label>Description</label>
                <Form.TextArea
                  rows={8}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Description"
                  value={newUnit.description}
                  onChange={(e) => setNewUnit({ ...newUnit, description: e.target.value })}
                />
              </Form.Field>
              <Form.Field required>
                <label>Group</label>
                <Form.Select
                  options={groupOptions}
                  placeholder="Group"
                  value={newUnit.group}
                  onChange={(e, { value }) => setNewUnit({ ...newUnit, group: value })}
                  search
                />
              </Form.Field>
              <Form.Field>
                <label>NCCW</label>
                <Form.Input
                  fluid
                  icon="code"
                  iconPosition="left"
                  placeholder="NCCW Codes"
                  value={newUnit.nccw}
                  onChange={(e) => {
                    const str = e.target.value.split(',');
                    setNewUnit({ ...newUnit, nccw: str });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Pre-requisites</label>
                <Form.Input
                  fluid
                  icon="edit"
                  iconPosition="left"
                  placeholder="Pre-reqs"
                  value={newUnit.prerequisites}
                  onChange={(e) => {
                    const str = e.target.value.split(',');
                    setNewUnit({ ...newUnit, prerequisites: str });
                  }}
                />
              </Form.Field>

              <Header as="h2">Offerings</Header>
              {newUnit.offerings.map((item, idx) => (
                <Message
                  onDismiss={() => deleteOffering(idx)}
                  key={idx}
                  size="small"
                >
                  Attendance -
                  {' '}
                  {item.attendance}
                  , Location -
                  {' '}
                  {item.location}
                  ,
                  Period -
                  {' '}
                  {item.period}
                </Message>
              ))}
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Attendance</label>
                  <Form.Select
                    options={offeringOptions.attendance}
                    placeholder="Attendance"
                    value={offering.attendance}
                    onChange={(e, { value }) => setOffering({ ...offering, attendance: value })}
                    search
                  />
                </Form.Field>
                <Form.Field>
                  <label>Location</label>
                  <Form.Select
                    options={offeringOptions.location}
                    placeholder="Location"
                    value={offering.location}
                    onChange={(e, { value }) => setOffering({ ...offering, location: value })}
                    search
                  />
                </Form.Field>
                <Form.Field>
                  <label>Period</label>
                  <Form.Select
                    options={offeringOptions.period}
                    placeholder="Period"
                    value={offering.period}
                    onChange={(e, { value }) => setOffering({ ...offering, period: value })}
                    search
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={addOffering} color="green" size="small">
                Add Offering
              </Button>

              <Header as="h2">Activities</Header>
              {newUnit.activities.scheduled.length > 0 && (
                <Header as="h3">Scheduled Activities</Header>
              )}
              {newUnit.activities.scheduled.map((item, idx) => (
                <Message
                  onDismiss={() => deleteSchedActivity(idx)}
                  key={idx}
                  size="small"
                >
                  Name -
                  {' '}
                  {item.name}
                  , Description -
                  {' '}
                  {item.description}
                  ,
                  Offerings -
                  {' '}
                  {item.offerings}
                </Message>
              ))}
              {newUnit.activities.nonScheduled.length > 0 && (
                <Header as="h3">Non-Scheduled Activities</Header>
              )}
              {newUnit.activities.nonScheduled.map((item, idx) => (
                <Message
                  onDismiss={() => deleteNonSchedActivity(idx)}
                  key={idx}
                  size="small"
                >
                  Name -
                  {' '}
                  {item.name}
                  , Description -
                  {' '}
                  {item.description}
                  ,
                  Offerings -
                  {' '}
                  {item.offerings}
                </Message>
              ))}
              <Form.Group widths="equal">
                <Form.Group inline>
                  <label>Scheduling Type</label>
                  <Form.Radio
                    label="Scheduled"
                    checked={activity.sched === 'Scheduled'}
                    onChange={() => setActivity({ ...activity, sched: 'Scheduled' })}
                  />
                  <Form.Radio
                    label="Non-Scheduled"
                    checked={activity.sched === 'Non-Scheduled'}
                    onChange={() => setActivity({ ...activity, sched: 'Non-Scheduled' })}
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Activity Name</label>
                  <Form.Select
                    options={(() => {
                      if (activity.sched === '') {
                        return [];
                      }
                      if (activity.sched === 'Scheduled') {
                        return activityOptions.scheduled;
                      }

                      return activityOptions.nonScheduled;
                    })()}
                    disabled={activity.sched === ''}
                    placeholder="Activity Name"
                    value={activity.name}
                    onChange={(e, { value }) => setActivity({ ...activity, name: value })}
                    search
                  />
                </Form.Field>
                <Form.Field>
                  <label>Offerings</label>
                  <Dropdown
                    placeholder="Offerings"
                    fluid
                    multiple
                    search
                    selection
                    value={activity.offerings}
                    options={activityOptions.offerings}
                    onChange={(e, { value }) => setActivity({ ...activity, offerings: value })}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Activity Description</label>
                  <Form.TextArea
                    rows={5}
                    placeholder="Activity Description"
                    value={activity.description}
                    onChange={(e) => setActivity({ ...activity, description: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={addActivity} color="green" size="small">
                Add Activity
              </Button>

              <Header as="h2">Assessments</Header>
              {newUnit.assessments.map((item, idx) => (
                <Message
                  onDismiss={() => deleteAssessment(idx)}
                  key={idx}
                  size="small"
                >
                  Title -
                  {' '}
                  {item.title}
                  , Type -
                  {' '}
                  {item.type}
                  , Hurdle -
                  {' '}
                  {item.hurdle ? 'Yes' : 'No'}
                  , Description -
                  {' '}
                  {item.description}
                  , Weighting -
                  {' '}
                  {item.weighting}
                  %
                </Message>
              ))}
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Title</label>
                  <Form.Input
                    fluid
                    placeholder="Title"
                    value={assessment.title}
                    onChange={(e) => setAssessment({ ...assessment, title: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Type</label>
                  <Form.Select
                    options={assessmentOptions.type}
                    placeholder="Assessment Type"
                    value={assessment.type}
                    onChange={(e, { value }) => setAssessment({ ...assessment, type: value })}
                    search
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Hurdle</label>
                  <Form.Select
                    options={assessmentOptions.hurdle}
                    placeholder="Hurdle (automatically no if not set)"
                    value={assessment.hurdle ? 'Yes' : 'No'}
                    onChange={(e, { value }) => setAssessment({ ...assessment, hurdle: value === 'Yes' })}
                    search
                  />
                </Form.Field>
                <Form.Field>
                  <label>Weighting</label>
                  <Form.Input
                    type="number"
                    fluid
                    placeholder="Weighting"
                    value={assessment.weighting}
                    onChange={(e) => setAssessment({
                      ...assessment,
                      weighting: e.target.value,
                    })}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Assessment Description</label>
                  <Form.TextArea
                    rows={8}
                    placeholder="Assessment Description"
                    value={assessment.description}
                    onChange={(e) => setAssessment({
                      ...assessment,
                      description: e.target.value,
                    })}
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={addAssessment} color="green" size="small">
                Add Assessment
              </Button>

              <Header as="h2">Unit Learning Outcomes</Header>
              {newUnit.outcomes.map((item, idx) => (
                <Message
                  onDismiss={() => deleteOutcome(idx)}
                  key={idx}
                  size="small"
                >
                  ULO
                  {idx + 1}
                  {' '}
                  -
                  {' '}
                  {item}
                </Message>
              ))}
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Description</label>
                  <Form.Input
                    fluid
                    placeholder="Unit Learning Outcome Description"
                    value={outcome.description}
                    onChange={(e) => setOutcome({ ...outcome, description: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={addOutcome} color="green" size="small">
                Add ULO
              </Button>
            </Segment>
            <Modal
              centered={false}
              open={open}
              trigger={(
                <Button onClick={addUnit} color="teal" size="large">
                  Submit New Unit
                </Button>
              )}
            >
              {formErrors.length > 0 ? (
                <>
                  <Modal.Header>ERROR!</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <p>The following errors have occurred:</p>

                      <List bulleted>
                        {formErrors.map((err, idx) => (
                          <List.Item key={idx}>{err}</List.Item>
                        ))}
                      </List>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      color="black"
                      onClick={() => {
                        setFormErrors([]);
                        setOpen(false);
                      }}
                    >
                      Ok
                    </Button>
                  </Modal.Actions>
                </>
              ) : (
                <>
                  <Modal.Header>
                    Saving Form
                    <Segment>
                      <Dimmer active inverted>
                        <Loader active />
                      </Dimmer>
                    </Segment>
                  </Modal.Header>
                  <Modal.Actions>
                    <Button
                      color="black"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Ok
                    </Button>
                  </Modal.Actions>
                </>
              )}
            </Modal>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default AddUnit;
