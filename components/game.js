import React from 'react';

import BoxMan from './boxMan.js';
import CameraGuy from './cameraGuy.js';

// TODO change this
const roomName = "testing";

const Game = (props) => {
  return (
    <div>
      {props.character === 'boxMan' ? 
        <BoxMan localStream={props.localStream} gameroom={props.gameroom} /> :
        <CameraGuy localStream={props.localStream} gameroom={props.gameroom} />
      }

    </div>
  );
};
Game.propTypes = {
  character: React.PropTypes.string.isRequired,
  gameroom: React.PropTypes.string.isRequired,
  localStream:React.PropTypes.object.isRequired,
};


export default Game;




