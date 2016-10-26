import React from 'react';

import BoxMan from './boxMan.js';
import CameraGuy from './cameraGuy.js';

// TODO change this
const roomName = "testing";

const Game = (props) => {
  return (
    <div>
      {props.character === 'boxMan' ? 
        <BoxMan fxMode={props.fxMode} localStream={props.localStream} gameroom={props.gameroom} /> :
        <CameraGuy constraints={props.constraints} localStream={props.localStream} gameroom={props.gameroom} />
      }

    </div>
  );
};
Game.propTypes = {
  character: React.PropTypes.string.isRequired,
  gameroom: React.PropTypes.string.isRequired,
  localStream:React.PropTypes.object.isRequired,
  fxMode: React.PropTypes.bool.isRequired,
  constraints:React.PropTypes.object
};


export default Game;