import React from 'react';
import RTC from './rtc.js';

const Messenger = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },

  propTypes: {
    send: React.PropTypes.func.isRequired
  },

  _sendMessage: function(e) {
    e.preventDefault();
    console.log('resetting form')
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

const CameraGuy = React.createClass({
  getInitialState: function () {
    return ({
      incomingStreams: [],
      currentStream: null,
      displayMsg: {}
    });
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

  _sendMessage: function(msg) {
    console.log('sending this message', msg);
    this.refs.myRTC.webrtc.sendDirectlyToAll('channelMessage', 'chat', {message: msg});

  },

  render: function () {
    return (
      <div onClick={this._cycleCameras}>
        <RTC
          config={{ character: 'cameraGuy', roomName: 'testing', constraints: { audio: false, video: true } }}
          newMessage={ newMsg => this._newMessage(newMsg)}
          ref={"myRTC"}
          />
        <h1> you are cameraguy </h1>
        <Viewfinder displayMsg={this.state.displayMsg} />
        <Messenger send={ msg => this._sendMessage(msg)} />
      </div>
    );
  }
});

export default CameraGuy;
