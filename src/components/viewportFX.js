import React from 'react';
import PropTypes from 'prop-types';

import Chatbox from './chatbox.js';

// box man has two viewports (left and right), one for each eye
const ViewportFX = props => {
  return (
    <div id={props.id} className="viewport">
      <video id="hide-me" className="currentVideo" autoPlay />
      <canvas id={`canvas-${props.id}`} />
      <Chatbox msg={props.displayMsg} />
    </div>
  );
};
ViewportFX.propTypes = {
  id: PropTypes.string.isRequired,
  displayMsg: PropTypes.object.isRequired,
};

export default ViewportFX;
