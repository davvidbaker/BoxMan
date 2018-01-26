import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chatbox from './chatbox.js';
import Viewport from './viewport.js';
import ViewportFX from './viewportFX.js';

class BoxMan extends Component {
  static propTypes = {
    fxMode: PropTypes.bool.isRequired,
    localStream: PropTypes.object,
    remoteStreams: PropTypes.array,
    messageFromPeer: PropTypes.object,
  };

  constructor() {
    super();
    this.state = {
      currentStream: null,
      displayMsg: {},
    };
  }

  componentDidMount() {
    if (this.props.fxMode) {
      this.initCanvas();
    }
    this.addTouchEvents();
    this.state.currentStream = this.props.localStream;
    this.setState(this.state);
    this.changeCanvasVideo();
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      'received props',
      nextProps.remoteStreams.length,
      this.props.remoteStreams.length
    );

    if (nextProps.remoteStreams.length > this.props.remoteStreams.length) {
      this.addedVideo(
        nextProps.remoteStreams[nextProps.remoteStreams.length - 1]
      );
    } else if (
      nextProps.remoteStreams.length < this.props.remoteStreams.length
    ) {
      this.removedVideo();
    }

    if (
      nextProps.messageFromPeer.message !== this.props.messageFromPeer.message
    ) {
      this.newMessage(nextProps.messageFromPeer);
    }
  }

  addTouchEvents() {
    document.addEventListener('touchstart', evt => {
      this.lastTouch = evt.touches[0];
    });
    document.addEventListener('touchmove', () => {
      this.handleTouch();
    });
  }

  handleTouch(evt) {
    // try to go full screen for box man
    // if (!document.fullScreenElement) {
    //   this.bmContainer.webkitRequestFullscreen();
    // }
    // this.bmContainer.webkitRequestFullscreen();

    if (this.props.fxMode) {
      const canvasHeight = document
        .querySelector('canvas')
        .style.height.match(/[-.\d]*/)[0];
      let newHeight =
        canvasHeight *
        (1 + Math.sign(evt.touches[0].clientX - this.lastTouch.clientX) / 10);
      if (newHeight > 100) newHeight = 100;
      else if (newHeight === 0) newHeight = 50;
      const views = document.querySelectorAll('canvas');
      views.forEach(view => {
        view.style.height = `${newHeight}vh`;
      });
    } else {
      let curHeight = document
        .querySelector('.currentVideo')
        .style.height.match(/[-.\d]*/)[0];
      let newHeight =
        curHeight *
        (1 + Math.sign(evt.touches[0].clientX - this.lastTouch.clientX) / 10);
      if (newHeight > 100) {
        newHeight = 100;
      } else if (newHeight === 0) newHeight = 50;
      const views = document.querySelectorAll('.currentVideo');
      views.forEach(view => {
        view.style.height = `${newHeight}vh`;
      });
    }

    this.lastTouch = evt.touches[0];
  }

  addedVideo(newStream) {
    // make sure the stream isn't already there
    let duplicate = false;
    for (let i = 0; i < this.props.remoteStreams.length; i++) {
      if (this.props.remoteStreams[i].id === newStream.id) {
        console.log('there was a dupe!');
        duplicate = true;
        break;
      }
    }
    if (!duplicate) {
      // this.props.remoteStreams.push(newStream);
      this.state.currentStream = newStream;
      this.setState({ currentStream: newStream });
      console.log('new boxman state after adding video', this.state);
      this.changeCanvasVideo();
    }
  }

  removedVideo() {
    console.log('WE REMOVED THE VIDEO');
    if (this.state.currentStream.active === false) {
      this.setState({ currentStream: this.props.localStream });
      this.changeCanvasVideo();
    }
  }

  changeCanvasVideo() {
    // setting the video source to the media stream by passing it as a prop didn't seem to be working (React was telling me srcObject is not a valid prop for video elements), so I did this workaround, which is less Reacty
    const currentVideos = document.querySelectorAll('.currentVideo');
    if (currentVideos.length > 0) {
      for (let i = 0; i < currentVideos.length; i++) {
        if (currentVideos[i].videoWidth > 0) {
          if (this.canvas1) {
            this.canvas1.width = currentVideos[i].videoWidth;
            this.canvas1.height = currentVideos[i].videoHeight;
            this.canvas2.width = currentVideos[i].videoWidth;
            this.canvas2.height = currentVideos[i].videoHeight;

            // set the global alpha
            this.ctx1.globalAlpha = this.canvasControls.globalAlpha;
            this.ctx2.globalAlpha = this.canvasControls.globalAlpha;
            // set the blend mode
            this.ctx1.globalCompositeOperation = this.canvasControls.globalCompositeOperation;
            this.ctx2.globalCompositeOperation = this.canvasControls.globalCompositeOperation;
          }
        }
        currentVideos[i].srcObject = this.state.currentStream;
      }
    }
  }

  cycleRemoteStreams() {
    const streams = [...this.props.remoteStreams, this.props.localStream];
    console.log(
      'BoxMan trying to cycle cameras',
      'currentVideo',
      this.state.currentStream,
      streams
    );
    console.log('remote stream', this.props.remoteStreams);
    if (streams.length > 0) {
      for (let i = 0; i < streams.length; i++) {
        if (streams[i].id === this.state.currentStream.id) {
          this.setState({ currentStream: streams[(i + 1) % streams.length] });
          this.changeCanvasVideo();
          return;
        }
      }
      // if we make it through without any match, set to local
      this.setState({ currentStream: this.props.localStream });
      this.changeCanvasVideo();
    }
  }

  newMessage(msg) {
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

  initCanvas() {
    this.videoEl = document.querySelector('.currentVideo');
    this.canvas1 = document.getElementById('canvas-left');
    this.canvas2 = document.getElementById('canvas-right');
    this.ctx1 = this.canvas1.getContext('2d');
    this.ctx2 = this.canvas2.getContext('2d');

    this.canvasControls = {
      globalAlpha: 0.8,
      globalCompositeOperation: 'difference',
    };

    // set the global alpha
    this.ctx1.globalAlpha = this.canvasControls.globalAlpha;
    this.ctx2.globalAlpha = this.canvasControls.globalAlpha;
    // set the blend mode
    this.ctx1.globalCompositeOperation = this.canvasControls.globalCompositeOperation;
    this.ctx2.globalCompositeOperation = this.canvasControls.globalCompositeOperation;

    const gui = new dat.GUI();
    let alphaController = gui.add(this.canvasControls, 'globalAlpha', 0, 1);
    let blendController = gui.add(
      this.canvasControls,
      'globalCompositeOperation',
      [
        'source-over',
        'source-in',
        'source-atop',
        'destination-over',
        'destination-in',
        'destination-out',
        'destination-atop',
        'lighter',
        'copy',
        'xor',
        'screen',
        'multiply',
        'overlay',
        'darken',
        'lighten',
        'color-burn',
        'color-dodge',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ]
    );

    alphaController.onChange(alpha => {
      this.ctx1.globalAlpha = alpha;
      this.ctx2.globalAlpha = alpha;
      this.canvasControls.globalAlpha = alpha;
    });

    blendController.onChange(mode => {
      this.ctx1.globalCompositeOperation = mode;
      this.ctx2.globalCompositeOperation = mode;
      this.canvasControls.globalCompositeOperation = mode;
    });

    this.draw();
  }

  draw() {
    this.ctx1.drawImage(
      this.videoEl,
      0,
      0,
      this.canvas1.width,
      this.canvas1.height
    ); //;, 400, 0, 0,this.canvas1.width,this.canvas1.height)
    this.ctx2.drawImage(
      this.videoEl,
      0,
      0,
      this.canvas1.width,
      this.canvas1.height
    );

    // don't want it rendering higher than 12.5fps to get the cool fx
    setTimeout(() => {
      this.draw();
    }, 80);
  }

  render() {
    return (
      <div
        ref={ref => {
          this.bmContainer = ref;
        }}
        onClick={() => {
          this.cycleRemoteStreams();
        }}
      >
        <div id="vertical-flexbox">
          {this.props.fxMode ? (
            <div id="viewports-container">
              <ViewportFX id="left" displayMsg={this.state.displayMsg} />
              <ViewportFX id="right" displayMsg={this.state.displayMsg} />
            </div>
          ) : (
            <div id="viewports-container">
              <Viewport id="left" displayMsg={this.state.displayMsg} />
              <Viewport id="right" displayMsg={this.state.displayMsg} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default BoxMan;
