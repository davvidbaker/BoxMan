import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';

import { foundCamera } from '../actions';

function* getCameras() {
  const deviceInformations = yield call(async () => {
    try {
      const deviceInformations = await navigator.mediaDevices.enumerateDevices();
      return deviceInformations;
    } catch (err) {
      console.error(err);
    }
  });

  for (let i = 0; i < deviceInformations.length; i++) {
    if (deviceInformations[i].kind === 'videoinput') {
      yield put(foundCamera(deviceInformations[i]));
    }
  }
}

async function getStream(cameraInfo) {
  try {
    const constraints = {
      audio: false,
      video: { deviceId: cameraInfo ? { exact: cameraInfo } : undefined },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (e) {
    console.error(e.message);
    return e;
  }

  // .then(stream => {
  //   console.log('stream', stream);
  //   window.stream = stream;
  //   const videoEl =
  //     document.getElementById('viewfinder-video') ||
  //     document.createElement('new-video');
  //   // this.props.localStream = stream;
  //   videoEl.srcObject = stream;

  //   // changing cameraSelected triggers the next phase, which is the game
  //   window.stream = stream;
  //   this.props.changeStream(stream, 'local');
  //   this.props.changePhase('game');
  // })
  // .catch(err => {
  //   console.error(err);
  // });
}

export { getStream, getCameras };
