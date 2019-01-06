import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from '@reach/router';

const UserList = ({ users }) => (
  <div>
    <h1 className="bangers">Users</h1>
    <p css="font-style: italic;">
      You can save multiple user profiles, each with their own personal
      preferences and calibrations.
    </p>
    <ul>
      {users.map(user => (
        <Link key={user.username} to={`${user.username}`} user={user}>
          <li>{user.username}</li>
        </Link>
      ))}
    </ul>
    <Link to="/users/create">Create New User</Link>
  </div>
);

export default connect(state => ({
  users: state.users,
}))(UserList);
