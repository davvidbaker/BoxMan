import React from 'react';

const Chatbox = (props) => {
  return (
    <div className="chatbox">
     <p>{props.msg.message}</p>
    </div>
  );
};
Chatbox.propTypes = {
  msg: React.PropTypes.object.isRequired
};

export default Chatbox;