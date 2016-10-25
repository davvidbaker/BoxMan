import React from 'react';

import Chatbox from './chatbox.js';

// box man has two viewports (left and right), one for each eye
const ViewportFX = (props) => {
  return (
    <div id={props.id} className="viewport">
      <video id="hide-me" className="currentVideo" autoPlay></video>
      <canvas id={`canvas-${props.id}`}></canvas>
      <Chatbox msg={props.displayMsg}/>
    </div>
  );
};
ViewportFX.propTypes = {
  id: React.PropTypes.string.isRequired,
  displayMsg: React.PropTypes.object.isRequired
};

export default ViewportFX;