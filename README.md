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
    <a href="#acknowledgements">Acknowledgements</a>
    </li>
  </ol>
</details>

## Base Features

Admin Credentials:
`
admin:admin
`

The front end web application is written using React and supports the following functionality.

* 

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

## Acknowledgements
* [Robohash](https://robohash.org/)
* [Semantic UI](https://react.semantic-ui.com/)
* [MQ University Handbook](https://coursehandbook.mq.edu.au/)
* [MQ University Handbook Scrape](https://raw.githubusercontent.com/Synergetic00/UniCharter/main/data/units.json?token=AL6OIVVI3XVYK67KPXX2JPDBLTTRY)

