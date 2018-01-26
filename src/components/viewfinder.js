import React from 'react';
import PropTypes from 'prop-types';

import Chatbox from './chatbox.js';

// what the camera guy sees from his camera
const Viewfinder = props => {
  return (
    <div id="viewfinder">
      <video id="viewfinder-video" autoPlay />
      <Chatbox msg={props.displayMsg} />
    </div>
  );
};
Viewfinder.propTypes = {
  displayMsg: PropTypes.object.isRequired,
};

export default Viewfinder;
