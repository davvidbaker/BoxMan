import React from 'react';

import BoxMan from './boxMan.js';
import CameraGuy from './cameraGuy.js';

// TODO change this
const roomName = "testing";

const Game = (props) => {
  return (
    <div>
      {props.character === 'boxMan' ? 
        <BoxMan /> :
        <CameraGuy />
      }

    </div>
  );
};
Game.propTypes = {
  character: React.PropTypes.string.isRequired
};


export default Game;




