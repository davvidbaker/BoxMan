import * as React from 'react';
import { Link } from '@reach/router';

import BoxMan from './BoxMan.js';
import CameraGuy from './CameraGuy.js';

const Game = ({
  localStream,
  remoteStreams,
  fxMode,
  constraints,
  role,
  realTimeConnection,
  messageFromPeer,
  initiateRTC,
  partyName,
}) => {
  if (!localStream) {
    console.log('🔥  localStream', localStream);
    initiateRTC();
  }
  return (
    <div>
      <Link to="../../">Back</Link>
      <Link to={`../../party/${partyName}`}>Party</Link>
      {role === 'boxman' ? (
        <BoxMan
          fxMode={fxMode}
          localStream={localStream}
          messageFromPeer={messageFromPeer}
          remoteStreams={remoteStreams}
        />
      ) : (
        <CameraGuy
          constraints={constraints}
          localStream={localStream}
          realTimeConnection={realTimeConnection}
        />
      )}
    </div>
  );
};

export default Game;
