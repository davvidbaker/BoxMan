import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Messenger from './messenger.js';
import Viewfinder from './viewfinder.js';

/* =======================================================
  Camera Guy Component
======================================================= */
class CameraGuy extends Component {
  static propTypes = {
    realTimeConnection: PropTypes.object,
    localStream: PropTypes.object.isRequired,
    constraints: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      availableCams: [],
      currentStream: null,
      displayMsg: {},
    };
  }

  componentDidMount() {
    const videoEl =
      document.getElementById('viewfinder-video') ||
      document.createElement('new-video');
    videoEl.srcObject = this.props.localStream;
  }

  _newMessage(msg) {
    this.state.displayMsg = msg;
    this.setState(this.state);
    const chat = document.querySelectorAll('.chatbox');
    chat.forEach(div => {
      div.style.opacity = 1;
    });
    // after 2 seconds, hide the message
    setTimeout(() => {
      chat.forEach(div => {
        div.style.opacity = 0;
      });
    }, 2000);
  }

  sendMessage(msg) {
    console.log('sending this message', msg);
    this.props.realTimeConnection.webrtc.sendDirectlyToAll(
      'channelMessage',
      'chat',
      {
        message: msg,
      }
    );
  }

  render() {
    return (
      <div>
        <Viewfinder displayMsg={this.state.displayMsg} />

        <Messenger
          send={msg => {
            this.sendMessage(msg);
          }}
        />
      </div>
    );
  }
}

export default CameraGuy;
