import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { navigate, Link } from '@reach/router';

class CameraSelect extends Component {
  static propTypes = {
    availableCameras: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    console.log('🔥  props', props);
  }

  componentDidMount(){
    console.log('cdm')
  }

  selectCamera(cam) {
    if (window.stream) {
      console.log('already was a window stream: ', window.stream);
      window.stream.getTracks().forEach(track => {
        track.stop();
      });
    }
    const videoSource = cam;
    // this.props.changeCamera(cam);

    const constraints = {
      audio: false,
      video: { deviceId: videoSource ? { exact: videoSource } : undefined },
    };

    this.props.changeConstraints(constraints);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        console.log('stream', stream);
        window.stream = stream;
        const videoEl = document.getElementById('viewfinder-video')
          || document.createElement('new-video');
        // this.props.localStream = stream;
        videoEl.srcObject = stream;

        // changing cameraSelected triggers the next phase, which is the game
        window.stream = stream;
        this.props.changeStream(stream, 'local');
      })
      .catch(err => {
        console.error(err);
      });
  }

  submit(evt) {
    evt.preventDefault();
    // this.selectCamera(evt.target.value);
    this.props.selectCamera(evt.target.value);
    this.props.changePhase('game');
    navigate(`/game/${this.props.channelName}`);
  }

  render() {
    return (
      <>
        <Link to="../">back</Link>
        <div id="cameraSelect">
          <h1>Choose your camera</h1>
          {true ? (
            <div id="camera-container">
              {this.props.availableCameras.map((deviceInfo, i) => (
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
                  </button>
                  <br />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default CameraSelect;
