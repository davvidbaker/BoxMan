import React from 'react';

const CameraSelect = React.createClass({
  propTypes: {
    selectCamera: React.PropTypes.func.isRequired,
    availableCams: React.PropTypes.array.isRequired
  },

  _submit: function(evt) {
    evt.preventDefault();
    // console.log(evt.target);
    const checkedButton = document.querySelectorAll('.radioBtn:checked');
    if (checkedButton.length === 1) {
      console.log(checkedButton)
      console.log('this.refs.videoSelect.value', checkedButton[0].value)
      this.props.selectCamera(checkedButton[0].value);
    }
  },

  render: function() {
    return (
      <div id="cameraSelect">
        <form onSubmit={this._submit}>
        {this.props.availableCams.map((deviceInfo, i) => {
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
          })};
          {(this.props.availableCams.length === 0) ?
            <p>Make sure the app can access your camera!</p> :
            <input type="submit" value="Go" />
          }
        </form>
      </div>
    );
  }
});

export default CameraSelect;