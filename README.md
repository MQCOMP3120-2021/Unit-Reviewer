<p align="center">
  <h3 align="center">COMP3120 - Assignment 2 - Group Project - Group AE</h3>
  <p align="center">
    This react app is a MQ University unit review platform. It provides information on units and allows users to leave reviews.
  </p>
</p>
<div align="center">
<a href="https://github.com/MQCOMP3120-2021/group-web-project-group-ae/actions/workflows/server.yaml">
  <img src="https://github.com/MQCOMP3120-2021/group-web-project-group-ae/actions/workflows/server.yaml/badge.svg" alt="Workflow status badge" height="20">
</a>
<a href="https://github.com/MQCOMP3120-2021/group-web-project-group-ae/actions/workflows/client.yaml">
  <img src="https://github.com/MQCOMP3120-2021/group-web-project-group-ae/actions/workflows/client.yaml/badge.svg" alt="Workflow status badge" height="20">
</a>
</div>
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#base-features">About The App</a>
    </li>
    <li>
    <a href="#installation">Installation</a>
    </li>
    <li>
    <a href="#deployment">Deployment</a>
    </li>
    <li>
    <a href="#api-calls">API Calls</a>
    </li>
    <li>
    <a href="#application-structure">Application Structure</a>
    </li>
    <li>
    <a href="#main-roles-and-communication-workflow">Main Roles and Communication Workflow</a>
    </li>
    <li>
    <a href="#next-steps">Next Steps</a>
    </li>
    <li>
    <a href="#acknowledgements">Acknowledgements</a>
    </li>
  </ol>
</details>

## Base Features

Admin Credentials:
`
admin:admin
`

Our group has created a unit review website. The website displays unit information similar
to Macquarie University’s unit guide (e.g., learning outcomes, description,assessment breakdowns), 
as well as allow users to rate and comment on units.

This allows future students to see previous student’s opinions on certain units over time,
rather than relying on word-of-mouth. Future students can now make informed decisions on what
units to take. Obviously, the target audience would obviously be students as well as upcoming students.

The front end web application is written using React and supports the following functionality (i.e., MVP milestones Achieved):

* Saving and deletion of users, units and reviews in a MongoDB database
* Searching of units and reviews 
* Security measures implemented such as hashing of passwords and token authentication when making API calls (sent via cookie)
* Granting of special privileges for admin users (i.e., Adding and deletion of units to the system)
* Frontend and backend of website tested
* Deployed to Heroku
* Allow users to customise website theme via colour picker

## Installation
1. Clone the repo
   ```sh
   git clone https://github.com/MQCOMP3120-2021/group-web-project-group-ae.git
   ```
2. Install node packages with Yarn
   ```sh
   cd client;yarn;cd ..;cd server;yarn
   ```
3. Run the server
   ```sh
   cd server;yarn dev
   ```
4. Run the React App
    ```sh
    cd client;yarn start
    ```

## Deployment

The official heroku url for the project is https://unit-reviewer.herokuapp.com/

1. Build the application
   ```sh
   yarn build
   ```

## API Calls

The application supports the following API calls:

API docs are available at /api-docs or https://unit-reviewer.herokuapp.com/api-docs

* `GET /api/auth/me` - Returns the current users details
* `GET /api/units` - Returns 10 units at a time offset from the `start` query parameter
* `GET /api/units/search` - Returns units that match the given query text in any text field
* `GET /api/units/numUnits` - Returns the number of units in the database
* `GET /api/units/{id}` - Returns the unit with the given ID

* `POST /api/auth/register` - Registers the given user
* `POST /api/auth/login` - Authenticates the given user
* `POST /api/auth/makeAdmin` - Makes the given user admin
* `POST /api/auth/revokeAdmin` - Revokes admin privileges from the given user
* `POST /api/units` - Adds the given unit to the database
* `POST /api/units/review` - Adds a review to the given unit

* `DELETE /api/units/{unitID}` - Deletes the given unit from the database
* `DELETE /api/units/review/{unitID}/{reviewID}` - Deletes a review from the given unit

## Application Structure

```
group-web-project-group-ae:.
│   .dockerignore
│   .gitignore
│   app.json
│   buildDB.py
│   Dockerfile
│   heroku.yml
│   README.md
│   units.json
│   
├───client
│   │   GroupAEProjectProposal.pdf
│   │   package-lock.json
│   │   package.json
│   │   README.md
│   │   yarn.lock
│   │              
│   ├───public
│   │       index.html
│   │       
│   └───src
│       │   About.js
│       │   AddUnit.js
│       │   App.js
│       │   Error.js
│       │   HomePage.js
│       │   index.js
│       │   NavBar.js
│       │   UnitPage.js
│       │   UnitSearch.js
│       │   UserProfile.js
│       │   
│       ├───img
│       │       logo.png
│       │       
│       ├───services
│       │       auth.js
│       │       units.js
│       │       
│       ├───styles
│       │       custom.css
│       │       
│       ├───tests
│       │   │   HomePage.test.js
│       │   │   Register.test.js
│       │   │   
│       │   ├───samples
│       │   │       units.json
│       │   │       
│       │   └───__snapshots__
│       │           HomePage.test.js.snap
│       │           
│       └───userAuth
│               LoginForm.js
│               RegisterForm.js
│               
└───server
    │   .env
    │   .eslintrc.js
    │   package-lock.json
    │   package.json
    │   README.md
    │   tsconfig.json
    │   yarn.lock
    │             
    └───src
        │   config.ts
        │   db.ts
        │   express.d.ts
        │   index.ts
        │   interfaces.ts
        │   
        ├───models
        │       Activities.ts
        │       Activity.ts
        │       Assessment.ts
        │       Offering.ts
        │       Review.ts
        │       Unit.ts
        │       User.ts
        │       
        └───routes
                auth.ts
                units.ts
```     

## Main Roles and Communication Workflow

Below are the roles of each team member:

* Jordan Bertasso - Security Lead and Backend Functionality
* Joshua Dodanduwa - Frontend and UX/UI Lead
* Cathy Nguyen - Frontend Design and Testing
* Liam Strang - Frontend Design and Backend Functionality

We communicated on a regular basis via discord chat. Each member would complete tasks on their own branch,
then create pull requests for other memebers to approve it. This kept everything organised and created a 
smooth workflow.

## Next Steps

The next steps we would take is see how we can officially launch it on a faster service (e.g., AWS). We may possibly
review the code one more time before launching, as well as add a tad more frontend design elements.

## Acknowledgements
* [Robohash](https://robohash.org/)
* [Semantic UI](https://react.semantic-ui.com/)
* [MQ University Handbook](https://coursehandbook.mq.edu.au/)
* [MQ University Handbook Scrape](https://raw.githubusercontent.com/Synergetic00/UniCharter/main/data/units.json?token=AL6OIVVI3XVYK67KPXX2JPDBLTTRY)

