import React from 'react';

import RTC from './rtc.js';
import CameraSelect from './cameraSelect.js';
import Chatbox from './chatbox.js';
import Messenger from './messenger.js';

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


/* =======================================================
  Camera Guy Component
======================================================= */
const CameraGuy = React.createClass({
  propTypes: {
    gameroom: React.PropTypes.string.isRequired,
    localStream: React.PropTypes.object.isRequired
  },
  
  getInitialState: function () {
    return ({
      cameraSelected: false,
      availableCams: [],
      currentStream: null,
      displayMsg: {},
      constraints: {
        audio: false,
        video: true
      }
    });
  },

  componentDidMount:  function () {
    const videoEl = document.getElementById('viewfinder-video') || document.createElement('new-video');
    videoEl.srcObject = this.props.localStream;
    // navigator.mediaDevices.enumerateDevices().then(this._gotDevices).catch(err => { console.error(err); });
  },

  // _gotDevices: function (deviceInfos) {
  //   console.log('got devices', deviceInfos);
  //   for (let i = 0; i < deviceInfos.length; i++) {
  //     if (deviceInfos[i].kind === 'videoinput') {
  //       this.state.availableCams.push(deviceInfos[i]);
  //       console.log(deviceInfos[i]);
  //     }
  //   }
  //   this.setState(this.state);
  // },

  // _selectCamera: function(cam) {
    
  //   console.log('in _switch camera with ', cam)
  //   if (window.stream) {
  //     console.log('already was a window stream: ', window.stream);
  //     window.stream.getTracks().forEach(function (track) {
  //       track.stop();
  //     });
  //   }
  //   var videoSource = cam;
  //   this.state.constraints = {
  //     audio: false,
  //     video: { deviceId: videoSource ? { exact: videoSource } : undefined }
  //   };
  //   navigator.mediaDevices.getUserMedia(this.state.constraints)
  //     .then(stream => {
  //       window.stream = stream;
  //       const videoEl = document.getElementById('viewfinder-video');
  //       videoEl.srcObject = stream;
  //       document.getElementById('viewfinder').style.display = "flex";

  //       // changing cameraSelected triggers Camera Guy to do RTC with Box Man
  //       this.state.cameraSelected = true;
  //       this.setState(this.state);
  //     })
  //     .catch(err => { console.error(err); });
  // },

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
                constraints: this.state.constraints
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
