import React from 'react';
import PropTypes from 'prop-types';

const Chatbox = props => {
  return (
    <div className="chatbox">
      <p>{props.msg.message}</p>
    </div>
  );
};
Chatbox.propTypes = {
  msg: PropTypes.object.isRequired,
};

export default Chatbox;
