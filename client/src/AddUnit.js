import { useState } from "react";
import { Grid, Header, Image, Form, Segment, Button, Message, Dropdown } from "semantic-ui-react";
import logo from './img/logo.png'
import unitsService from '../src/services/units'

const AddUnit = ({getUnits, user}) => {

  const groupOptions = [
    { key: "u", text: "Undergraduate", value: "Undergraduate" },
    { key: "p", text: "Postgraduate", value: "Postgraduate" },
  ]

  const levelOptions = [
    { key: "one", text: "1000", value: "1000" },
    { key: "two", text: "2000", value: "2000" },
    { key: "three", text: "3000", value: "3000" },
    { key: "four", text: "4000", value: "4000" },
    { key: "five", text: "5000", value: "5000" },
    { key: "six", text: "6000", value: "6000" },
    { key: "seven", text: "7000", value: "7000" },
    { key: "eight", text: "8000", value: "8000" },
  ]

  const [offering, setOffering] = useState({
    attendance: "",
    location: "",
    period: ""
  })
  const offeringOptions = {
    attendance: [
      { key: "w", text: "Weekday attendance", value: "Weekday attendance" },
      { key: "f", text: "Fully online/virtual", value: "Fully online/virtual" },
      { key: "s", text: "Special circumstances", value: "Special circumstances" }
    ],
    location: [
      { key: "n", text: "North Ryde", value: "North Ryde" },
      { key: "f", text: "City", value: "City" },
    ],
    period: [
      { key: "s1", text: "Session 1", value: "Session 1" },
      { key: "s2", text: "Session 2", value: "Session 2" },
      { key: "s3", text: "Session 3", value: "Session 3" },
    ]
  }
  const addOffering = () => {
    let offs = newUnit.offerings
    if (offering.attendance !== "" && offering.location !== "", offering.period !== "") {
      offs["o" + (Object.keys(offs).length + 1)] = offering
      setNewUnit({ ...newUnit, offerings: offs })
      setOffering({
        attendance: "",
        location: "",
        period: ""
      })
      console.log(offs)
    }
  }

  const deleteOffering = (key) => {
    let exOffs = newUnit.offerings
    delete exOffs[key]
    const keys = Object.keys(exOffs)
    let upOffs = {}
    for(let i = 0; i < keys.length; i++) {
      upOffs["o"+(i+1)] = exOffs[keys[i]]
    }
    console.log(upOffs)
    setNewUnit({...newUnit, offerings: upOffs})
  }



  const [assessment, setAssessment] = useState({
    description: "",
    hurdle: "",
    title: "",
    type: "",
    weighting: ""
  })
  const assessmentOptions = {
    hurdle: [
      { key: "n", text: "No", value: "No" },
      { key: "y", text: "Yes", value: "Yes" }
    ],
    type: [
      { key: "e", text: "Essay", value: "Essay" },
      { key: "t", text: "Quiz/Test", value: "Quiz/Test" },
      { key: "x", text: "Examination", value: "Examination" },
      { key: "p", text: "Problem set", value: "Problem set" },
      { key: "q", text: "Quantitative analysis task", value: "Quantitative analysis task" },
      { key: "pt", text: "Participatory task", value: "Participatory task" }
    ]
  }
  const addAssessment = () => {
    let assess = newUnit.assessments
    if (assessment.description !== "" && assessment.hurdle !== "", assessment.title !== "" && assessment.type !== ""
      && assessment.type !== "" && assessment.weighting !== "") {
        assess["a" + Object.keys(assess).length] = assessment
      setNewUnit({ ...newUnit, assessments: assess })
      setAssessment({
        description: "",
        hurdle: "",
        title: "",
        type: "",
        weighting: ""
      })
      console.log(assess)
    }
  }
  const deleteAssessment = (key) => {
    let exOffs = newUnit.assessments
    delete exOffs[key]
    const keys = Object.keys(exOffs)
    let upOffs = {}
    for(let i = 0; i < keys.length; i++) {
      upOffs["a"+i] = exOffs[keys[i]]
    }
    console.log(upOffs)
    setNewUnit({...newUnit, assessments: upOffs})
  }



  const [outcome, setOutcome] = useState({
    description: ""
  })
  const addOutcome = () => {
    let otcomes = newUnit.outcomes
    if (outcome.description !== "") {
      otcomes["ULO" + (Object.keys(otcomes).length + 1)] = outcome.description
      setNewUnit({ ...newUnit, outcomes: otcomes })
      setOutcome({
        description: ""
      })
      console.log(otcomes)
    }
  }
  const deleteOutcome = (key) => {
    let exOffs = newUnit.outcomes
    delete exOffs[key]
    const keys = Object.keys(exOffs)
    let upOffs = {}
    for(let i = 0; i < keys.length; i++) {
      upOffs["ULO"+(i+1)] = exOffs[keys[i]]
    }
    console.log(upOffs)
    setNewUnit({...newUnit, outcomes: upOffs})
  }




  const [activity, setActivity] = useState({
    description: "",
    name: "",
    offerings: [],
    sched:""
  })
  const activityOptions = {
    scheduled: [
      { key: "to", text: "Tutorial (online)", value: "Tutorial (online)" },
      { key: "tc", text: "Tutorial (on campus)", value: "Tutorial (on campus)" },
      { key: "lo", text: "Lecture (online)", value: "Lecture (online)" },
      { key: "lc", text: "Lecture (on campus)", value: "Lecture (on campus)" },
      { key: "fw", text: "Fieldwork", value: "Fieldwork" },
    ],
    non_scheduled: [
      { key: "rd", text: "Readings", value: "Readings" },
      { key: "rh", text: "Research", value: "Research" },
      { key: "or", text: "Online resources", value: "Online resources" },
      { key: "cp", text: "Class preparation", value: "Class preparation" },
    ],
    offerings: [
      { key: "s1n", text: "Session 1-Weekday-North Ryde", value: "Session 1-Weekday-North Ryde" },
      { key: "s2n", text: "Session 2-Weekday-North Ryde", value: "Session 2-Weekday-North Ryde" },
      { key: "s1o", text: "Session 1-Online", value: "Session 1-Online" },
      { key: "s2o", text: "Session 2-Online", value: "Session 2-Online" },
      { key: "s1p", text: "Session 1-Special", value: "Session 1-Special" },
      { key: "s2p", text: "Session 2-Special", value: "Session 2-Special" },
      { key: "s1in", text: "Session 1-Infrequent-North Ryde", value: "Session 1-Infrequent-North Ryde" },
      { key: "s2in", text: "Session 2-Infrequent-North Ryde", value: "Session 2-Infrequent-North Ryde" },
      { key: "s1c", text: "Session 1-Weekday-City", value: "Session 1-Weekday-City" },
      { key: "s2c", text: "Session 2-Weekday-City", value: "Session 2-Weekday-City" },
    ]
  }
  const addActivity = () => {
    let act = newUnit.activities
    if (activity.description !== "" && activity.name !== "" && activity.sched !== "" && activity.offerings.length !== 0) {
      if(activity.sched === "Scheduled") {
        act['scheduled']["s" + Object.keys(act['scheduled']).length] = {
          description: activity.description, 
          name: activity.name, 
          offerings: activity.offerings.toString()
        }
      } else {
        act['non_scheduled']["ns" + Object.keys(act['non_scheduled']).length] = {
          description: activity.description, 
          name: activity.name, 
          offerings: activity.offerings.toString()
        }
      }
      setNewUnit({...newUnit, activities: act})
      setActivity({
        description: "",
        name: "",
        offerings: [],
        sched:""
      })
      console.log(act)
    }
  }
  const deleteSchedActivity = (key) => {
    let exOffs = newUnit.activities.scheduled
    delete exOffs[key]
    const keys = Object.keys(exOffs)
    let upOffs = {scheduled: {}, non_scheduled: newUnit.activities.non_scheduled}
    for(let i = 0; i < keys.length; i++) {
      upOffs['scheduled']["s"+i] = exOffs[keys[i]]
    }
    console.log(upOffs)
    setNewUnit({...newUnit, activities: upOffs})
  }
  const deleteNonSchedActivity = (key) => {
    let exOffs = newUnit.activities.non_scheduled
    delete exOffs[key]
    const keys = Object.keys(exOffs)
    let upOffs = {scheduled: newUnit.activities.scheduled, non_scheduled: {}}
    for(let i = 0; i < keys.length; i++) {
      upOffs['non_scheduled']["ns"+i] = exOffs[keys[i]]
    }
    console.log(upOffs)
    setNewUnit({...newUnit, activities: upOffs})
  }




  const [newUnit, setNewUnit] = useState({
    code: "",
    activities: {scheduled:{}, non_scheduled:{}},
    assessments: {},
    credits: "",
    department: "",
    description: "",
    faculty: "",
    group: "",
    level: "",
    nccw: "",
    offerings: {},
    outcomes: {},
    prerequisite: "",
    title: ""
  })

  const addUnit = () => {
    if(user) {
      console.log(newUnit)
      let send = {...newUnit, user: user}
      unitsService.createUnit(send)
      .then(data => {
        getUnits()
        console.log(data)
      })
      .catch(() => {
          alert("There was an error!")
        }
      )
    }
  }

    return (
      <>
        <Grid padded centered>
        <Grid.Column>
          <Form size='large'>
            <Segment stacked>
              <Form.Field>
                <label>Code</label>
                <Form.Input fluid icon='code' iconPosition='left' placeholder='Code'
                  value={newUnit.code} onChange={e => setNewUnit({ ...newUnit, code: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Level</label>
                <Form.Select
                  options={levelOptions}
                  placeholder='Level'
                  value={newUnit.level}
                  onChange={(e, { value }) => setNewUnit({ ...newUnit, level: value })}
                  search
                />
              </Form.Field>
              <Form.Field>
                <label>Title</label>
                <Form.Input fluid icon='bookmark outline' iconPosition='left' placeholder='Title'
                  value={newUnit.title} onChange={e => setNewUnit({ ...newUnit, title: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Credits</label>
                <Form.Input type="number" fluid icon='money bill alternate' iconPosition='left' placeholder='Credits'
                  value={newUnit.credits} onChange={e => setNewUnit({ ...newUnit, credits: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Department</label>
                <Form.Input fluid icon='warehouse' iconPosition='left' placeholder='Department'
                  value={newUnit.department} onChange={e => setNewUnit({ ...newUnit, department: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Faculty</label>
                <Form.Input fluid icon='warehouse' iconPosition='left' placeholder='Faculty'
                  value={newUnit.faculty} onChange={e => setNewUnit({ ...newUnit, faculty: e.target.value })} />
              </Form.Field>

              <Form.Field>
                <label>Description</label>
                <Form.TextArea rows={8} fluid icon='user' iconPosition='left' placeholder='Description'
                value={newUnit.description} onChange={e => setNewUnit({ ...newUnit, description: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Group</label>
                <Form.Select
                  options={groupOptions}
                  placeholder='Group'
                  value={newUnit.group}
                  onChange={(e, { value }) => setNewUnit({ ...newUnit, group: value })}
                  search
                />
              </Form.Field>
              <Form.Field>
                <label>NCCW</label>
                <Form.Input fluid icon='code' iconPosition='left' placeholder='NCCW Codes'
                  value={newUnit.nccw} onChange={e => setNewUnit({ ...newUnit, nccw: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Pre-requisites</label>
                <Form.Input fluid icon='edit' iconPosition='left' placeholder='Pre-reqs'
                  value={newUnit.prerequisite} onChange={e => setNewUnit({ ...newUnit, prerequisite: e.target.value })} />
              </Form.Field>

              <Header as="h2">Offerings</Header>
              {Object.keys(newUnit.offerings).map(function (key) {
                return <Message onDismiss={(e) => deleteOffering(key)} key={key} size='small'>
                  Attendance - {newUnit.offerings[key].attendance},
                  Location - {newUnit.offerings[key].location},
                  Period - {newUnit.offerings[key].period}
                </Message>

              })}
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Attendance</label>
                  <Form.Select
                    options={offeringOptions.attendance}
                    placeholder='Attendance'
                    value={offering.attendance}
                    onChange={(e, { value }) => setOffering({ ...offering, attendance: value })}
                    search
                  />
                </Form.Field>
                <Form.Field>
                  <label>Location</label>
                  <Form.Select
                    options={offeringOptions.location}
                    placeholder='Location'
                    value={offering.location}
                    onChange={(e, { value }) => setOffering({ ...offering, location: value })}
                    search
                  />
                </Form.Field>
                <Form.Field>
                  <label>Period</label>
                  <Form.Select
                    options={offeringOptions.period}
                    placeholder='Period'
                    value={offering.period}
                    onChange={(e, { value }) => setOffering({ ...offering, period: value })}
                    search
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={addOffering} color='green' size='small'>
                  Add Offering
                </Button>





              <Header as="h2">Activities</Header>
              {Object.keys(newUnit.activities.scheduled).length > 0 && <Header as="h3">Scheduled Activities</Header>}
              {Object.keys(newUnit.activities.scheduled).map(function (key) {
                return <Message key={key} onDismiss={(e) => deleteSchedActivity(key)} size='small'>
                  Name - {newUnit.activities.scheduled[key].name},
                  Description - {newUnit.activities.scheduled[key].description},
                  Offerings - {newUnit.activities.scheduled[key].offerings}
                </Message>
              })}
              {Object.keys(newUnit.activities.non_scheduled).length > 0 && <Header as="h3">Non-Scheduled Activities</Header>}
              {Object.keys(newUnit.activities.non_scheduled).map(function (key) {
                return <Message key={key} onDismiss={(e) => deleteNonSchedActivity(key)} size='small'>
                  Name - {newUnit.activities.non_scheduled[key].name},
                  Description - {newUnit.activities.non_scheduled[key].description},
                  Offerings - {newUnit.activities.non_scheduled[key].offerings}
                </Message>

              })}
              <Form.Group widths="equal">
                <Form.Group inline>
                <label>Scheduling Type</label>
                <Form.Radio
                  label='Scheduled'
                  checked={activity.sched === "Scheduled" ? true : false}
                  onChange={(e) => setActivity({ ...activity, sched: "Scheduled" })}
                />
                <Form.Radio
                  label='Non-Scheduled'
                  checked={activity.sched === "Non-Scheduled" ? true : false}
                  onChange={(e) => setActivity({ ...activity, sched: "Non-Scheduled" })}
                />
                </Form.Group>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Activity Name</label>
                  <Form.Select
                    options={activity.sched === "" ? [] : activity.sched === "Scheduled" ? activityOptions.scheduled : activityOptions.non_scheduled}
                    disabled={activity.sched === "" ? true : false}
                    placeholder='Activity Name'
                    value={activity.name}
                    onChange={(e, { value }) => setActivity({ ...activity, name: value })}
                    search
                  />
                </Form.Field>
                <Form.Field>
                  <label>Offerings</label>
                  <Dropdown
                    placeholder='Offerings'
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
                    placeholder='Activity Description'
                    value={activity.description}
                    onChange={(e) => setActivity({ ...activity, description: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={addActivity} color='green' size='small'>
                  Add Activity
                </Button>




              <Header as="h2">Assessments</Header>
              {Object.keys(newUnit.assessments).map(function (key) {
                return <Message onDismiss={(e) => deleteAssessment(key)} key={key} size='small'>
                  Title - {newUnit.assessments[key].title},
                  Type - {newUnit.assessments[key].type},
                  Hurdle - {newUnit.assessments[key].hurdle},
                  Description - {newUnit.assessments[key].description},
                  Weighting - {newUnit.assessments[key].weighting}
                </Message>

              })}
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Title</label>
                  <Form.Input
                    fluid
                    placeholder='Title'
                    value={assessment.title}
                    onChange={(e) => setAssessment({ ...assessment, title: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Type</label>
                  <Form.Select
                    options={assessmentOptions.type}
                    placeholder='Attendance'
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
                    placeholder='Attendance'
                    value={assessment.hurdle}
                    onChange={(e, { value }) => setAssessment({ ...assessment, hurdle: value })}
                    search
                  />
                </Form.Field>
                <Form.Field>
                  <label>Weighting</label>
                  <Form.Input
                    type="number"
                    fluid
                    placeholder='Weighting'
                    value={assessment.weighting}
                    onChange={(e) => setAssessment({ ...assessment, weighting: e.target.value })}
                  />
                </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                <Form.Field>
                  <label>Assessment Description</label>
                  <Form.TextArea
                    rows={8}
                    placeholder='Assessment Description'
                    value={assessment.description}
                    onChange={(e) => setAssessment({ ...assessment, description: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={addAssessment} color='green' size='small'>
                  Add Assessment
                </Button>



              <Header as="h2">Unit Learning Outcomes</Header>
              {Object.keys(newUnit.outcomes).map(function (key) {
                return <Message onDismiss={(e) => deleteOutcome(key)} key={key} size='small'>
                  {key} - {newUnit.outcomes[key]}
                </Message>
              })}
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Description</label>
                  <Form.Input
                    fluid
                    placeholder='Unit Learning Outcome Description'
                    value={outcome.description}
                    onChange={(e) => setOutcome({ ...outcome, description: e.target.value })}
                  />
                </Form.Field>
              </Form.Group>
              <Button onClick={addOutcome} color='green' size='small'>
                  Add ULO
                </Button>

              
            </Segment>
            <Button onClick={addUnit} color='teal' size='large'>
                Submit New Unit
              </Button>
          </Form>
        </Grid.Column>
      </Grid></>
  )
}

export default AddUnit;