import React, { Component } from 'react';
import axios from 'axios';
import Organization from './components/Organization/Organization.js';
import './App.css';

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  }
});

const GET_ISSUES_OF_REPOSITORY = `
  query($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5) {
          edges {
            node {
              id
              title
              url
              state
            }
          }
        }
      }
    }
  }
`;

const getIssuesOfRepository = path => {
  const [organization, repository] = path.split('/');
  return axiosGitHubGraphQL.post('', {
    query: GET_ISSUES_OF_REPOSITORY,
    variables: { organization, repository },
  });
};

const resolveIssuesQuery = queryResult => () => ({
  organization: queryResult.data.data.organization,
  errors: queryResult.data.errors,
});

const TITLE = 'React GraphQL GitHub Client';

class App extends Component {
  state = {
    path: 'the-road-to-learn-react/the-road-to-learn-react',
    organization: null,
    errors: null,
  };

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = event => {
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    this.onFetchFromGitHub(this.state.path);

    event.preventDefault();
  };

  onFetchFromGitHub = path => {
    getIssuesOfRepository(path).then(queryResult =>
      this.setState(resolveIssuesQuery(queryResult)),
    );
  };

  render() {
    const { path, organization, errors } = this.state;

    return (
      <div className="App">
        <h1>{TITLE}</h1>

        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">
            Show open issues for https://github.com/
          </label>
          <input
            id="url"
            type="text"
            value={path}
            onChange={this.onChange}
            styles={{ width: '300px' }}
          />
          <button type="submit">Search</button>
        </form>
        <hr />
        {organization ? (
          <Organization organization={organization} errors={errors} />
        ) : (
          <p>No information yet.</p>
        )}
      </div>
    );
  }
}

export default App;
