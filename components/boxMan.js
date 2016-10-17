import React from 'react';
import RTC from './rtc.js';

const Viewport = (props) => {
  return (
    <div className="viewport">
      <video className="currentVideo" autoPlay></video>
      <Chatbox msg={props.displayMsg}/>
    </div>
  );
};
Viewport.propTypes = {
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

const BoxMan = React.createClass({
  getInitialState: function() {
    return ({
      incomingStreams: [],
      currentStream: null,
      displayMsg: {}
    });
  },

  _addedVideo: function(newStream) {
    // make sure the stream isn't already there
    let duplicate = false;
    for (let i = 0; i < this.state.incomingStreams.length; i++) {
      if (this.state.incomingStreams[i].id === newStream.id) {
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      this.state.incomingStreams.push(newStream);
      this.state.currentStream = newStream;
      this.setState(this.state);
      console.log('new boxman state after adding video', this.state);
      this._changeVideo();
    }
  },

  _removedVideo: function(oldStream) {
    console.log('oldStream', oldStream);
    for (let i = 0; i < this.state.incomingStreams.length; i++) {
      if (this.state.incomingStreams[i].id === oldStream.id) {
        this.state.incomingStreams.splice(i,1);
        break;
      }
    }
    // if we removed the currentStream, set it to another if any are available
    if (oldStream.id === this.state.currentStream.id) {
      console.log('removed the current stream');
      if (this.state.incomingStreams.length > 0) {
        this.state.currentStream = this.state.incomingStreams[0];
        this._changeVideo();
      }
    }
    this.setState(this.state);
    console.log('new boxman state after removing video', this.state);
  },

  _changeVideo: function() {
    // setting the video source to the media stream by passing it as a prop didn't seem to be working (React was telling me srcObject is not a valid prop for video elements), so I did this workaround, which is less Reacty
    const currentVideos = document.querySelectorAll('.currentVideo');
    currentVideos.forEach(videoEl => { videoEl.srcObject = this.state.currentStream; });
  },

  _cycleCameras: function() {
    console.log('BoxMan trying to cycle cameras');
    if (this.state.incomingStreams.length > 1) {
      for (let i = 0; i < this.state.incomingStreams.length; i++) {
        if (this.state.incomingStreams[i].id === this.state.currentStream.id) {
          this.state.currentStream = this.state.incomingStreams[(i+1)%this.state.incomingStreams.length];
          this.setState(this.state);
          this._changeVideo();
          break;
        }
      }
    } 
  },

  _newMessage: function(msg) {
    this.state.displayMsg = msg;
    this.setState(this.state);
    const chat = document.querySelectorAll('.chatbox');
    chat.forEach(div => { div.style.opacity = 1; });

    // after 2 seconds, hide the message
    setTimeout(() => {
      chat.forEach(div => { div.style.opacity = 0; });
    }, 2000);
  },

  render: function()  {
    return (
      <div onClick={this._cycleCameras}>
        <RTC 
          config={ { character: 'boxMan', roomName: 'testing', constraints: {audio:false, video: false}} }
          addedVideo={(newStream) => this._addedVideo(newStream)} 
          removedVideo={(oldStream) => this._removedVideo(oldStream)}
          newMessage = {(newMsg) => this._newMessage(newMsg)}
        />
        <h1> you are boxman </h1>
        <Viewport id="left"  displayMsg={this.state.displayMsg} />
        <Viewport id="right" displayMsg={this.state.displayMsg} /> 
      </div>
    );
  }
});

export default BoxMan;
