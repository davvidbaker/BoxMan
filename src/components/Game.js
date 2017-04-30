import React from 'react';
import PropTypes from 'prop-types';

import BoxMan from './BoxMan.js';
import CameraGuy from './CameraGuy.js';

// TODO change this
const roomName = 'testing';

const Game = ({localStream, remoteStreams, fxMode, constraints, character, gameroom}) => {
  return (
    <div>
      {character === 'boxMan'
        ? <BoxMan
            fxMode={fxMode}
            localStream={localStream}
            remoteStreams={remoteStreams}
            gameroom={gameroom}
          />
        : <CameraGuy
            constraints={constraints}
            localStream={localStream}
            gameroom={gameroom}
          />}

    </div>
  );
};
Game.propTypes = {
  character: PropTypes.string.isRequired,
  gameroom: PropTypes.string.isRequired,
  fxMode: PropTypes.bool.isRequired,
  constraints: PropTypes.object,
  localStream: PropTypes.object,
  remoteStreams: PropTypes.array,
};

export default Game;
