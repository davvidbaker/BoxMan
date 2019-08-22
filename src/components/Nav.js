import * as React from 'react';
import { Link } from '@reach/router';

const Nav = ({ partyName, currentUser }) => (
  <nav
    css="padding: 1em;
         background: var(--light-gray-purple);
"
  >
    <div
      css="
      display: flex;
      >:not(:last-child) {
          margin-right:  1em;
      }"
    >
      <Link to="/">Home</Link>
      {partyName && <Link to={`/party/${partyName}`}>Party</Link>}
      <div css="flex: 1; text-align: right;">
        <Link to={`/users/${currentUser || 'create'}`}>
          {currentUser || 'Create a User'}
        </Link>
      </div>
    </div>
  </nav>
);

export default Nav;
