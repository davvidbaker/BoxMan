import React from 'react';

const CameraSelect = React.createClass({
  getInitialState: function() {
    return ({
      cameraSelected: false,
      availableCams: []
    });
  },

  propTypes: {
    selectCamera: React.PropTypes.func.isRequired,
  },

  componentDidMount:  function () {
    navigator.mediaDevices.enumerateDevices().then(this._gotDevices).catch(err => { console.error(err); });
  },

  _gotDevices: function (deviceInfos) {
    console.log('got devices', deviceInfos);
    for (let i = 0; i < deviceInfos.length; i++) {
      if (deviceInfos[i].kind === 'videoinput') {
        this.state.availableCams.push(deviceInfos[i]);
        console.log(deviceInfos[i]);
      }
    }
    this.setState(this.state);
  },

  _submit: function(evt) {
    evt.preventDefault();
    const checkedButton = document.querySelectorAll('.radioBtn:checked');
    if (checkedButton.length === 1) {
      this.props.selectCamera(checkedButton[0].value);
    }
  },

  render: function() {
    return (
      <div id="cameraSelect">
      {this.state.cameraSelected ?
      <p>Choose your camera in a second</p> :
      <form onSubmit={this._submit}>
        {this.state.availableCams.map((deviceInfo, i) => {
            console.log(deviceInfo);
            console.log(deviceInfo.label);
            return (
              <div key={Math.random()}>
                <input
                  className="radioBtn"
                  type="radio"
                  name="camera"
                  value={deviceInfo.deviceId}
                  label={deviceInfo.label || `camera ${i}`}
                />{deviceInfo.label ||`camera ${i}`} <br />
              </div>
            );
          })}
          {(this.state.availableCams.length === 0) ?
            <p>Make sure the app can access your camera!</p> :
            <input type="submit" value="Go" />
          }
        </form>
      }
        
      </div>
    );
  }
});

export default CameraSelect;