import { useState } from "react";
import { Grid, Header, Image, Form, Segment, Button, Message } from "semantic-ui-react";
import logo from './img/logo.png'

const AddUnit = () => {

  const groupOptions = [
    { key: "u", text: "Undergraduate", value: "Undergraduate" },
    { key: "p", text: "Postgraduate", value: "Postgraduate" },
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



  const [assessment, setAssessment] = useState({
    description: "",
    hurdle: "",
    title: "",
    type: "",
    weighting: -1
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
      { key: "q", text: "Quantitative analysis task", value: "Quantitative analysis task" }
    ]
  }
  const addAssessment = () => {
    let asses = newUnit.assessments
    if (assessment.description !== "" && assessment.hurdle !== "", assessment.title !== "" && assessment.type !== ""
      && assessment.type !== "" && assessment.weighting !== -1) {
      asses["a" + (Object.keys(asses).length + 1)] = assessment
      setNewUnit({ ...newUnit, assessments: asses })
      setAssessment({
        description: "",
        hurdle: "",
        title: "",
        type: "",
        weighting: -1
      })
      console.log(asses)
    }
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




  const [activity, setActivity] = useState({
    description: "",
    name: "",
    offerings: "",
    scheduled: ""
  })

  const [newUnit, setNewUnit] = useState({
    code: "",
    activities: {},
    assessments: {},
    credits: -1,
    department: "",
    description: "",
    faculty: "",
    group: "",
    level: -1,
    nccw: "",
    offerings: {},
    outcomes: {},
    prerequisite: "",
    title: ""
  })

  const addUnit = () => {
    console.log(newUnit)
  }

  return (
    <><div className="mt-md">&nbsp;</div>
      <Grid style={{ height: '100vh' }}>
        <Grid.Column>
          <Form size='large'>
            <Segment stacked>
              <Form.Field>
                <label>Code</label>
                <Form.Input fluid icon='code' iconPosition='left' placeholder='Code' 
                value={newUnit.code} onChange={e => setNewUnit({...newUnit, code: e.target.value})} />
              </Form.Field>
              <Form.Field>
                  <label>Level</label>
                  <Form.Input
                    type="number"
                    fluid 
                    placeholder='Level'
                    value={newUnit.level} 
                    onChange={e => setNewUnit({...newUnit, level: e.target.value})}
                    />
                </Form.Field>
              <Form.Field>
                <label>Title</label>
                <Form.Input fluid icon='bookmark outline' iconPosition='left' placeholder='Title' 
                value={newUnit.title} onChange={e => setNewUnit({...newUnit, title: e.target.value})}/>
              </Form.Field>
              <Form.Field>
                <label>Credits</label>
                <Form.Input type="number" fluid icon='money bill alternate' iconPosition='left' placeholder='Credits'
                value={newUnit.credits} onChange={e => setNewUnit({...newUnit, credits: e.target.value})}/>
              </Form.Field>
              <Form.Field>
                <label>Department</label>
                <Form.Input fluid icon='warehouse' iconPosition='left' placeholder='Department'
                value={newUnit.department} onChange={e => setNewUnit({...newUnit, department: e.target.value})}/>
              </Form.Field>
              <Form.Field>
                <label>Faculty</label>
                <Form.Input fluid icon='warehouse' iconPosition='left' placeholder='Faculty'
                value={newUnit.faculty} onChange={e => setNewUnit({...newUnit, faculty: e.target.value})}/>
              </Form.Field>
              
              <Form.Field>
                <label>Description</label>
                <Form.TextArea rows={8} fluid icon='user' iconPosition='left' placeholder='Description' />
              </Form.Field>
              <Form.Field>
                  <label>Group</label>
                  <Form.Select
                    options={groupOptions}
                    placeholder='Group'
                    value={newUnit.group}
                    onChange={(e, { value }) => setNewUnit({...newUnit, group: value})}
                    search
                  />
                </Form.Field>
              <Form.Field>
                <label>NCCW</label>
                <Form.Input fluid icon='code' iconPosition='left' placeholder='NCCW Codes' 
                value={newUnit.nccw} onChange={e => setNewUnit({...newUnit, nccw: e.target.value})} />
              </Form.Field>
              <Form.Field>
                <label>Pre-requisites</label>
                <Form.Input fluid icon='edit' iconPosition='left' placeholder='Pre-reqs' 
                value={newUnit.prerequisite} onChange={e => setNewUnit({...newUnit, prerequisite: e.target.value})} />
              </Form.Field>

              <Header as="h2">Offerings</Header>
              {Object.keys(newUnit.offerings).map(function (key) {
                return <Message key={key} size='small'>
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
                <Button onClick={addOffering} color='green' size='small'>
                  Add Offering
                </Button>
              </Form.Group>


              <Header as="h2">Assessments</Header>
              {Object.keys(newUnit.assessments).map(function (key) {
                return <Message key={key} size='small'>
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
                    onChange={(e) => setAssessment({...assessment, title: e.target.value})}
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
                    onChange={(e) => setAssessment({...assessment, weighting: e.target.value})}
                    />
                </Form.Field>
              <Form.Field>
                <label>Assessment Description</label>
                <Form.TextArea 
                rows={8} 
                placeholder='Assessment Description' 
                value={assessment.description}
                onChange={(e) => setAssessment({...assessment, description: e.target.value})}
                />
              </Form.Field>
              <Button onClick={addAssessment} color='green' size='small'>
                  Add Assessment
                </Button>
              </Form.Group>



              <Header as="h2">Unit Learning Outcomes</Header>
              {Object.keys(newUnit.outcomes).map(function (key) {
                return <Message key={key} size='small'>
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
                    onChange={(e) => setOutcome({...outcome, description: e.target.value})}
                    />
                </Form.Field>
                <Button onClick={addOutcome} color='green' size='small'>
                  Add ULO
                </Button>
              </Form.Group>

              <Button onClick={addUnit} color='teal' size='large'>
                Add new unit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid></>
  )
}

export default AddUnit;