import * as React from 'react';
import { Link } from '@reach/router';

const Nav = ({ partyName }) => (
  <nav
    css="padding: 1em;
         background: black;

         >:not(:last-child) {
          margin-right:  1em;
         }
"
  >
    <Link to="/">Home</Link>
    {partyName && <Link to={`/party/${partyName}`}>Party</Link>}
  </nav>
);

export default Nav;
