import React from 'react';
import PropTypes from 'prop-types';

import Chatbox from './chatbox.js';

// box man has two viewports (left and right), one for each eye
const Viewport = props => (
  <div id={props.id} className="viewport">
    <video
      // ⚠️ TODO change this
      className={`currentVideo ${props.withFilterLoop ? 'filter-loop' : ''}`}
      autoPlay
    />
    <Chatbox msg={props.displayMsg} />
  </div>
);
Viewport.propTypes = {
  id: PropTypes.string.isRequired,
  displayMsg: PropTypes.object.isRequired
};

export default Viewport;
