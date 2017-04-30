import React from 'react';

import Chatbox from './chatbox.js';

// box man has two viewports (left and right), one for each eye
const Viewport = (props) => {
  return (
    <div id={props.id} className="viewport">
      <video className="currentVideo" autoPlay></video>
      <Chatbox msg={props.displayMsg}/>
    </div>
  );
};
Viewport.propTypes = {
  id: React.PropTypes.string.isRequired,
  displayMsg: React.PropTypes.object.isRequired
};

export default Viewport;