import { foundCamera } from '../actions';

import {
  put, call, takeEvery, takeLatest, select
} from 'redux-saga/effects';

function* getCameras() {
  const deviceInformations = yield call(async () => {
    console.log('here');
    try {
      const deviceInformations = await navigator.mediaDevices.enumerateDevices();
      return deviceInformations;
    } catch (err) {
      console.error(err);
    }
  });

  console.log('📷  deviceInformations', deviceInformations);

  const videoInformations = deviceInformations.filter(
    di => di.kind === 'videoinput',
  );

  if (videoInformations.length === 0) {
    yield put({ type: 'NO_CAMERAS_AVAILABLE' });
  } else {
    for (let i = 0; i < videoInformations.length; i++) {
      if (videoInformations[i].kind === 'videoinput') {
        console.log('🔥  putting found camera');
        yield put(foundCamera(videoInformations[i]));
      }
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
}

export { getStream, getCameras };
