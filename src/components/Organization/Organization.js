import React from 'react';
import Repository from '../../components/Repository/Repository.js';
import './Organization.css';

const Organization = ({ organization, errors }) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong: </strong>
        {errors.map(error => error.message).join(' ')}
      </p>
    );
  }
  return (
    <div>
      <h2 className="Organization-title">
        <strong>Issues from organization: </strong>
        <a href={organization.url}>{organization.name}</a>
      </h2>
      <Repository repository={organization.repository} />
    </div>
  );
};

export default Organization;
