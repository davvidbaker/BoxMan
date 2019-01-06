import * as React from 'react';
import { Link, navigate } from '@reach/router';

const UserForm = ({ username: initialUsername, submitUserForm }) => {
  const [username, setUsername] = React.useState(
    initialUsername === 'create' ? '' : initialUsername,
  );

  return (
    <div>
      <Link to="../">All Users</Link>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (username.length > 0) {
            submitUserForm({ username });
            navigate('../');
          }
        }}
      >
        <label htmlFor="username">
          Username:
          <input
            placeholder="box-man-23"
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        {/* TODO calibrate */}
      </form>
    </div>
  );
};

export default UserForm;
