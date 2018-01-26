import SimplePeer from 'simple-peer';
import { put, call, takeEvery, takeLatest, select } from 'redux-saga/effects';

import {
  RTC_ICE_SERVERS_FETCH,
  CAMERA_SELECT,
  CAMERAS_ENUMERATE,
  STREAM_CHANGE,
} from 'actions';
import getIceServers from './iceServers';
import { getStream, getCameras } from './cameras';

function* webrtc() {
  yield takeLatest(CAMERAS_ENUMERATE, getCameras);
  yield takeLatest(RTC_ICE_SERVERS_FETCH, getIceServers);

  yield takeLatest(CAMERA_SELECT, initializeRTC);
  // yield takeLatest(RTC_INITIALIZE, initializeRTC)
}

function* initializeRTC({ cameraInfo }) {
  console.log('cameraInfo', cameraInfo);
  const stream = yield call(getStream, cameraInfo);
  window.localStream = stream;
  yield put({ type: STREAM_CHANGE, localOrRemote: 'local' });

  const peers = select(state => state.peers);

  const Peer = new SimplePeer({});
}

export default webrtc;
