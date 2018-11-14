import React from 'react';
import './Repository.css';

const Repository = ({ repository }) => (
  <div>
    <h3 className="Repository-title">
      <strong>In Repository: </strong>
      <a href={repository.url}>{repository.name}</a>
    </h3>

    <ul className="Repository-issues">
      {repository.issues.edges.map(issue => (
        <li key={issue.node.id} className="Repository-issue">
          <a href={issue.node.url}>{issue.node.title}</a>
          <span> ({issue.node.state})</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Repository;
