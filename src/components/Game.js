import React from 'react';
import PropTypes from 'prop-types';

import BoxMan from './BoxMan.js';
import CameraGuy from './CameraGuy.js';

// TODO change this
const roomName = 'testing';

const Game = ({
  localStream,
  remoteStreams,
  fxMode,
  constraints,
  character,
  realTimeConnection,
  messageFromPeer,
  initiateRTC,
}) => {
  if (!localStream) {
    initiateRTC();
  }
  return (
    <div>
      {character === 'boxman' ? (
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
Game.propTypes = {
  character: PropTypes.string.isRequired,
  fxMode: PropTypes.bool.isRequired,
  constraints: PropTypes.object,
  realTimeConnection: PropTypes.object,
  localStream: PropTypes.object,
  remoteStreams: PropTypes.array,
  messageFromPeer: PropTypes.object,
};

export default Game;
