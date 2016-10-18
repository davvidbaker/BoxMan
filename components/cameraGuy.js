import React from 'react';

import RTC from './rtc.js';
import CameraSelect from './cameraSelect.js';

const Messenger = React.createClass({
  getInitialState: function () {
    return {
      message: ''
    };
  },

  propTypes: {
    send: React.PropTypes.func.isRequired
  },

  _sendMessage: function (e) {
    e.preventDefault();
    console.log('resetting form');
    this.props.send(this.refs.text.value);
    this.refs.messageForm.reset();
  },

  render: function () {
    return (
      <div>
        <form onSubmit={this._sendMessage} ref={"messageForm"}>
          <input type="text" ref={"text"} placeholder="send a message to Box Man" />
          <input type="submit" value="send" />
        </form>
      </div>
    );
  }
});

const Viewfinder = (props) => {
  return (
    <div>
      <video id="viewfinder" autoPlay></video>
      <Chatbox msg={props.displayMsg} />
    </div>
  );
};
Viewfinder.propTypes = {
  displayMsg: React.PropTypes.object.isRequired
};

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


/* =======================================================
  Camera Guy Component
======================================================= */
const CameraGuy = React.createClass({
  
  getInitialState: function () {
    return ({
      cameraSelected: false,
      availableCams: [],
      incomingStreams: [],
      currentStream: null,
      displayMsg: {},
      constraints: {
        audio: false,
        video: true
      }
    });
  },

  componentDidMount:  function () {
    navigator.mediaDevices.enumerateDevices().then(this._gotDevices).catch(err => { console.error(err); });
  },

  _gotDevices: function (deviceInfos) {
    console.log('got devices', deviceInfos);
    for (let i = 0; i < deviceInfos.length; i++) {
      // option.value = deviceInfos[i].deviceId;
      // console.log(i);
      if (deviceInfos[i].kind === 'videoinput') {
        // option.text = deviceInfos[i].label || `camera ${videoSelect.length}`;
        // console.log(option);
        this.state.availableCams.push(deviceInfos[i]);
        console.log(deviceInfos[i]);
      }
    }
    this.setState(this.state);
  },

  _selectCamera: function(cam) {
    
    console.log('in _switch camera with ', cam)
    if (window.stream) {
      console.log('already was a window stream: ', window.stream);
      window.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    var videoSource = cam;
    this.state.constraints = {
      audio: false,
      video: { deviceId: videoSource ? { exact: videoSource } : undefined }
    };
    navigator.mediaDevices.getUserMedia(this.state.constraints)
      .then(stream => {
        window.stream = stream;
        const videoEl = document.getElementById('viewfinder');
        videoEl.srcObject = stream;
        videoEl.style.display = "block";

        // changing cameraSelected triggers Camera Guy to do RTC with Box Man
        this.state.cameraSelected = true;
        this.setState(this.state);
      })
      .catch(err => { console.error(err); });
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
        {!this.state.cameraSelected ?
          <CameraSelect 
            availableCams={this.state.availableCams} 
            selectCamera={cam => this._selectCamera(cam)} 
          /> :
          <div>
            <RTC
                config={{ 
                  character: 'cameraGuy',
                  roomName: 'testing',
                  constraints: this.state.constraints
                }}
                newMessage={newMsg => this._newMessage(newMsg)}
                ref={"myRTC"}
              />
          <Messenger send={msg => this._sendMessage(msg)} />
          </div>
        }
      </div>
    );
  }
});

export default CameraGuy;
