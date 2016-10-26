import React from 'react';

import RTC from './rtc.js';
import Chatbox from './chatbox.js';
import Viewport from './viewport.js';
import ViewportFX from './viewportFX.js';


const BoxMan = React.createClass({
  propTypes: {
    gameroom: React.PropTypes.string.isRequired,
    localStream: React.PropTypes.object
  },

  getInitialState: function() {
    return ({
      streams: [],
      currentStream: null,
      displayMsg: {}
    });
  },

  componentDidMount: function() {
    this._initCanvas();
    this._addTouchEvents();
    this.state.streams.push(this.props.localStream);
    this.state.currentStream = this.props.localStream;
    this.setState(this.state);
    console.log('component mounted and about to change video');
    this._changeVideo();
  },

  _addTouchEvents: function() {
    document.addEventListener('touchstart', (evt) => {this.lastTouch = evt.touches[0]});
    document.addEventListener('touchmove', this._handleTouch);
  },

  _handleTouch: function(evt) {
    
    // try to go full screen for box man
    if (!document.fullScreenElement) {
      this.refs.bmContainer.webkitRequestFullscreen();
    }
    this.refs.bmContainer.webkitRequestFullscreen();
    

    console.log(document.querySelector('canvas').style.height);
    let canvas = document.querySelector('canvas').style.height.match(/[-\.\d]*/)[0]
    console.log('canvas', canvas)
    let newHeight = canvas * (1 + (Math.sign(evt.touches[0].clientX - this.lastTouch.clientX)/10));
    if (newHeight > 100) newHeight = 100;
    else if (newHeight === 0) newHeight = 50;
    const views = document.querySelectorAll('canvas')
    views.forEach(view => {
      view.style.height = `${newHeight}vh`;
    });


    // console.log(document.querySelector('.currentVideo').style.height);
    // let curHeight = document.querySelector('.currentVideo').style.height.match(/[-\.\d]*/)[0]
    // console.log('curHeight', curHeight)
    // let newHeight = curHeight * (1 + (Math.sign(evt.touches[0].clientX - this.lastTouch.clientX)/10));
    // if (newHeight > 100) newHeight = 100;
    // else if (newHeight === 0) newHeight = 50;
    // const views = document.querySelectorAll('.currentVideo')
    // views.forEach(view => {
    //   view.style.height = `${newHeight}vh`;
    // });
    // // console.log('multiplied by ', newHeight)

    this.lastTouch = evt.touches[0];
  },

  _addedVideo: function(newStream) {
    // make sure the stream isn't already there
    let duplicate = false;
    for (let i = 0; i < this.state.streams.length; i++) {
      if (this.state.streams[i].id === newStream.id) {
        console.log('there was a dupe!')
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      this.state.streams.push(newStream);
      this.state.currentStream = newStream;
      this.setState(this.state);
      console.log('new boxman state after adding video', this.state);
      this._changeVideo();
    }
  },

  _removedVideo: function(oldStream) {
    console.log('oldStream', oldStream);
    for (let i = 0; i < this.state.streams.length; i++) {
      if (this.state.streams[i].id === oldStream.id) {
        this.state.streams.splice(i,1);
        break;
      }
    }
    // if we removed the currentStream, set it to another if any are available
    if (oldStream.id === this.state.currentStream.id) {
      console.log('removed the current stream');
      if (this.state.streams.length > 0) {
        this.state.currentStream = this.state.streams[0];
        this._changeVideo();
      }
    }
    this.setState(this.state);
    console.log('new boxman state after removing video', this.state);
  },

  _changeVideo: function() {
    // setting the video source to the media stream by passing it as a prop didn't seem to be working (React was telling me srcObject is not a valid prop for video elements), so I did this workaround, which is less Reacty
    const currentVideos = document.querySelectorAll('.currentVideo');
    if (currentVideos.length > 0) {
      console.log(currentVideos);
      for (let i = 0; i < currentVideos.length; i++) {
        currentVideos[i].srcObject = this.state.currentStream;
      }
    } 
  },

  _cycleCameras: function() {
    console.log('BoxMan trying to cycle cameras');
    if (this.state.streams.length > 1) {
      for (let i = 0; i < this.state.streams.length; i++) {
        if (this.state.streams[i].id === this.state.currentStream.id) {
          this.state.currentStream = this.state.streams[(i+1)%this.state.streams.length];
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

  _initCanvas: function() {
    this.videoEl = document.querySelector('.currentVideo');
    this.canvas1 = document.getElementById('canvas-left');
    this.ctx1 = this.canvas1.getContext('2d');
    this.ctx1.globalAlpha = 0.1;
    this.canvas2 = document.getElementById('canvas-right');
    this.ctx2 = this.canvas2.getContext('2d');
    this.ctx2.globalAlpha = 0.1;
    ctx1.globalCompositeOperation = "difference";
    ctx2.globalCompositeOperation = "difference";
    this._draw();
  },

  _draw: function() {
    this.ctx1.drawImage(this.videoEl,0,0, this.canvas1.width, this.canvas1.height);//;, 400, 0, 0,this.canvas1.width,this.canvas1.height)
    this.ctx2.drawImage(this.videoEl,0,0, this.canvas1.width, this.canvas1.height);//;, 400, 0, 0,canvas1.width,canvas1.height)
    window.requestAnimationFrame(this._draw);
  },

  render: function()  {
    return (   
      <div ref={"bmContainer"} onClick={this._cycleCameras}>
        <RTC 
          config={ { character: 'boxMan', roomName: this.props.gameroom, constraints: {audio:false, video: false}} }
          addedVideo={this._addedVideo} 
          removedVideo={this._removedVideo}
          newMessage={this._newMessage}
        />
        <div id="vertical-flexbox">
          <div id="viewports-container">
            <ViewportFX id="left"  displayMsg={this.state.displayMsg} />
            <ViewportFX id="right" displayMsg={this.state.displayMsg} /> 
          </div>
        </div>
      </div>
    );
  }
});

export default BoxMan;
