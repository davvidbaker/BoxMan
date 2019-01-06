import * as React from 'react';
import { Link } from '@reach/router';


const Party = ({ partyName, remoteStreams }) => (
  <div
    css="
      margin: 1em;
    "
  >
    <Link to="../">Back</Link>
    <h1>
      <span css="color: white; font-size: 0.75em;">Your Party:</span>
      {' '}
      {partyName}
    </h1>
    {remoteStreams.length > 0 ? (
      <ul>
        {remoteStreams.map(r => (
          <li>{r}</li>
        ))}
      </ul>
    ) : (
      <p>There is no one else in your party.</p>
    )}
  </div>
);

export default Party;
