import React from 'react';

import CharacterSelect from './characterSelect.js';
import CameraSelect from './cameraSelect.js';
import Game from './game.js';

console.clear();

/* ========================================
// This is our master component
======================================== */
const Application = React.createClass({
  getInitialState: function () {
    return ({
      phase: "chooseCharacter",
      character: "",
      gameroom: "",
      camera: null,
      constraints: {
        audio: false,
        video: true
      },
      localStream: null
    });
  },

  _selectCharacter: function(yourChar, gameroom) {
    this.state.character = yourChar;
    this.state.phase = 'cameraSelect';
    // add suffix box-man to quasi-ensure unique game room name
    this.state.gameroom = gameroom + 'box-man';
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
        const videoEl = document.getElementById('viewfinder-video') || document.createElement('new-video');
        this.state.localStream = stream;
        videoEl.srcObject = stream;
        // document.getElementById('viewfinder').style.display = "flex";

        // changing cameraSelected triggers the next phase, which is the game
        this.state.phase = 'game';
        this.setState(this.state);
      })
      .catch(err => { console.error(err); });
  },


  render: function () {
    return (
      <div className="application">
        <div id="background-title">
          <p id="title">BOX MAN</p>
          <p id="subtitle">OUT OF BODY</p>
        </div>
        {this.state.phase === 'chooseCharacter' ? 
          <CharacterSelect selectCharacter={this._selectCharacter} /> :
          (this.state.phase === 'cameraSelect') ? 
            <CameraSelect character={this.state.character} selectCamera={this._selectCamera} /> :
            <Game constraints={this.state.constraints} localStream={this.state.localStream} character={this.state.character} gameroom={this.state.gameroom}/>
        }
      </div>
    );
  }
});

export default Application;