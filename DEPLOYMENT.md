# Deployment

## [Live Deployment](https://unit-reviewer.herokuapp.com/)

## Usage
### Development

1. Create a MongoDB database at https://cloud.mongodb.com/ and obtain a connection uri. It should be of the form `mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_NAME>.<CLUSTER_ID>.mongodb.net/<DB_NAME>?retryWrites=true&w=majority`

2. Clone the repository
```bash
git clone https://github.com/MQCOMP3120-2021/group-web-project-group-ae.git
```

3. Start the API server with your MongoDB connection URI
```bash
cd server
yarn install
MONGO_URI=<MONGO_CONNECTION_URI> yarn dev
```

4. Open a new terminal and start the React development server
```bash
cd client
yarn install
yarn start
```

Any changes made should be automatically reflected in the now running application.

---

### Production
To build for production we use Docker and the included Dockerfile. This is useful as the exact same Docker image will be the one that Heroku runs on production.

**Build:**
```bash
docker build -t unit-reviewer .
```

**Run:**
```bash
docker run -e "MONGO_URI=<MONGO_CONNECTION_URI>" -p 5001:5001 unit-reviewer
```

Then you can visit the application in your browser at http://127.0.0.1:5001.

## Continuous Integration

Currently we have three key components to the CI/CD setup of this project. They are:
* Heroku Production App for the production deployment of the application.
* Heroku Review Apps for pull request review previews and builds.
* GitHub Actions automated testing workflows for the server and frontend.

### Heroku Production App

The production deployment of the application is handled by Heroku and automatically deploys when new commits are pushed to the `main` branch on GitHub.
Heroku checks `heroku.yml` and sees that the application is using the Docker build kit to deploy to web. It then looks for the `Dockerfile` in the root directory and builds the production image using that.

Once the image is built it will start the container with the `PORT` environment variable set to the port which the application then listens on and is ready to handle requests.

### Heroku Review Apps

When a pull request is opened to the `main` branch, Heroku will then build and run a preview of the changes that are on the requesting branch. The link to this preview is then provided in the discussion section of the pull request.

This allows us to ensure that any changes that have been made will work in the production environment, as well as allowing us to review each others work and suggest or contribute changes to the pull request.

Once the pull request is approved and merged, Heroku will delete the review app.

### GitHub Actions Automated Testing

There are two GitHub Action Workflows set up on the repository.

They can be found in `.github/workflows/server.yaml` and `.github/workflows/client.yaml`.
These workflows allow automated testing to run when commits are pushed to main or a pull request is opened for main that have changed files in either the `client` or `server` directory. Only the corresponding tests will run. So if a change has been made to any of the frontend files, then only the frontend tests will run.

These workflows are set up to run using a test database from MongoDB cloud, using a connection uri which is stored in a GitHub repository secret, thus making it safe to reveal these workflows to the public as only repository admins will be able to see the secret and thus the test database credentials.

Ideally, we would only allows commits to appear on the main branch via a pull request and automatically reject merges that have failed the status checks, but this is just adding unneeded complexity to such a project.
