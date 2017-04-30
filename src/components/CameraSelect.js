import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CameraSelect extends Component {
  static propTypes = {
    character: PropTypes.string.isRequired,
    availableCameras: PropTypes.array.isRequired,
  };

  constructor() {
    super();
  }

  selectCamera(cam) {
    if (window.stream) {
      console.log('already was a window stream: ', window.stream);
      window.stream.getTracks().forEach(function(track) {
        track.stop();
      });
    }
    var videoSource = cam;
    // this.props.changeCamera(cam);

    const constraints = {
      audio: false,
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };

    this.props.changeConstraints(constraints);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        window.stream = stream;
        const videoEl =
          document.getElementById('viewfinder-video') ||
          document.createElement('new-video');
        // this.props.localStream = stream;
        videoEl.srcObject = stream;

        // changing cameraSelected triggers the next phase, which is the game
        window.stream = stream;
        this.props.changeStream(stream, 'local');
        this.props.changePhase('game');
      })
      .catch(err => {
        console.error(err);
      });
  }

  submit(evt) {
    evt.preventDefault();
    console.log('event clicked target', evt);
    this.selectCamera(evt.target.value);
  }

  render() {
    return (
      <div id="cameraSelect">
        <h1>Choose your camera</h1>
        {/*{this.props.character === 'cameraGuy'*/}
        {true
          ? <div id="camera-container">
              {this.props.availableCameras.map((deviceInfo, i) => {
                return (
                  <div className="button-container" key={Math.random()}>
                    <button
                      onClick={evt => {
                        this.submit(evt);
                      }}
                      className="camera-button"
                      name="camera"
                      value={deviceInfo.deviceId}
                      label={deviceInfo.label || `camera ${i}`}
                      ref={deviceInfo.label}
                    >
                      {deviceInfo.label || `camera ${i}`}
                    </button><br />
                  </div>
                );
              })}
            </div>
          : null}

      </div>
    );
  }
}

export default CameraSelect;
