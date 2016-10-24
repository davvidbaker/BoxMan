import React from 'react';

import RTC from './rtc.js';
import Messenger from './messenger.js';
import Viewfinder from './viewfinder.js';

/* =======================================================
  Camera Guy Component
======================================================= */
const CameraGuy = React.createClass({
  propTypes: {
    gameroom: React.PropTypes.string.isRequired,
    localStream: React.PropTypes.object.isRequired,
    constraints: React.PropTypes.object.isRequired
  },
  
  getInitialState: function () {
    return ({
      availableCams: [],
      currentStream: null,
      displayMsg: {},
    });
  },

  componentDidMount:  function () {
    const videoEl = document.getElementById('viewfinder-video') || document.createElement('new-video');
    videoEl.srcObject = this.props.localStream;
  },

  _newMessage: function (msg) {
    this.state.displayMsg = msg;
    this.setState(this.state);
    const chat = document.querySelectorAll('.chatbox');
    chat.forEach(div => { div.style.opacity = 1; });
    // after 2 seconds, hide the message
    setTimeout(() => {
      chat.forEach(div => { div.style.opacity = 0; });
    }, 2000);
  },

  _sendMessage: function (msg) {
    console.log('sending this message', msg);
    this.refs.myRTC.webrtc.sendDirectlyToAll('channelMessage', 'chat', { message: msg });
  },

  render: function () {
    return (
      <div>
        <Viewfinder displayMsg={this.state.displayMsg} />
        
          <RTC
              config={{ 
                character: 'cameraGuy',
                roomName: this.props.gameroom,
                constraints: this.props.constraints
              }}
              newMessage={this._newMessage}
              ref={"myRTC"}
            />
        <Messenger send={this._sendMessage} />
      </div>
        
    );
  }
});

export default CameraGuy;
