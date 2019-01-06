import * as React from 'react';
import { Link } from '@reach/router';

const CameraSelect = ({ availableCameras, selectCamera, onSelect }) => {
  const onClick = evt => {
    evt.preventDefault();
    selectCamera(evt.target.value);
    onSelect();
  };

  return (
    <>
      <Link to="../">back</Link>
      <div id="cameraSelect">
        <h1 className="bangers">Choose your camera</h1>
        <div id="camera-container">
          {availableCameras.map((deviceInfo, i) => (
            <div className="button-container" key={Math.random()}>
              <button
                type="button"
                onClick={onClick}
                className="camera-button"
                name="camera"
                value={deviceInfo.deviceId}
                label={deviceInfo.label || `camera ${i}`}
              >
                {deviceInfo.label || `camera ${i}`}
              </button>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CameraSelect;
