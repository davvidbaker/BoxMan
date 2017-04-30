import React from 'react';

import Chatbox from './chatbox.js';

// what the camera guy sees from his camera
const Viewfinder = (props) => {
  return (
    <div id="viewfinder">
      <video id="viewfinder-video" autoPlay></video>
      <Chatbox msg={props.displayMsg} />
    </div>
  );
};
Viewfinder.propTypes = {
  displayMsg: React.PropTypes.object.isRequired
};

export default Viewfinder;