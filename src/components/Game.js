import * as React from 'react';
import { Link } from '@reach/router';

import BoxMan from './BoxMan';
import CameraGuy from './CameraGuy';
import Controller from './Controller';

const Game = ({
  localStream,
  remoteStreams,
  fxMode,
  constraints,
  role,
  realTimeConnection,
  messageFromPeer,
  joinParty,
  partyName,
}) => {
  const initialized = React.useRef(false);
  if (!initialized.current && window.localStream) {
    joinParty();
    initialized.current = true;
  }

  return (
    <div>
      <Controller />
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
