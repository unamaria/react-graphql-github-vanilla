import React from 'react';
import './Repository.css';

const Repository = ({
  repository,
  onFetchMoreIssues,
  onStarRepository,
}) => (
  <div>
    <h3 className="Repository-title">
      <strong>In Repository: </strong>
      <a href={repository.url}>{repository.name}</a>
    </h3>

    <button
      type="button"
      onClick={() =>
        onStarRepository(repository.id, repository.viewerHasStarred)
      }
    >
      {repository.viewerHasStarred ? 'Unstar' : 'Star'}
      {` (${repository.stargazers.totalCount} ⭐️s)`}
    </button>

    <ul className="Repository-issues">
      {repository.issues.edges.map(issue => (
        <li key={issue.node.id} className="Repository-issue">
          <a href={issue.node.url}>{issue.node.title}</a>
          <span> ({issue.node.state})</span>
          <ul>
            {issue.node.reactions.edges.map(reaction => (
              <li key={reaction.node.id}>{reaction.node.content}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    <hr />
    {repository.issues.pageInfo.hasNextPage && (
      <button onClick={onFetchMoreIssues}>More</button>
    )}
  </div>
);

export default Repository;
